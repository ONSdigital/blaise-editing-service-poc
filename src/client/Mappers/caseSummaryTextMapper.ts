import { CaseSummaryDetails } from '../../common/interfaces/caseInterface';

export default function mapCaseSummaryText(caseSummary: CaseSummaryDetails): string {
  let caseSummaryText = `Case ID:      ${caseSummary.CaseId}\n`;
  caseSummaryText += `Interviewer:   ${caseSummary.InterviewerName}\n`;
  caseSummaryText += `Address:       ${caseSummary.Address.AddressLine1}\n`;
  caseSummaryText += `               ${caseSummary.Address.AddressLine1}\n`;
  caseSummaryText += `               ${caseSummary.Address.AddressLine2}\n`;
  caseSummaryText += `               ${caseSummary.Address.AddressLine3}\n`;
  caseSummaryText += `               ${caseSummary.Address.AddressLine4}\n`;
  caseSummaryText += `               ${caseSummary.Address.Town}\n`;
  caseSummaryText += `               ${caseSummary.Address.County}\n`;
  caseSummaryText += `               ${caseSummary.Address.Postcode}\n`;
  caseSummaryText += `Outcome        ${caseSummary.OutcomeCode}\n`;
  caseSummaryText += `Respondents    ${caseSummary.NumberOfRespondents}\n`;

  return caseSummaryText;
}
