import { CaseStatus } from 'blaise-api-node-client';
import { CaseDetails } from '../interfaces/case.details.interface';

export default function mapCaseDetails(caseStatusList: CaseStatus[], questionnaireName:string, externalWebUrl:string): CaseDetails[] {
  return caseStatusList.map((caseStatus) => ({
    CaseId: caseStatus.primaryKey,
    CaseStatus: caseStatus.outcome,
    CaseLink: `https://${externalWebUrl}/${questionnaireName}?Mode=CAWI&KeyValue=${caseStatus.primaryKey}`,
  }));
}
