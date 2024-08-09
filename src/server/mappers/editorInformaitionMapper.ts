import { CaseEditInformation } from 'blaise-api-node-client';
import { EditorInformation } from '../../common/interfaces/caseInterface';

export default function mapEditorInformaiton(caseEditInformationList: CaseEditInformation[], username: string): EditorInformation {
  const cases:{
    CaseId: string,
    EditStatus: string
  }[] = [];

  caseEditInformationList.forEach((caseEditInformation) => {
    if (caseEditInformation.assignedTo === username) {
      cases.push({
        CaseId: caseEditInformation.primaryKey,
        EditStatus: caseEditInformation.editedStatus.toString(),
      });
    }
  });

  const numberOfCasesAllocated = cases.length;
  const editorInformation: EditorInformation = {
    numberOfCasesAllocated,
    Cases: cases,
  };

  return editorInformation;
}
