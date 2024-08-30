import { CaseEditInformation } from 'blaise-api-node-client/lib/cjs/interfaces/case';
import { EditedStatus } from 'blaise-api-node-client/lib/cjs/enums/editedStatus';
import { EditorInformation } from '../Interfaces/editorInterface';

const EditedStatusDescription = new Map<EditedStatus, string>([
  [EditedStatus.NotStarted, 'Not started'],
  [EditedStatus.Started, 'Started'],
  [EditedStatus.Query, 'Queried'],
  [EditedStatus.Finished, 'Finished'],
]);

export default function mapEditorInformation(caseEditInformationList: CaseEditInformation[]): EditorInformation {
  const cases:{
    CaseId: string,
    EditStatus: string
  }[] = [];

  caseEditInformationList.forEach((caseEditInformation) => {
    cases.push({
      CaseId: caseEditInformation.primaryKey,
      EditStatus: EditedStatusDescription.get(caseEditInformation.editedStatus) ?? 'N/A',
    });
  });

  const numberOfCasesAllocated = cases.length;
  return {
    numberOfCasesAllocated,
    Cases: cases,
  };
}
