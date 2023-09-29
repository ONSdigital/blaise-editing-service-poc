import supertest, { Response } from 'supertest';
import { IMock, Mock, Times } from 'typemoq';
import nodeServer from '../../../server/server';
import createAxiosError from './axiosTestHelper';
import BlaiseApi from '../../../server/api/BlaiseApi';
import FakeServerConfigurationProvider from '../configuration/FakeServerConfigurationProvider';
import { QuestionnaireDetails, Survey } from '../../../common/interfaces/surveyInterface';

// create fake config
const configFake = new FakeServerConfigurationProvider();

// mock blaise api client
const blaiseApiMock: IMock<BlaiseApi> = Mock.ofType(BlaiseApi);

// need to test the endpoints through the express server
const server = nodeServer(configFake, blaiseApiMock.object);

// supertest will handle all http calls
const sut = supertest(server);

describe('Get surveys tests', () => {
  beforeEach(() => {
    blaiseApiMock.reset();
  });

  afterAll(() => {
    blaiseApiMock.reset();
  });

  it('It should return a 200 response with an expected list of surveys', async () => {
    // arrange
    // mock blaise client to return a list of questionnaires with allocation
    const questionnaireList:QuestionnaireDetails[] = [
      {
        questionnaireName: 'LMS2101_AA1',
        numberOfCases: 10,
        numberOfCasesAllocated: 3,
      },
      {
        questionnaireName: 'LMS2101_AB1',
        numberOfCases: 4,
        numberOfCasesAllocated: 1,
      },
      {
        questionnaireName: 'OPN2201A',
        numberOfCases: 12,
        numberOfCasesAllocated: 10,
      },
    ];

    const expectedSurveyList:Survey[] = [{
      name: 'LMS',
      questionnaires: [
        {
          questionnaireName: 'LMS2101_AA1',
          numberOfCases: 10,
          numberOfCasesAllocated: 3,
        },
        {
          questionnaireName: 'LMS2101_AB1',
          numberOfCases: 4,
          numberOfCasesAllocated: 1,
        }
      ],
    },
    {
      name: 'OPN',
      questionnaires: [
        {
          questionnaireName: 'OPN2201A',
          numberOfCases: 12,
          numberOfCasesAllocated: 10,
        },
      ],
    }];

    blaiseApiMock.setup((api) => api.getQuestionnaires()).returns(async () => questionnaireList);

    // act
    const response: Response = await sut.get('/api/surveys');

    // assert
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedSurveyList);
    blaiseApiMock.verify((api) => api.getQuestionnaires(), Times.once());
  });

  it('It should return a 500 response when a call is made to retrieve a list of surveys and the rest api is not availiable', async () => {
    // arrange
    const axiosError = createAxiosError(500);

    blaiseApiMock.setup((api) => api.getQuestionnaires()).returns(() => Promise.reject(axiosError));

    // act
    const response: Response = await sut.get('/api/surveys');

    // assert
    expect(response.status).toEqual(500);
  });

  it('It should return a 500 response when the api client throws an error', async () => {
    // arrange
    const apiClientError = new Error();

    blaiseApiMock.setup((api) => api.getQuestionnaires()).returns(() => Promise.reject(apiClientError));

    // act
    const response: Response = await sut.get('/api/surveys');

    // assert
    expect(response.status).toEqual(500);
  });

  it('It should return a 404 response when a call is made to retrieve a list of surveys and the client returns a 404 not found', async () => {
    // arrange
    const axiosError = createAxiosError(404);

    blaiseApiMock.setup((api) => api.getQuestionnaires()).returns(() => Promise.reject(axiosError));

    // act
    const response: Response = await sut.get('/api/surveys');

    // assert
    expect(response.status).toEqual(404);
  });
});
