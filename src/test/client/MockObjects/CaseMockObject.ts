import { EditedStatus } from 'blaise-api-node-client';
import { EditorInformation } from '../../../common/interfaces/caseInterface';

const EditorInformationMockObject: EditorInformation = {
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

export default EditorInformationMockObject;
