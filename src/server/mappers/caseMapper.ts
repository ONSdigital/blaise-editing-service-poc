import { CaseResponse } from 'blaise-api-node-client';
import { CaseSummaryDetails } from '../../common/interfaces/caseInterface';

export default function mapCaseSummary(caseResponse: CaseResponse): CaseSummaryDetails {
  const caseSummary: CaseSummaryDetails = {
    CaseId: caseResponse.caseId,
    OutcomeCode: Number(caseResponse.fieldData['qhAdmin.HOut']),
    InterviewDate: new Date(caseResponse.fieldData['QSignIn.StartDat']),
    District: caseResponse.fieldData['qDataBag.District'],
    InterviewerName: caseResponse.fieldData['qhAdmin.Interviewer[1]'],
    NumberOfRespondents: Number(caseResponse.fieldData['dmhSize']),
    Household: {
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
