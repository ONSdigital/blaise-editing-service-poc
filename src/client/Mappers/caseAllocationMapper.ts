import { CaseEditInformation } from 'blaise-api-node-client/lib/cjs/interfaces/case';
import { User } from 'blaise-api-node-client/lib/cjs/blaiseApiClient';
import { AllocationDetails } from '../Interfaces/allocationInterface';

function mapEditorDetails(caseEditInformationList: CaseEditInformation[], editors: User[], allocationDetails: AllocationDetails) {
  editors.forEach((editor) => {
    allocationDetails.editors.push({
      name: editor.name,
      Cases: [],
    });
  });

  caseEditInformationList.forEach((caseEditInformation) => {
    if (caseEditInformation.assignedTo === '') {
      return;
    }

    const editorItem = allocationDetails.editors?.find((e) => e.name === caseEditInformation.assignedTo);

    if (editorItem !== undefined) {
      editorItem.Cases.push(caseEditInformation.primaryKey);
    }
  });
}

function mapInterviewerDetails(caseEditInformationList: CaseEditInformation[], allocationDetails: AllocationDetails) {
  caseEditInformationList.forEach((caseEditInformation) => {
    if (caseEditInformation.assignedTo !== '') {
      return;
    }

    const interviewerItem = allocationDetails.interviewers?.find((i) => i.name === caseEditInformation.interviewer);

    if (interviewerItem !== undefined) {
      interviewerItem.Cases.push(caseEditInformation.primaryKey);
    } else {
      allocationDetails.interviewers.push({
        name: caseEditInformation.interviewer,
        Cases: [caseEditInformation.primaryKey],
      });
    }
  });
}

export default function mapAllocationDetails(caseEditInformationList: CaseEditInformation[], editors: User[]): AllocationDetails {
  const allocationDetails = <AllocationDetails>{ editors: [], interviewers: [] };

  mapEditorDetails(caseEditInformationList, editors, allocationDetails);
  mapInterviewerDetails(caseEditInformationList, allocationDetails);

  return allocationDetails;
}
