import mapSurveys from '../../../server/mappers/surveyMapper';
import { questionnaireDetailsListMockObject } from '../../mockObjects/questionnaireListMockObject';
import surveyListMockObject from '../../mockObjects/surveyListMockObject';

describe('Map questionnaire list to survey list', () => {
  it('Should map a list of questionnaires to an expected list of surveys', () => {
    // act
    const surveys = mapSurveys(questionnaireDetailsListMockObject);

    // assert
    expect(surveys).toEqual(surveyListMockObject);
  });
});
