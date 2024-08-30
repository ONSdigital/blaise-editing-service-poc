import { EditorInformation } from '../../../client/Interfaces/editorInterface';

export const EditorInformationMockObject1: EditorInformation = {
  numberOfCasesAllocated: 5,
  Cases: [{
    CaseId: '10001011',
    EditStatus: 'Finished',
  },
  {
    CaseId: '10001012',
    EditStatus: 'Started',
  },
  {
    CaseId: '10001013',
    EditStatus: 'Not started',
  },
  {
    CaseId: '10001014',
    EditStatus: 'Finished',
  },
  {
    CaseId: '10001015',
    EditStatus: 'Finished',
  },
  ],
};

export const EditorInformationMockObject2: EditorInformation = {
  numberOfCasesAllocated: 4,
  Cases: [{
    CaseId: '20001011',
    EditStatus: 'Finished',
  },
  {
    CaseId: '20001012',
    EditStatus: 'Started',
  },
  {
    CaseId: '20001013',
    EditStatus: 'Not started',
  },
  {
    CaseId: '20001014',
    EditStatus: 'Finished',
  },
  ],
};
