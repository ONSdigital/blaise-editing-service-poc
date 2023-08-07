import { CaseResponse, CaseStatus } from 'blaise-api-node-client';
import { CaseDetails, CaseFactsheet } from '../../common/interfaces/case.interface';

export function mapCaseDetails(caseStatusList: CaseStatus[], questionnaireName:string, externalWebUrl:string): CaseDetails[] {
  return caseStatusList.map((caseStatus) => ({
    CaseId: caseStatus.primaryKey,
    CaseStatus: caseStatus.outcome,
    CaseLink: `https://${externalWebUrl}/${questionnaireName}?Mode=CAWI&KeyValue=${caseStatus.primaryKey}`,
  }));
}

export function mapCaseFactsheet(caseResponse: CaseResponse): CaseFactsheet {
  return {
    CaseId: caseResponse.caseId,
  };
}
