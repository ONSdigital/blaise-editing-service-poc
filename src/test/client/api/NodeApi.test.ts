import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  CaseEditInformation, CaseOutcome, EditedStatus, User,
} from 'blaise-api-node-client/lib/cjs/blaiseApiClient';
import Organisation from 'blaise-api-node-client/lib/cjs/enums/organisation';
import surveyListMockObject from '../../mockObjects/surveyListMockObject';
import { getSurveys, getEditorInformation, getSupervisorEditorInformation } from '../../../client/api/NodeApi';
import { EditorInformation } from '../../../client/Interfaces/editorInterface';
import { SupervisorInformation } from '../../../client/Interfaces/supervisorInterface';
import UserRole from '../../../client/Common/enums/UserRole';

// use axios mock adapter
const axiosMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('GetSurveys from Blaise', () => {
  it('Should retrieve a list of surveys in blaise with a 200 response', async () => {
    // arrange
    axiosMock.onGet('/api/surveys').reply(200, surveyListMockObject);

    // act
    const result = await getSurveys();

    // assert
    expect(result).toEqual(surveyListMockObject);
  });

  it('Should throw the error "Unable to find surveys, please contact Richmond Rice" when a 404 response is recieved', async () => {
    // arrange
    axiosMock.onGet('/api/surveys').reply(404, null);

    // act && assert
    expect(getSurveys()).rejects.toThrow('Unable to find surveys, please contact Richmond Rice');
  });

  it('Should throw the error "Unable to retrieve surveys, please try again in a few minutes" when a 500 response is recieved', async () => {
    // arrange
    axiosMock.onGet('/api/surveys').reply(500, null);

    // act && assert
    expect(getSurveys()).rejects.toThrow('Unable to complete request, please try again in a few minutes');
  });

  it('Should throw the error "Unable to complete request, please try again in a few minutes" when there is a network error', async () => {
    // arrange
    axiosMock.onGet('/api/surveys').networkError();

    // act && assert
    expect(getSurveys()).rejects.toThrow('Unable to complete request, please try again in a few minutes');
  });
});

