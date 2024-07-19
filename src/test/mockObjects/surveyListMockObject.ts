import { Survey } from '../../common/interfaces/surveyInterface';

const surveyListMockObject: Survey[] = [
  {
    name: 'LMS',
    questionnaires:
  [{
    questionnaireName: 'LMS2101_AA1',
    numberOfCases: 3,
    questionnaireMonth: "01 - 2021",    
  },
  {
    questionnaireName: 'LMS2101_AB1',
    numberOfCases: 1,
    questionnaireMonth: "01 - 2021",  
  },
  {
    questionnaireName: 'LMS2101_AC1',
    numberOfCases: 0,
    questionnaireMonth: "01 - 2021", 
  }],
  },
  {
    name: 'OPN',
    questionnaires: [{
      questionnaireName: 'OPN2201A',
      numberOfCases: 3,
      questionnaireMonth: "01 - 2022",       
    }],
  },
];

export default surveyListMockObject;
