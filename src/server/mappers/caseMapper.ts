import { CaseResponse } from 'blaise-api-node-client';
import { CaseSummaryDetails } from '../../common/interfaces/caseInterface';

export default function mapCaseSummary(caseResponse: CaseResponse): CaseSummaryDetails {
  const caseSummary: CaseSummaryDetails = {
    CaseId: caseResponse.caseId,
    OutcomeCode: Number(caseResponse.fieldData['qhAdmin.HOut']),
    InterviewDate: new Date(2024, 5, 11),
    InterviewerName: caseResponse.fieldData['qhAdmin.Interviewer[1]'],
    InterviewerNumber: '2100',
    NumberOfRespondents: Number(caseResponse.fieldData['dmhSize']),
    Household: {
      Address: {
        AddressLine1: caseResponse.fieldData['qDataBag.Prem1'],
        AddressLine2: caseResponse.fieldData['qDataBag.Prem2'],
        AddressLine3: caseResponse.fieldData['qDataBag.Prem3'],
        AddressLine4: caseResponse.fieldData['qDataBag.Prem4'],
        County: caseResponse.fieldData['qDataBag.District'],
        Town: caseResponse.fieldData['qDataBag.PostTown'],
        Postcode: caseResponse.fieldData['qDataBag.PostCode'],
      },
      Type: '',
      FloorNumber: 0,
      Status: '',
      NumberOfBedrooms: 1,
      ReceiptOfHousingBenefit: 380,
      PeriodCode: 380,
      CouncilTaxBand: 'band A',
      BusinessRoom: false,
      SelfEmployed: false,
      SelfEmployedMembers: '',
      IncomeSupport: false,
      IncomeSupportMembers: '',
      IncomeBasesJaSupport: false,
      IncomeBasesJaSupportMembers: '',
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
