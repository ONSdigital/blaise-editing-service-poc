import { CaseSummaryDetails } from '../../common/interfaces/caseInterface';

export default function mapCaseSummaryText(caseSummary: CaseSummaryDetails): string {
  let caseSummaryText = `Case ID:      ${caseSummary.CaseId}\n`;
  caseSummaryText += `Interviewer:   ${caseSummary.InterviewerName}\n`;
  caseSummaryText += `Address:       ${caseSummary.Household.Address.AddressLine1}\n`;
  caseSummaryText += `               ${caseSummary.Household.Address.AddressLine1}\n`;
  caseSummaryText += `               ${caseSummary.Household.Address.AddressLine2}\n`;
  caseSummaryText += `               ${caseSummary.Household.Address.AddressLine3}\n`;
  caseSummaryText += `               ${caseSummary.Household.Address.AddressLine4}\n`;
  caseSummaryText += `               ${caseSummary.Household.Address.Town}\n`;
  caseSummaryText += `               ${caseSummary.Household.Address.County}\n`;
  caseSummaryText += `               ${caseSummary.Household.Address.Postcode}\n`;
  caseSummaryText += `Outcome        ${caseSummary.OutcomeCode}\n`;
  caseSummaryText += `Respondents    ${caseSummary.NumberOfRespondents}\n`;

  return caseSummaryText;
}
