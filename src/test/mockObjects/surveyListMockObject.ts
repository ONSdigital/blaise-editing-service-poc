import { Survey } from '../../common/interfaces/surveyInterface';

const surveyListMockObject: Survey[] = [
  {
    name: 'LMS',
    questionnaires:
  [{
    questionnaireName: 'LMS2101_AA1_EDIT',
    numberOfCases: 3,
    numberOfCasesAllocated: 3,
  },
  {
    questionnaireName: 'LMS2101_AB1_EDIT',
    numberOfCases: 1,
    numberOfCasesAllocated: 1,
  },
  {
    questionnaireName: 'LMS2101_AC1_EDIT',
    numberOfCases: 0,
    numberOfCasesAllocated: 0,
  }],
  },
  {
    name: 'OPN',
    questionnaires: [{
      questionnaireName: 'OPN2201A_EDIT',
      numberOfCases: 3,
      numberOfCasesAllocated: 3,
    }],
  },
];

export default surveyListMockObject;
