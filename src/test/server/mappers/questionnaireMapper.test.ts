import { Questionnaire } from 'blaise-api-node-client';
import mapQuestionnaireDetails from '../../../server/mappers/questionnaireMapper';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';

describe('Map a list of questionnaires', () => {
  it('It should return a correctly mapped list of questionnaires', () => {
    // arrange

    const questionnaire: Questionnaire = {
      name: 'LMS2101_AA1',
      serverParkName: 'gusty',
      installDate: '2021-01-15T15:26:43.4233454+00:00',
      status: 'Active',
      dataRecordCount: 3,
      hasData: false,
      active: false,
    };

    const expectedQuestionnaireDetails: QuestionnaireDetails = {
      questionnaireName: questionnaire.name,
      numberOfCases: questionnaire.dataRecordCount ?? 0,
      questionnaireMonth: `${questionnaire.name.slice(5, 7)} - 20${questionnaire.name.slice(3, 5)}`,
    };

    // act
    const result = mapQuestionnaireDetails(questionnaire);

    // assert
    expect(result).toEqual(expectedQuestionnaireDetails);
  });
});
