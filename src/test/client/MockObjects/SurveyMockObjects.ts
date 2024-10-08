import { Survey } from '../../../common/interfaces/surveyInterface';

const FilteredSurveyListMockObject :Survey[] = [{
  name: 'FRS',
  questionnaires: [{
    questionnaireName: 'FRS2504A_EDIT',
    questionnaireDisplayName: 'FRS2504A',
    numberOfCases: 3,
    fieldPeriod: 'April 2025',
    surveyTla: 'FRS',
  },
  {
    questionnaireName: 'FRS2505A_EDIT',
    questionnaireDisplayName: 'FRS2505A',
    numberOfCases: 1,
    fieldPeriod: 'May 2025',
    surveyTla: 'FRS',
  }],
}];

export default FilteredSurveyListMockObject;
