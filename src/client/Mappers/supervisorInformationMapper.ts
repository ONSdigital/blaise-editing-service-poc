import { CaseEditInformation } from 'blaise-api-node-client/lib/cjs/interfaces/case';
import EditedStatus from 'blaise-api-node-client/lib/cjs/enums/editedStatus';
import { User } from 'blaise-api-node-client/lib/cjs/interfaces/user';
import { SupervisorEditorInformation, SupervisorInformation } from '../Interfaces/supervisorInterface';

function MapEditors(caseEditInformationList: CaseEditInformation[], editors: User[]): SupervisorEditorInformation[] {
  const editorInformation: SupervisorEditorInformation[] = [];

  editors.forEach((editor) => {
    const casesAssignedToEditor = caseEditInformationList.filter((caseEditInformation) => caseEditInformation.assignedTo === editor.name);

    editorInformation.push({
      EditorName: editor.name,
      NumberOfCasesAllocated: casesAssignedToEditor.length,
      NumberOfCasesCompleted: casesAssignedToEditor.filter((caseEditInformation) => caseEditInformation.editedStatus === EditedStatus.Finished).length,
      NumberOfCasesQueried: casesAssignedToEditor.filter((caseEditInformation) => caseEditInformation.editedStatus === EditedStatus.Query).length,
    });
  });
  return editorInformation;
}

export default function mapSupervisorInformation(caseEditInformationList: CaseEditInformation[], editors: User[]): SupervisorInformation {
  const totalNumberOfCases = caseEditInformationList.length;
  const numberOfCasesNotAllocated = caseEditInformationList.filter((caseEditInformation) => caseEditInformation.assignedTo === '').length;
  const numberOfCasesAllocated = caseEditInformationList.filter((caseEditInformation) => caseEditInformation.assignedTo !== '').length;
  const numberOfCasesCompleted = caseEditInformationList.filter((caseEditInformation) => caseEditInformation.editedStatus === EditedStatus.Finished).length;
  const editorInformation : SupervisorEditorInformation[] = MapEditors(caseEditInformationList, editors);

  return {
    TotalNumberOfCases: totalNumberOfCases,
    NumberOfCasesNotAllocated: numberOfCasesNotAllocated,
    NumberOfCasesAllocated: numberOfCasesAllocated,
    NumberOfCasesCompleted: numberOfCasesCompleted,
    EditorInformation: editorInformation,
  };
}
