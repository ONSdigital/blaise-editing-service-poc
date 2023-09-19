import supertest, { Response } from 'supertest';
import { CaseResponse, CaseStatus, CaseStatusListMockObject } from 'blaise-api-node-client';
import { IMock, Mock, Times } from 'typemoq';
import nodeServer from '../../../server/server';
import FakeConfigurationProvider from '../configuration/FakeConfigurationProvider';
import { CaseDetails, CaseFactsheetDetails } from '../../../common/interfaces/caseInterface';
import createAxiosError from './axiosTestHelper';
import { mapCaseDetails, mapCaseFactsheet } from '../../../server/mappers/caseMapper';
import CaseBuilder from '../../builders/caseBuilder';
import CaseDetailsBuilder from '../../builders/caseDetailsBuilder';
import BlaiseApi from '../../../server/api/BlaiseApi';

// create fake config
const configFake = new FakeConfigurationProvider('restapi.blaise.com', 'dist', 5000, 'gusty', 'cati.blaise.com', 'richlikesricecakes', '12h', ['DST']);

// mock blaise api client
const blaiseApiMock: IMock<BlaiseApi> = Mock.ofType(BlaiseApi);

// mock case mappers
jest.mock('../../../server/mappers/caseMapper');

// create case mock objects
const caseBuilder = new CaseBuilder(2);
const CaseResponseMockObject: CaseResponse = caseBuilder.buildCaseResponse();
const CaseFactsheetMockObject: CaseFactsheetDetails = caseBuilder.buildCaseFactsheet();

// need to test the endpoints through the express server
const server = nodeServer(configFake, blaiseApiMock.object);

// supertest will handle all http calls
const sut = supertest(server);

describe('Get case list tests', () => {
  beforeEach(() => {
    blaiseApiMock.reset();
  });

  afterAll(() => {
    blaiseApiMock.reset();
  });

  it.each([1, 2, 3, 4])('It should return a 200 response with an expected list of cases', async (value) => {
    // arrange
    // mock blaise client to return a list of cases
    const questionnaireName: string = 'TEST111A';
    const caseStatusList: CaseStatus[] = CaseStatusListMockObject;
    const caseDetailsBuider = new CaseDetailsBuilder(value);
    const caseDetailsListMockObject = caseDetailsBuider.BuildCaseDetails();
    const mapCaseDetailsMock = mapCaseDetails as jest.Mock<CaseDetails[]>;

    mapCaseDetailsMock.mockReturnValueOnce(caseDetailsListMockObject);

    blaiseApiMock.setup((api) => api.getCaseStatus(questionnaireName)).returns(async () => caseStatusList);

    // act
    const response: Response = await sut.get(`/api/questionnaires/${questionnaireName}/cases`);

    // assert
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(caseDetailsListMockObject);
    blaiseApiMock.verify((api) => api.getCaseStatus(questionnaireName), Times.once());
  });

  it('It should return a 500 response when a call is made to retrieve a list of cases and the rest api is not availiable', async () => {
    // arrange
    const axiosError = createAxiosError(500);
    const questionnaireName: string = 'TEST111A';

    blaiseApiMock.setup((api) => api.getCaseStatus(questionnaireName)).returns(() => Promise.reject(axiosError));

    // act
    const response: Response = await sut.get(`/api/questionnaires/${questionnaireName}/cases`);

    // assert
    expect(response.status).toEqual(500);
  });

  it('It should return a 500 response when the api client throws an error', async () => {
    // arrange
    const clientError = new Error();
    const questionnaireName: string = 'TEST111A';

    blaiseApiMock.setup((api) => api.getCaseStatus(questionnaireName)).returns(() => Promise.reject(clientError));

    // act
    const response: Response = await sut.get(`/api/questionnaires/${questionnaireName}/cases`);

    // assert
    expect(response.status).toEqual(500);
  });

  it('It should return a 404 response when a call is made to retrieve a list of cases and the client returns a 404 not found', async () => {
    // arrange
    const axiosError = createAxiosError(404);
    const questionnaireName: string = 'TEST111A';

    blaiseApiMock.setup((api) => api.getCaseStatus(questionnaireName)).returns(() => Promise.reject(axiosError));

    // act
    const response: Response = await sut.get(`/api/questionnaires/${questionnaireName}/cases`);

    // assert
    expect(response.status).toEqual(404);
  });
});

