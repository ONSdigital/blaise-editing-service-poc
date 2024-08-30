import { EditorInformation } from '../../../client/Interfaces/editorInterface';

export const EditorInformationMockObject1: EditorInformation = {
  numberOfCasesAllocated: 5,
  Cases: [{
    CaseId: '10001011',
    EditStatus: 'Completed',
  },
  {
    CaseId: '10001012',
    EditStatus: 'In progress',
  },
  {
    CaseId: '10001013',
    EditStatus: 'Not started',
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

export const EditorInformationMockObject2: EditorInformation = {
  numberOfCasesAllocated: 4,
  Cases: [{
    CaseId: '20001011',
    EditStatus: 'Completed',
  },
  {
    CaseId: '20001012',
    EditStatus: 'In progress',
  },
  {
    CaseId: '20001013',
    EditStatus: 'Not started',
  },
  {
    CaseId: '20001014',
    EditStatus: 'Completed',
  },
  ],
};
