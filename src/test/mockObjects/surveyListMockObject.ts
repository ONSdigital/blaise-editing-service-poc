import { Survey } from '../../common/interfaces/surveyInterface';

const surveyListMockObject: Survey[] = [
  {
    name: 'LMS',
    questionnaires:
  [{
    questionnaireName: 'LMS2101_AA1',
    numberOfCases: 3,
    fieldPeriod: 'January 2021',
    surveyTla: 'LMS',
  },
  {
    questionnaireName: 'LMS2101_AC1',
    numberOfCases: 0,
    fieldPeriod: 'January 2021',
    surveyTla: 'LMS',
  }],
  },
  {
    name: 'FRS',
    questionnaires: [{
      questionnaireName: 'FRS2504A',
      numberOfCases: 1,
      fieldPeriod: 'January 2021',
      surveyTla: 'FRS',
    }],
  },
  {
    name: 'OPN',
    questionnaires: [{
      questionnaireName: 'OPN2201A',
      numberOfCases: 3,
      fieldPeriod: 'January 2022',
      surveyTla: 'OPN',
    }],
  },
];

export default surveyListMockObject;