describe('Get case fact sheet tests', () => {
  beforeEach(() => {
    blaiseApiMock.reset();
  });

  afterAll(() => {
    blaiseApiMock.reset();
  });

  it('It should return a 200 response with expected case fact sheet', async () => {
    // arrange
    const caseId: string = '1';
    const questionnaireName: string = 'TEST111A';
    const mapCasefactsheetMock = mapCaseFactsheet as jest.Mock<CaseFactsheetDetails>;

    mapCasefactsheetMock.mockReturnValue(CaseFactsheetMockObject);

    blaiseApiMock.setup((api) => api.getCase(questionnaireName, caseId)).returns(async () => CaseResponseMockObject);

    // act
    const response: Response = await sut.get(`/api/questionnaires/${questionnaireName}/cases/${caseId}/factsheet`);

    // assert
    expect(response.status).toEqual(200);
    expect(response.text).toEqual(JSON.stringify(CaseFactsheetMockObject));
    blaiseApiMock.verify((api) => api.getCase(questionnaireName, caseId), Times.once());
  });

  it('It should return a 500 response when a call is made to retrieve a case and the rest api is not availiable', async () => {
    // arrange
    const axiosError = createAxiosError(500);
    const caseId: string = '1';
    const questionnaireName: string = 'TEST111A';

    blaiseApiMock.setup((api) => api.getCase(questionnaireName, caseId)).returns(() => Promise.reject(axiosError));

    // act
    const response: Response = await sut.get(`/api/questionnaires/${questionnaireName}/cases/${caseId}/factsheet`);

    // assert
    expect(response.status).toEqual(500);
  });

  it('It should return a 500 response when the api client throws an error', async () => {
    // arrange
    const clientError = new Error();
    const caseId: string = '1';
    const questionnaireName: string = 'TEST111A';

    blaiseApiMock.setup((api) => api.getCase(questionnaireName, caseId)).returns(() => Promise.reject(clientError));

    // act
    const response: Response = await sut.get(`/api/questionnaires/${questionnaireName}/cases/${caseId}/factsheet`);

    // assert
    expect(response.status).toEqual(500);
  });

  it('It should return a 404 response when a call is made to retrieve a case and the client returns a 404 not found', async () => {
    // arrange
    const axiosError = createAxiosError(404);
    const caseId: string = '1';
    const questionnaireName: string = 'TEST111A';

    blaiseApiMock.setup((api) => api.getCase(questionnaireName, caseId)).returns(() => Promise.reject(axiosError));

    // act
    const response: Response = await sut.get(`/api/questionnaires/${questionnaireName}/cases/${caseId}/factsheet`);

    // assert
    expect(response.status).toEqual(404);
  });

  it('It should return an error when the mapper throws an error', async () => {
    // arrange
    const caseId: string = '1';
    const questionnaireName: string = 'TEST111A';
    const mapCaseFactsheetMock = mapCaseFactsheet as jest.Mock<CaseFactsheetDetails>;
    mapCaseFactsheetMock.mockImplementation(() => { throw new Error('Error message'); });

    blaiseApiMock.setup((api) => api.getCase(questionnaireName, caseId)).returns(async () => CaseResponseMockObject);

    // act
    const response: Response = await sut.get(`/api/questionnaires/${questionnaireName}/cases/${caseId}/factsheet`);

    // assert
    expect(response.status).toEqual(500);
  });
});
