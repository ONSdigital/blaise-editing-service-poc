import supertest, { Response } from 'supertest';
import BlaiseClient, { QuestionnaireListMockObject, reportMockObject } from 'blaise-api-node-client';
import { IMock, Mock, Times } from 'typemoq';
import nodeServer from '../../../server/server';
import FakeConfigurationProvider from '../configuration/FakeConfigurationProvider';
import createAxiosError from './axiosTestHelper';
import { Survey } from '../../../common/interfaces/surveyInterface';
import mapSurveys from '../../../server/mappers/surveyMapper';
import surveyListWithAllocationMockObject from '../../mockObjects/surveyListWithAllocationMockObject';

// create fake config
const configFake = new FakeConfigurationProvider('restapi.blaise.com', 'dist', 5000, 'gusty', 'cati.blaise.com', 'richlikesricecakes', '12h', ['DST']);

// mock blaise api client
const blaiseApiClientMock: IMock<BlaiseClient> = Mock.ofType(BlaiseClient);

// mock survey mapper
jest.mock('../../../server/mappers/surveyMapper');

// need to test the endpoints through the express server
const server = nodeServer(configFake, blaiseApiClientMock.object);

// supertest will handle all http calls
const sut = supertest(server);

describe('Get surveys tests', () => {
  beforeEach(() => {
    blaiseApiClientMock.reset();
  });

  afterAll(() => {
    blaiseApiClientMock.reset();
  });

  it('It should return a 200 response with an expected list of surveys', async () => {
    // arrange
    // mock blaise client to return a list of questionnaires
    blaiseApiClientMock.setup((client) => client.getQuestionnaires(configFake.ServerPark)).returns(async () => QuestionnaireListMockObject);

    // mock blaise client to return case allocation
    QuestionnaireListMockObject.forEach((questionnaire) => {
      blaiseApiClientMock.setup((client) => client.getReportData(configFake.ServerPark, questionnaire.name)).returns(async () => reportMockObject);
    });

    const surveyMapperMock = mapSurveys as jest.Mock<Survey[]>;
    surveyMapperMock.mockReturnValueOnce(surveyListWithAllocationMockObject);

    // act
    const response: Response = await sut.get('/api/surveys');

    // assert
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(surveyListWithAllocationMockObject);
    blaiseApiClientMock.verify((client) => client.getQuestionnaires(configFake.ServerPark), Times.once());

    QuestionnaireListMockObject.forEach((questionnaire) => {
      blaiseApiClientMock.verify((client) => client.getReportData(configFake.ServerPark, questionnaire.name), Times.once());
    });

    expect(mapSurveys).toBeCalledWith('messages', expect.any(Function))
  });

  it('It should return a 500 response when a call is made to retrieve a list of surveys and the rest api is not availiable', async () => {
    // arrange
    const axiosError = createAxiosError(500);

    blaiseApiClientMock.setup((client) => client.getQuestionnaires(configFake.ServerPark)).returns(() => Promise.reject(axiosError));

    // act
    const response: Response = await sut.get('/api/surveys');

    // assert
    expect(response.status).toEqual(500);
  });

  it('It should return a 500 response when the api client throws an error', async () => {
    // arrange
    const apiClientError = new Error();

    blaiseApiClientMock.setup((client) => client.getQuestionnaires(configFake.ServerPark)).returns(() => Promise.reject(apiClientError));

    // act
    const response: Response = await sut.get('/api/surveys');

    // assert
    expect(response.status).toEqual(500);
  });

  it('It should return a 404 response when a call is made to retrieve a list of surveys and the client returns a 404 not found', async () => {
    // arrange
    const axiosError = createAxiosError(404);

    blaiseApiClientMock.setup((client) => client.getQuestionnaires(configFake.ServerPark)).returns(() => Promise.reject(axiosError));

    // act
    const response: Response = await sut.get('/api/surveys');

    // assert
    expect(response.status).toEqual(404);
  });
});
