import { Survey } from '../../common/interfaces/surveyInterface';

const surveyListMockObject: Survey[] = [
  {
    name: 'LMS',
    questionnaires:
  [{
    questionnaireName: 'LMS2101_AA1',
    numberOfCases: 3,
    fieldPeriod: '2021-01-01T00:00:00',
    surveyTla: 'LMS',
  },
  {
    questionnaireName: 'LMS2101_AB1',
    numberOfCases: 1,
    fieldPeriod: '2021-01-01T00:00:00',
    surveyTla: 'LMS',
  },
  {
    questionnaireName: 'LMS2101_AC1',
    numberOfCases: 0,
    fieldPeriod: '2021-01-01T00:00:00',
    surveyTla: 'LMS',
  }],
  },
  {
    name: 'OPN',
    questionnaires: [{
      questionnaireName: 'OPN2201A',
      numberOfCases: 3,
      fieldPeriod: '2022-01-01T00:00:00',
      surveyTla: 'OPN',
    }],
  },
];

export default surveyListMockObject;
