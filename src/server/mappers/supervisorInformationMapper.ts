import { CaseEditInformation, EditedStatus } from 'blaise-api-node-client';
import { SupervisorInformation } from '../../common/interfaces/caseInterface';

export default function mapSupervisorInformaiton(caseEditInformationList: CaseEditInformation[]): SupervisorInformation {
  const TotalNumberOfCases = caseEditInformationList.length;
  const NumberOfCasesNotAllocated = caseEditInformationList.filter((caseEditInformation) => caseEditInformation.assignedTo === '').length;
  const NumberOfCasesAllocated = caseEditInformationList.filter((caseEditInformation) => caseEditInformation.assignedTo !== '').length;
  const NumberOfCasesCompleted = caseEditInformationList.filter((caseEditInformation) => caseEditInformation.editedStatus === EditedStatus.Finished).length;

  const Editors: {
    EditorName: string,
    NumberOfCasesAllocated: number,
    NumberOfCasesCompleted: number,
    NumberOfCasesQueried: number
  }[] = [];

  caseEditInformationList.forEach((caseEditInformation) => {
    const foundEditor = Editors.find((editor) => editor.EditorName === caseEditInformation.assignedTo);

    if (foundEditor) {
      foundEditor.NumberOfCasesAllocated += 1;
      foundEditor.NumberOfCasesCompleted += caseEditInformation.editedStatus === EditedStatus.Finished ? 1 : 0;
      foundEditor.NumberOfCasesQueried += caseEditInformation.editedStatus === EditedStatus.Query ? 1 : 0;
    } else if (caseEditInformation.assignedTo !== '') {
      Editors.push({
        EditorName: caseEditInformation.assignedTo,
        NumberOfCasesAllocated: 1,
        NumberOfCasesCompleted: caseEditInformation.editedStatus === EditedStatus.Finished ? 1 : 0,
        NumberOfCasesQueried: caseEditInformation.editedStatus === EditedStatus.Query ? 1 : 0,
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
