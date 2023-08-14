import { CaseFactsheetDetails } from '../../common/interfaces/case';

interface FactsheetContentProps {
  factsheet: CaseFactsheetDetails;
}

export default function FactsheetContent({ factsheet }: FactsheetContentProps) {
  return (
    <div data-testid="factsheetId">
      {factsheet.CaseId}
      {factsheet.Address.AddressLine1}
      {factsheet.Address.AddressLine2}
      {factsheet.Address.AddressLine3}
      {factsheet.Address.AddressLine4}
      {factsheet.Address.County}
      {factsheet.Address.Postcode}
      {factsheet.Address.Town}
      {factsheet.InterviewerName}
      {factsheet.NumberOfRespondents}
      {factsheet.OutcomeCode}
      {factsheet.Respondents.map((respondent) => (
        <div key={respondent.RespondentName}>
          {respondent.RespondentName}
          {String(respondent.DateOfBirth)}
        </div>
      ))}
    </div>
  );
}
