import { Survey } from '../../../common/interfaces/surveyInterface';
import mapSurveys from '../../../server/mappers/surveyMapper';
import surveyListMockObject from '../../mockObjects/surveyAllocationListMockObject';
import { questionnaireAllocationListMockObject } from '../../mockObjects/questionnaireListMockObject';

describe('Map questionnaire list to survey list', () => {
  it('Should map a list of questionnaires to an expected list of surveys', () => {
    // arrange
    const expectedSurveys: Survey[] = surveyListMockObject;

    // act
    const surveys = mapSurveys(questionnaireAllocationListMockObject);

    // assert
    expect(surveys).toEqual(expectedSurveys);
  });
});
