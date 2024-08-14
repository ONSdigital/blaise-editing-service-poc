import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import surveyListMockObject from '../../../mockObjects/surveyListMockObject';
import { getSurveys, getEditorCaseInformation, getSupervisorEditorInformation } from '../../../../client/Common/api/NodeApi';
import { EditorInformationMockObject1, EditorInformationMockObject2 } from '../../MockObjects/EditorMockObjects';
import { SupervisorInformationMockObject1, SupervisorInformationMockObject2 } from '../../MockObjects/SupervisorMockObjects';

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

describe('getEditorCaseInformation from Blaise', () => {
  const questionnaireName = 'FRS2201';
  const username = 'Rich';

  it.each([EditorInformationMockObject1, EditorInformationMockObject2])('Should retrieve a list of case edit information with a 200 response', async (editorMock) => {
    // arrange
    axiosMock.onGet(`/api/${questionnaireName}/cases/edit?username=${username}`).reply(200, editorMock);

    // act
    const result = await getEditorCaseInformation(questionnaireName, username);

    // assert
    expect(result).toEqual(editorMock);
  });

  it('Should throw the error "Unable to find case edit information, please contact Richmond Rice" when a 404 response is recieved', async () => {
    // arrange
    axiosMock.onGet(`/api/${questionnaireName}/cases/edit?username=${username}`).reply(404, null);

    // act && assert
    expect(getEditorCaseInformation(questionnaireName, username)).rejects.toThrow('Unable to find case edit information, please contact Richmond Rice');
  });

  it('Should throw the error "Unable to complete request, please try again in a few minutes" when a 500 response is recieved', async () => {
    // arrange
    axiosMock.onGet(`/api/${questionnaireName}/cases/edit?username=${username}`).reply(500, null);

    // act && assert
    expect(getEditorCaseInformation(questionnaireName, username)).rejects.toThrow('Unable to complete request, please try again in a few minutes');
  });

  it('Should throw the error "Unable to complete request, please try again in a few minutes" when there is a network error', async () => {
    // arrange
    axiosMock.onGet(`/api/${questionnaireName}/cases/edit?username=${username}`).networkError();

    // act && assert
    expect(getEditorCaseInformation(questionnaireName, username)).rejects.toThrow('Unable to complete request, please try again in a few minutes');
  });
});

describe('getSupervisorEditorInformation from Blaise', () => {
  const questionnaireName = 'FRS2201';

  it.each([SupervisorInformationMockObject1, SupervisorInformationMockObject2])('Should retrieve a list of case edit information with a 200 response', async (supervisorMock) => {
    // arrange
    axiosMock.onGet(`/api/${questionnaireName}/supervisor/edit`).reply(200, supervisorMock);

    // act
    const result = await getSupervisorEditorInformation(questionnaireName);

    // assert
    expect(result).toEqual(supervisorMock);
  });

  it('Should throw the error "Unable to find supervisor information, please contact Richmond Rice" when a 404 response is recieved', async () => {
    // arrange
    axiosMock.onGet(`/api/${questionnaireName}/supervisor/edit`).reply(404, null);

    // act && assert
    expect(getSupervisorEditorInformation(questionnaireName)).rejects.toThrow('Unable to find supervisor information, please contact Richmond Rice');
  });

  it('Should throw the error "Unable to complete request, please try again in a few minutes" when a 500 response is recieved', async () => {
    // arrange
    axiosMock.onGet(`/api/${questionnaireName}/supervisor/edit`).reply(500, null);

    // act && assert
    expect(getSupervisorEditorInformation(questionnaireName)).rejects.toThrow('Unable to complete request, please try again in a few minutes');
  });

  it('Should throw the error "Unable to complete request, please try again in a few minutes" when there is a network error', async () => {
    // arrange
    axiosMock.onGet(`/api/${questionnaireName}/supervisor/edit`).networkError();

    // act && assert
    expect(getSupervisorEditorInformation(questionnaireName)).rejects.toThrow('Unable to complete request, please try again in a few minutes');
  });
});
