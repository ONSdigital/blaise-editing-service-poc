import { CaseData, Questionnaire } from 'blaise-api-node-client';
import mapQuestionnaireDetails from '../../../server/mappers/questionnaireMapper';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';

describe('Map a list o questionnaires and reports to a questionnaire allocation list', () => {
  it('It should return a correctly mapped list of questionnaires with allocation details', () => {
    // arrange
    const username: string = 'toby';

    const questionnaire: Questionnaire = {
      name: 'LMS2101_AA1',
      serverParkName: 'gusty',
      installDate: '2021-01-15T15:26:43.4233454+00:00',
      status: 'Active',
      dataRecordCount: 3,
      hasData: false,
      active: false,
    };

    const caseData: CaseData[] = [
      {
        'qserial.serial_number': '9001',
        'qhadmin.hout': 110,          
        'allocation.toeditor': 'jakew',
      },
      {
        'qserial.serial_number': '9002',
        'qhadmin.hout': 210,                    
        'allocation.toeditor': username,
      },
      {
        'qserial.serial_number': '9003',
        'qhadmin.hout': 210,                    
        'allocation.toeditor': '',
      },        
    ]

    const expectedQuestionnaireDetails: QuestionnaireDetails = {
      questionnaireName: questionnaire.name,
      numberOfCases: questionnaire.dataRecordCount?? 0,
      allocationDetails: {
        numberOfAllocatedCases: 2,
        casesAllocated: [
          {
            CaseId: '9001',
            CaseStatus: 110,
            CaseLink:'',
            EditorAllocated: 'jakew'
        },
        {
          CaseId: '9002',
          CaseStatus: 210,
          CaseLink:'',
          EditorAllocated: username
      }          
      ],
        casesNotAllocated: [
          {
            CaseId: '9003',
            CaseStatus: 210,
            CaseLink:'',
            EditorAllocated: ''
        }]          
      }
  }; 

    // act
    const result = mapQuestionnaireDetails(questionnaire, caseData);

    // assert
    expect(result).toEqual(expectedQuestionnaireDetails);
  });
});