describe('getEditorInformation from Blaise', () => {
  const questionnaireName = 'FRS2201';
  const userName = 'Rich';
  const editorRole = UserRole.SVT_Editor;

  it('Should retrieve a list of case edit information with a 200 response', async () => {
    // arrange
    const caseEditInformationListMock: CaseEditInformation[] = [{
      primaryKey: '10001011',
      outcome: CaseOutcome.Completed,
      assignedTo: userName,
      interviewer: '',
      editedStatus: EditedStatus.Finished,
      organisation: Organisation.ONS,
    },
    {
      primaryKey: '10001012',
      outcome: CaseOutcome.Completed,
      assignedTo: userName,
      interviewer: '',
      editedStatus: EditedStatus.NotStarted,
      organisation: Organisation.ONS,
    }];

    const expectedEditorInformation: EditorInformation = {
      numberOfCasesAllocated: 2,
      Cases: [
        {
          CaseId: '10001011',
          EditStatus: 'Finished',
        },
        {
          CaseId: '10001012',
          EditStatus: 'Not started',
        },
      ],
    };
    axiosMock.onGet(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${editorRole}`).reply(200, caseEditInformationListMock);

    // act
    const result = await getEditorInformation(questionnaireName, userName, editorRole);

    // assert
    expect(result).toEqual(expectedEditorInformation);
  });

  it('Should only retrieve a list of case edit information for the user', async () => {
    // arrange
    const caseEditInformationListMock: CaseEditInformation[] = [{
      primaryKey: '10001011',
      outcome: CaseOutcome.Completed,
      assignedTo: 'bob',
      interviewer: '',
      editedStatus: EditedStatus.Finished,
      organisation: Organisation.ONS,
    },
    {
      primaryKey: '10001012',
      outcome: CaseOutcome.Completed,
      assignedTo: 'Rich',
      interviewer: '',
      editedStatus: EditedStatus.NotStarted,
      organisation: Organisation.ONS,
    }];

    const expectedEditorInformation: EditorInformation = {
      numberOfCasesAllocated: 1,
      Cases: [
        {
          CaseId: '10001012',
          EditStatus: 'Not started',
        },
      ],
    };

    axiosMock.onGet(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${editorRole}`).reply(200, caseEditInformationListMock);

    // act
    const result = await getEditorInformation(questionnaireName, userName, editorRole);

    // assert
    expect(result).toEqual(expectedEditorInformation);
  });

  it('Should throw the error "Unable to find case edit information, please contact Richmond Rice" when a 404 response is recieved', async () => {
    // arrange
    axiosMock.onGet(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${editorRole}`).reply(404, null);

    // act && assert
    expect(getEditorInformation(questionnaireName, userName, editorRole)).rejects.toThrow('Unable to find case edit information, please contact Richmond Rice');
  });

  it('Should throw the error "Unable to complete request, please try again in a few minutes" when a 500 response is recieved', async () => {
    // arrange
    axiosMock.onGet(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${editorRole}`).reply(500, null);

    // act && assert
    expect(getEditorInformation(questionnaireName, userName, editorRole)).rejects.toThrow('Unable to complete request, please try again in a few minutes');
  });

  it('Should throw the error "Unable to complete request, please try again in a few minutes" when there is a network error', async () => {
    // arrange
    axiosMock.onGet(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${editorRole}`).networkError();

    // act && assert
    expect(getEditorInformation(questionnaireName, userName, editorRole)).rejects.toThrow('Unable to complete request, please try again in a few minutes');
  });
});

describe('getSupervisorEditorInformation from Blaise', () => {
  const questionnaireName = 'FRS2201';
  const supervisorRole = UserRole.SVT_Supervisor;
  const editorRole = UserRole.SVT_Editor;

  it('Should retrieve a list of case edit information with a 200 response', async () => {
    // arrange
    const editorsListMock: User[] = [{
      name: 'Rich',
      role: editorRole,
      serverParks: ['gusty'],
      defaultServerPark: 'gusty',
    }];

    const caseEditInformationListMock: CaseEditInformation[] = [{
      primaryKey: '10001011',
      outcome: CaseOutcome.Completed,
      assignedTo: '',
      interviewer: '',
      editedStatus: EditedStatus.Finished,
      organisation: Organisation.ONS,
    },
    {
      primaryKey: '10001012',
      outcome: CaseOutcome.Completed,
      assignedTo: 'Rich',
      interviewer: '',
      editedStatus: EditedStatus.Finished,
      organisation: Organisation.ONS,
    },
    {
      primaryKey: '10001015',
      outcome: CaseOutcome.Completed,
      assignedTo: 'Rich',
      interviewer: '',
      editedStatus: EditedStatus.Query,
      organisation: Organisation.ONS,
    }];

    const expectedSupervisorInformation: SupervisorInformation = {
      TotalNumberOfCases: 3,
      NumberOfCasesNotAllocated: 1,
      NumberOfCasesAllocated: 2,
      NumberOfCasesCompleted: 2,
      EditorInformation: [{
        EditorName: 'Rich',
        NumberOfCasesAllocated: 2,
        NumberOfCasesCompleted: 1,
        NumberOfCasesQueried: 1,
      }],
    };

    axiosMock.onGet(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${supervisorRole}`).reply(200, caseEditInformationListMock);
    axiosMock.onGet(`/api/users?userRole=${editorRole}`).reply(200, editorsListMock);

    // act
    const result = await getSupervisorEditorInformation(questionnaireName, supervisorRole, editorRole);

    // assert
    expect(result).toEqual(expectedSupervisorInformation);
  });

  it('Should throw the error "Unable to find supervisor information, please contact Richmond Rice" when a 404 response is recieved', async () => {
    // arrange
    axiosMock.onGet(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${supervisorRole}`).reply(404, null);

    // act && assert
    expect(getSupervisorEditorInformation(questionnaireName, supervisorRole, editorRole)).rejects.toThrow('Unable to find case edit information, please contact Richmond Rice');
  });

  it('Should throw the error "Unable to complete request, please try again in a few minutes" when a 500 response is recieved', async () => {
    // arrange
    axiosMock.onGet(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${supervisorRole}`).reply(500, null);

    // act && assert
    expect(getSupervisorEditorInformation(questionnaireName, supervisorRole, editorRole)).rejects.toThrow('Unable to complete request, please try again in a few minutes');
  });

  it('Should throw the error "Unable to complete request, please try again in a few minutes" when there is a network error', async () => {
    // arrange
    axiosMock.onGet(`/api/questionnaire/${questionnaireName}/cases/edit?userRole=${supervisorRole}`).networkError();

    // act && assert
    expect(getSupervisorEditorInformation(questionnaireName, supervisorRole, editorRole)).rejects.toThrow('Unable to complete request, please try again in a few minutes');
  });
});
