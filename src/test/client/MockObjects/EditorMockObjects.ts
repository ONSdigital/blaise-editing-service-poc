import { EditedStatus } from 'blaise-api-node-client';
import { EditorInformation } from '../../../client/Interfaces/editorInterface';

export const EditorInformationMockObject1: EditorInformation = {
  numberOfCasesAllocated: 5,
  Cases: [{
    CaseId: '10001011',
    EditStatus: EditedStatus.Finished,
  },
  {
    CaseId: '10001012',
    EditStatus: EditedStatus.Started,
  },
  {
    CaseId: '10001013',
    EditStatus: EditedStatus.NotStarted,
  },
  {
    CaseId: '10001014',
    EditStatus: EditedStatus.Finished,
  },
  {
    CaseId: '10001015',
    EditStatus: EditedStatus.Finished,
  },
  ],
};

export const EditorInformationMockObject2: EditorInformation = {
  numberOfCasesAllocated: 4,
  Cases: [{
    CaseId: '20001011',
    EditStatus: EditedStatus.Finished,
  },
  {
    CaseId: '20001012',
    EditStatus: EditedStatus.Started,
  },
  {
    CaseId: '20001013',
    EditStatus: EditedStatus.NotStarted,
  },
  {
    CaseId: '20001014',
    EditStatus: EditedStatus.Finished,
  },
  ],
};
