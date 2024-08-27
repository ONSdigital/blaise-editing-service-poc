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

  it('should return a 200 response with an expected filtered list of case edit details When given a valid quetsionnaire and userRole', async () => {
    // arrange
    const questionnaireName = 'FRS2504A';
    const userRole = 'SVT_Editor';

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
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRole}`);

    // assert
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(filteredCaseEditInformationListMockObject);
    blaiseApiMock.verify((api) => api.getCaseEditInformation(questionnaireName), Times.once());
  });

  it('should return a 200 response with a list of all case edit details When the Outcome Filter list is empty', async () => {
    // arrange
    const questionnaireName = 'FRS2504A';
    const userRole = 'SVT_AllOutcomes';
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
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRole}`);

    // assert
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(caseEditInformationListMockObject);
    blaiseApiMock.verify((api) => api.getCaseEditInformation(questionnaireName), Times.once());
  });

  it('should return a 500 response if the users role is not configured for the survey', async () => {
    // arrange
    const questionnaireName = 'FRS2504A';
    const userRole = 'SVT_Supervisor'; // configured for LMS questionnaires only
    const caseEditInformationListMockObject : CaseEditInformation[] = [
      {
        primaryKey: '10001011',
        outcome: CaseOutcome.Completed,
        assignedTo: 'Rich',
        editedStatus: EditedStatus.Finished,
        interviewer: '',
      },
    ];

    blaiseApiMock.setup((api) => api.getCaseEditInformation(questionnaireName)).returns(async () => caseEditInformationListMockObject);

    // act
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRole}`);

    // assert
    expect(response.status).toEqual(500);
  });

  it('should return a 500 response when a call is made to retrieve a list of editing details and the rest api is not availiable', async () => {
    // arrange
    const questionnaireName = 'FRS2504A';
    const userRole = 'SVT_Editor';

    const axiosError = createAxiosError(500);

    blaiseApiMock.setup((api) => api.getCaseEditInformation(questionnaireName)).returns(() => Promise.reject(axiosError));

    // act
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRole}`);

    // assert
    expect(response.status).toEqual(500);
  });

  it('should return a 500 response when the api client throws an error', async () => {
    // arrange
    const questionnaireName = 'FRS2504A';
    const userRole = 'SVT_Editor';

    const apiClientError = new Error();

    blaiseApiMock.setup((api) => api.getCaseEditInformation(questionnaireName)).returns(() => Promise.reject(apiClientError));

    // act
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRole}`);

    // assert
    expect(response.status).toEqual(500);
  });

  it('should return a 500 response when CaseContorller is called without a userRole', async () => {
    // arrange
    const questionnaireName = 'FRS2504A';

    blaiseApiMock.setup((api) => api.getCaseEditInformation(questionnaireName)).returns(async () => []);

    // act
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit`);

    // assert
    expect(response.status).toEqual(500);
  });

  it.each(['', 'INVALIDROLE'])('should return a 500 response when given an unknown userRole', async (userRoleInvalid) => {
    // arrange
    const questionnaireName = 'FRS2504A';

    blaiseApiMock.setup((api) => api.getCaseEditInformation(questionnaireName)).returns(async () => []);

    // act
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRoleInvalid}`);

    // assert
    expect(response.status).toEqual(500);
  });

  it('should return a 404 response when a call is made to retrieve a list of editing details and the client returns a 404 not found', async () => {
    // arrange
    const questionnaireName = 'FRS2504A';
    const userRole = 'SVT_Editor';

    const axiosError = createAxiosError(404);

    blaiseApiMock.setup((api) => api.getCaseEditInformation(questionnaireName)).returns(() => Promise.reject(axiosError));

    // act
    const response: Response = await sut.get(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${userRole}`);

    // assert
    expect(response.status).toEqual(404);
  });
});
