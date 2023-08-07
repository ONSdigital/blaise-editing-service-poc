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
      OutcomeCode: caseResponse.caseData["qhAdmin.HOut"],
      InterviewerName: caseResponse.caseData["qhAdmin.Interviewer[1]"],
      NumberOfRespondants: caseResponse.caseData["qHousehold.QHHold.PerCount"],
      Address: {
        AddressLine1: caseResponse.caseData["qDataBag.Prem1"],
        AddressLine2: caseResponse.caseData["qDataBag.Prem2"],
        AddressLine3: caseResponse.caseData["qDataBag.Prem3"],
        AddressLine4: caseResponse.caseData["qDataBag.Prem4"],
        County: caseResponse.caseData["qDataBag.District"],
        Town: caseResponse.caseData["qDataBag.PostTown"],
        Postcode: caseResponse.caseData["qDataBag.PostCode"],
      },
      Respondents: [{
        RespondentName: caseResponse.caseData["dmName[1]"],
        DateOfBirth: caseResponse.caseData['dmDteOfBth[1]'],
      },
      {
        RespondentName: caseResponse.caseData["dmName[2]"],
        DateOfBirth: caseResponse.caseData['dmDteOfBth[2]'],
      }]
  };
}
