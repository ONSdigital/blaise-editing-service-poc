import supertest, { Response } from 'supertest';
import { IMock, Mock, Times } from 'typemoq';
import { CaseEditInformation, CaseOutcome, EditedStatus } from 'blaise-api-node-client';
import nodeServer from '../../../server/server';
import createAxiosError from './axiosTestHelper';
import BlaiseApi from '../../../server/api/BlaiseApi';
import FakeServerConfigurationProvider from '../configuration/FakeServerConfigurationProvider';

// create fake config
const configFake = new FakeServerConfigurationProvider();

// mock blaise api client
const blaiseApiMock: IMock<BlaiseApi> = Mock.ofType(BlaiseApi);

// need to test the endpoints through the express server
const server = nodeServer(configFake, blaiseApiMock.object);

// supertest will handle all http calls
const sut = supertest(server);

// Using Node.js `assert`
// const assert = require('assert').strict;

describe('Get case edit information tests', () => {
  beforeEach(() => {
    blaiseApiMock.reset();
  });

  afterAll(() => {
    blaiseApiMock.reset();
  });

  const questionnaireName = 'FRS2504A';
  const userRole = 'SVT_Editor';
  const surveyTla = 'FRS';

  it('When given a valid quetsionnaire, userRole and SurveyTLA It should return a 200 response with an expected filtered list of case edit details', async () => {
    // arrange
    const caseEditInformationListMockObject : CaseEditInformation[] = [
      {
        primaryKey: '10001011',
        outcome: CaseOutcome.Completed,
        assignedTo: 'Rich',
        editedStatus: EditedStatus.Finished,
        interviewer: '',
      },
      {
        primaryKey: '10001012',
        outcome: CaseOutcome.Completed,
        assignedTo: 'bob',
        editedStatus: EditedStatus.NotStarted,
        interviewer: '',
      },
      {
        primaryKey: '10001013',
        outcome: CaseOutcome.Partial,
        assignedTo: 'Julie',
        editedStatus: EditedStatus.Query,
        interviewer: '',
      },
      {
        primaryKey: '10001014',
        outcome: CaseOutcome.CompletedNudge,
        assignedTo: 'Sarah',
        editedStatus: EditedStatus.Started,
        interviewer: '',
      },
      {
        primaryKey: '10001015',
        outcome: CaseOutcome.Completed,
        assignedTo: 'Rich',
        editedStatus: EditedStatus.Started,
        interviewer: '',
      },
    ];

    const filteredCaseEditInformationListMockObject : CaseEditInformation[] = [
      {
        primaryKey: '10001011',
        outcome: CaseOutcome.Completed,
        assignedTo: 'Rich',
        editedStatus: EditedStatus.Finished,
        interviewer: '',
      },
      {
        primaryKey: '10001012',
        outcome: CaseOutcome.Completed,
        assignedTo: 'bob',
        editedStatus: EditedStatus.NotStarted,
        interviewer: '',
      },
      {
        primaryKey: '10001014',
        outcome: CaseOutcome.CompletedNudge,
        assignedTo: 'Sarah',
        editedStatus: EditedStatus.Started,
        interviewer: '',
      },
      {
        primaryKey: '10001015',
        outcome: CaseOutcome.Completed,
        assignedTo: 'Rich',
        editedStatus: EditedStatus.Started,
        interviewer: '',
      },
    ];

    blaiseApiMock.setup((api) => api.getCaseEditInformation(questionnaireName)).returns(async () => caseEditInformationListMockObject);

    // act
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRole}&surveyTla=${surveyTla}`);

    // assert
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(filteredCaseEditInformationListMockObject);
    blaiseApiMock.verify((api) => api.getCaseEditInformation(questionnaireName), Times.once());
  });

  it('When the Outcome Filter list is empty It should return a 200 response with a list of all case edit details', async () => {
    // arrange
    const userRoleAll = 'SVT_AllOutcomes';
    const caseEditInformationListMockObject : CaseEditInformation[] = [
      {
        primaryKey: '10001011',
        outcome: CaseOutcome.Completed,
        assignedTo: 'Rich',
        editedStatus: EditedStatus.Finished,
        interviewer: '',
      },
      {
        primaryKey: '10001012',
        outcome: CaseOutcome.Completed,
        assignedTo: 'bob',
        editedStatus: EditedStatus.NotStarted,
        interviewer: '',
      },
      {
        primaryKey: '10001013',
        outcome: CaseOutcome.Partial,
        assignedTo: 'Julie',
        editedStatus: EditedStatus.Query,
        interviewer: '',
      },
      {
        primaryKey: '10001014',
        outcome: CaseOutcome.CompletedNudge,
        assignedTo: 'Sarah',
        editedStatus: EditedStatus.Started,
        interviewer: '',
      },
      {
        primaryKey: '10001015',
        outcome: CaseOutcome.Completed,
        assignedTo: 'Rich',
        editedStatus: EditedStatus.Started,
        interviewer: '',
      },
    ];

    blaiseApiMock.setup((api) => api.getCaseEditInformation(questionnaireName)).returns(async () => caseEditInformationListMockObject);

    // act
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRoleAll}&surveyTla=${surveyTla}`);

    // assert
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(caseEditInformationListMockObject);
    blaiseApiMock.verify((api) => api.getCaseEditInformation(questionnaireName), Times.once());
  });

  it('It should return a 500 response when a call is made to retrieve a list of editing details and the rest api is not availiable', async () => {
    // arrange
    const axiosError = createAxiosError(500);

    blaiseApiMock.setup((api) => api.getCaseEditInformation(questionnaireName)).returns(() => Promise.reject(axiosError));

    // act
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRole}&surveyTla=${surveyTla}`);

    // assert
    expect(response.status).toEqual(500);
  });

  it('It should return a 500 response when the api client throws an error', async () => {
    // arrange
    const apiClientError = new Error();

    blaiseApiMock.setup((api) => api.getCaseEditInformation(questionnaireName)).returns(() => Promise.reject(apiClientError));

    // act
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRole}&surveyTla=${surveyTla}`);

    // assert
    expect(response.status).toEqual(500);
  });

  it.each(['', 'INVALIDROLE'])('It should return a 500 response when given an unknown userRole', async (userRoleInvalid) => {
    // arrange
    blaiseApiMock.setup((api) => api.getCaseEditInformation(questionnaireName)).returns(async () => []);

    // act
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRoleInvalid}&surveyTla=${surveyTla}`);

    // assert
    expect(response.status).toEqual(500);
  });

  it.each(['', 'INVALIDSURVEYTLA'])('It should return a 500 response when given an unknown surveyTla', async (surveyTlaInvalid) => {
    // arrange
    blaiseApiMock.setup((api) => api.getCaseEditInformation(questionnaireName)).returns(async () => []);

    // act
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRole}&surveyTla=${surveyTlaInvalid}`);

    // assert
    expect(response.status).toEqual(500);
  });

  it('It should return a 404 response when a call is made to retrieve a list of editing details and the client returns a 404 not found', async () => {
    // arrange
    const axiosError = createAxiosError(404);

    blaiseApiMock.setup((api) => api.getCaseEditInformation(questionnaireName)).returns(() => Promise.reject(axiosError));

    // act
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRole}&surveyTla=${surveyTla}`);

    // assert
    expect(response.status).toEqual(404);
  });
});
