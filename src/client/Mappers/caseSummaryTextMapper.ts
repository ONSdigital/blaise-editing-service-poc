import { CaseSummaryDetails } from '../../common/interfaces/caseInterface';

export default function mapCaseSummaryText(caseSummary: CaseSummaryDetails): string {
  let caseSummaryText = `Case ID:      ${caseSummary.CaseId}\n`;
  caseSummaryText += `Interviewer:   ${caseSummary.InterviewerName}\n`;
  caseSummaryText += `Outcome        ${caseSummary.OutcomeCode}\n`;
  caseSummaryText += `Respondents    ${caseSummary.NumberOfRespondents}\n`;

  return caseSummaryText;
}
