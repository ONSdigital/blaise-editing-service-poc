import { CaseEditInformation } from 'blaise-api-node-client';
import { SupervisorInformation } from '../../common/interfaces/caseInterface';

export default function mapSupervisorInformaiton(caseEditInformationList: CaseEditInformation[]): SupervisorInformation {

  const TotalNumberOfCases = caseEditInformationList.length;
  const NumberOfCasesNotAllocated = caseEditInformationList.filter((caseEditInformation) => caseEditInformation.assignedTo === "").length;
  const NumberOfCasesAllocated = caseEditInformationList.filter((caseEditInformation) => caseEditInformation.assignedTo !== "").length;
  const NumberOfCasesCompleted = caseEditInformationList.filter((caseEditInformation) => caseEditInformation.editedStatus === "Complete").length;

  const Editors: {
    EditorName: string,
    NumberOfCasesAllocated: number,
    NumberOfCasesCompleted: number,
    NumberOfCasesQueried: number
  }[] = []

  caseEditInformationList.forEach((caseEditInformation) => {
    const editor = Editors.find(editor => editor.EditorName === caseEditInformation.assignedTo);

    if (editor) {
      editor.NumberOfCasesAllocated += 1;
      editor.NumberOfCasesCompleted += caseEditInformation.editedStatus === "Complete" ? 1 : 0;
      editor.NumberOfCasesQueried += caseEditInformation.editedStatus === "Queried" ? 1 : 0;
    } else {
      Editors.push({
        EditorName: caseEditInformation.assignedTo,
        NumberOfCasesAllocated: 1,
        NumberOfCasesCompleted: caseEditInformation.editedStatus === "Complete" ? 1 : 0,
        NumberOfCasesQueried: caseEditInformation.editedStatus === "Queried" ? 1 : 0,
      });
    }
  });

  const supervisorInformation: SupervisorInformation = {
    TotalNumberOfCases,
    NumberOfCasesNotAllocated,
    NumberOfCasesAllocated,
    NumberOfCasesCompleted,
    Editors,
  };

  return supervisorInformation;
}
