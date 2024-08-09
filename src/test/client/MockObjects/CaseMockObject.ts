import { EditorInformation } from '../../../common/interfaces/caseInterface';

const EditorInformationMockObject: EditorInformation = {
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

export default EditorInformationMockObject;
