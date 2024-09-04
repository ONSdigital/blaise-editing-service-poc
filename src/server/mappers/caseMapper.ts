import { CaseResponse } from 'blaise-api-node-client';
import { CaseSummaryDetails } from '../../common/interfaces/caseInterface';

export default function mapCaseSummary(caseResponse: CaseResponse): CaseSummaryDetails {
  const caseSummary: CaseSummaryDetails = {
    CaseId: caseResponse.caseId,
    OutcomeCode: Number(caseResponse.fieldData['qhAdmin.HOut']),
    InterviewerName: caseResponse.fieldData['qhAdmin.Interviewer[1]'],
    NumberOfRespondents: Number(caseResponse.fieldData['dmhSize']),
    Address: {
      AddressLine1: caseResponse.fieldData['qDataBag.Prem1'],
      AddressLine2: caseResponse.fieldData['qDataBag.Prem2'],
      AddressLine3: caseResponse.fieldData['qDataBag.Prem3'],
      AddressLine4: caseResponse.fieldData['qDataBag.Prem4'],
      County: caseResponse.fieldData['qDataBag.District'],
      Town: caseResponse.fieldData['qDataBag.PostTown'],
      Postcode: caseResponse.fieldData['qDataBag.PostCode'],
    },
    Respondents: [],
  };

  const numberOfRespondents = +caseSummary.NumberOfRespondents;

  if (Number.isNaN(numberOfRespondents) || numberOfRespondents === 0) {
    throw new Error('Number of responents not specified');
  }

  for (let respondentNumber = 1; respondentNumber <= numberOfRespondents; respondentNumber += 1) {
    caseSummary.Respondents.push({
      RespondentName: caseResponse.fieldData[`dmName[${respondentNumber}]`],
      DateOfBirth: new Date(caseResponse.fieldData[`dmDteOfBth[${respondentNumber}]`]),
    });
  }

  return caseSummary;
}
