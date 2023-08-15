import { CaseOutcome } from 'blaise-api-node-client';
import { CaseDetails } from '../../common/interfaces/caseInterface';

export default class CaseDetailsBuilder {
  static CaseStatusList: CaseOutcome[] = [CaseOutcome.Completed,
    CaseOutcome.HQRefusal,
    CaseOutcome.DeleteRequested];

  static BuildCaseDetails(numberOfCases: number) {
    const caseDetailsList: CaseDetails[] = [];

    for (let caseNumber = 1; caseNumber <= numberOfCases; caseNumber += 1) {
      const caseOutcomeIndex = (caseNumber - 1) % this.CaseStatusList.length;

      caseDetailsList.push({
        CaseId: String(caseNumber),
        CaseStatus: this.CaseStatusList[caseOutcomeIndex] as CaseOutcome,
        CaseLink: `http://www.cati.com/${caseNumber}`,
        QuestionnaireName: 'OPN2201A',
      });
    }
    return caseDetailsList;
  }
}
