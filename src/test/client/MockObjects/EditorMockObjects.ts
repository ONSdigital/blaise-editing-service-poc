import { EditorInformation, SupervisorInformation } from '../../../common/interfaces/caseInterface';
import { Survey } from '../../../common/interfaces/surveyInterface';

export const EditorInformationMockObject: EditorInformation = {
  numberOfCasesAllocated: 5,
  Cases: [{
    CaseId: '10001011',
    EditStatus: 'Completed',
  },
  {
    CaseId: '10001012',
    EditStatus: 'In Progress',
  },
  {
    CaseId: '10001013',
    EditStatus: 'Not Started',
  },
  {
    CaseId: '10001014',
    EditStatus: 'Completed',
  },
  {
    CaseId: '10001015',
    EditStatus: 'Completed',
  },
  ],
};

export const SupervisorInformationMockObject: SupervisorInformation = {
  TotalNumberOfCases: 1000,
  NumberOfCasesNotAllocated: 970,
  NumberOfCasesAllocated: 25,
  NumberOfCasesCompleted: 9,
  Editors: [
    {
      EditorName: 'Doctor Doom',
      NumberOfCasesAllocated: 10,
      NumberOfCasesCompleted: 5,
      NumberOfCasesQueried: 0,
    },
    {
      EditorName: 'Doctor Strange',
      NumberOfCasesAllocated: 15,
      NumberOfCasesCompleted: 4,
      NumberOfCasesQueried: 1,
    },
    {
      EditorName: 'Doctor Who',
      NumberOfCasesAllocated: 0,
      NumberOfCasesCompleted: 0,
      NumberOfCasesQueried: 0,
    },
  ],
};

export const FilteredSurveyListMockObject :Survey[] = [{
  name: 'FRS',
  questionnaires: [{
    questionnaireName: 'FRS2504A',
    numberOfCases: 3,
    fieldPeriod: 'April 2025',
    surveyTla: 'FRS',
  },
  {
    questionnaireName: 'FRS2505A',
    numberOfCases: 1,
    fieldPeriod: 'May 2025',
    surveyTla: 'FRS',
  }],
}];
