import { Questionnaire2, Survey } from '../../../common/interfaces/surveyInterface';
import mapSurveys from '../../../server/mappers/surveyMapper';
import surveyListMockObject from '../../mockObjects/surveyListWithAllocationMockObject';
import questionnaireListMockObject from '../../mockObjects/questionnaireListWithAllocationMockObject';

describe('Map questionnaire list to survey list', () => {
  it('Should map a list of questionnaires to an expected list of surveys', () => {
    // arrange
    const questionnaires: Questionnaire2[] = questionnaireListMockObject;
    const expectedSurveys: Survey[] = surveyListMockObject;

    // act
    const surveys = mapSurveys(questionnaires);

    // assert
    expect(surveys).toEqual(expectedSurveys);
  });
});
