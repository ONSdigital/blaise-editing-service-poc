import { CaseEditInformation } from 'blaise-api-node-client/lib/cjs/interfaces/case';
import { User } from 'blaise-api-node-client/lib/cjs/blaiseApiClient';
import { CasesNotAllocatedInformation } from '../Interfaces/caseAllocationInterface';

export default function mapCasesNotAllocated(caseEditInformationList: CaseEditInformation[], editors: User[]): CasesNotAllocatedInformation {
  const caseNotAllocated = <CasesNotAllocatedInformation>{ editors: [], interviewers: [] };
  caseNotAllocated.editors = editors.map((editor) => editor.name);

  caseEditInformationList.forEach((caseEditInformation) => {
    if (caseEditInformation.assignedTo !== '') return;

    const interviewer = caseNotAllocated.interviewers?.find((c) => c.Interviewer === caseEditInformation.interviewer);

    if (interviewer !== undefined) {
      interviewer.Cases.push(caseEditInformation.primaryKey);
    } else {
      caseNotAllocated.interviewers.push({
        Interviewer: caseEditInformation.interviewer,
        Cases: [caseEditInformation.primaryKey],
      });
    }
  });

  return caseNotAllocated;
}
