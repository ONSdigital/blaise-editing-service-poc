import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import surveyListMockObject from '../../../mockObjects/surveyListMockObject';
import { getSurveys, getEditorCaseInformation } from '../../../../client/Common/api/NodeApi';
import { EditorInformationMockObject } from '../../MockObjects/CaseMockObject';

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

describe('getCaseEditInformation from Blaise', () => {
  const questionnaireName = 'FRS2201';
  const username = 'Rich';

  it('Should retrieve a list of case edit information with a 200 response', async () => {
    // arrange
    axiosMock.onGet(`/api/${questionnaireName}/cases/edit?username=${username}`).reply(200, EditorInformationMockObject);

    // act
    const result = await getEditorCaseInformation(questionnaireName, username);

    // assert
    expect(result).toEqual(EditorInformationMockObject);
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
