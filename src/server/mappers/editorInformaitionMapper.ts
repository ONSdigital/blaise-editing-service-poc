import { CaseEditInformation, EditedStatus } from 'blaise-api-node-client';
import { EditorInformation } from '../../common/interfaces/editorInterface';

export default function mapEditorInformaiton(caseEditInformationList: CaseEditInformation[]): EditorInformation {
  const cases:{
    CaseId: string,
    EditStatus: EditedStatus
  }[] = [];

  caseEditInformationList.forEach((caseEditInformation) => {
    cases.push({
      CaseId: caseEditInformation.primaryKey,
      EditStatus: caseEditInformation.editedStatus,
    });
  });

  const numberOfCasesAllocated = cases.length;
  return {
    numberOfCasesAllocated,
    Cases: cases,
  };
}
