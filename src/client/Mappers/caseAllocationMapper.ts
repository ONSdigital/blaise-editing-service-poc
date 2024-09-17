import { CaseEditInformation } from 'blaise-api-node-client/lib/cjs/interfaces/case';
import { CasesNotAllocatedInformation } from '../Interfaces/caseAllocationInterface';

export default function mapCasesNotAllocated(caseEditInformationList: CaseEditInformation[]): CasesNotAllocatedInformation {
  const caseNotAllocated = <CasesNotAllocatedInformation>{ interviewerCases: [] };

  caseEditInformationList.forEach((caseEditInformation) => {
    if (caseEditInformation.assignedTo !== '') return;

    const interviewer = caseNotAllocated.interviewerCases?.find((c) => c.Interviewer === caseEditInformation.interviewer);

    if (interviewer !== undefined) {
      interviewer.Cases.push(caseEditInformation.primaryKey);
    } else {
      caseNotAllocated.interviewerCases.push({
        Interviewer: caseEditInformation.interviewer,
        Cases: [caseEditInformation.primaryKey],
      });
    }
  });

  return caseNotAllocated;
}
