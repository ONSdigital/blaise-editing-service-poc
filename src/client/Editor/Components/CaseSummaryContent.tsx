import { ReactElement } from 'react';
import { ONSPanel, ONSTable } from 'blaise-design-system-react-components';
import { CaseSummaryDetails } from '../../../common/interfaces/caseInterface';

interface CaseSummaryContentProps {
  caseSummary: CaseSummaryDetails;
}

function GetColumnHeadings(numberOfRespondents: number): string[] {
  const columns = [
    '',
    'Name',
    'BU',
    'Sex',
    'DOB',
    'Marital status',
  ];

  for (let respondent = 1; respondent <= numberOfRespondents; respondent += 1) {
    columns.push(`${respondent}`);
  }

  return columns;
}

export default function CaseSummaryContent({ caseSummary }: CaseSummaryContentProps): ReactElement {
  return (
    <>
      <ONSPanel status="info">
        Case summary for
        {' '}
        <strong>{caseSummary.CaseId}</strong>
        {' '}
        completed by
        {' '}
        <strong>{caseSummary.InterviewerName}</strong>
      </ONSPanel>
      <dl
        className="ons-metadata ons-metadata__list ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
        style={{ margin: '2% 5% 2% 5%' }}
        title="summary"
      >
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Serial Number</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.CaseId}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Outcome code</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.OutcomeCode}</dd>

        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Interview date</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.InterviewDate.toDateString()}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">District</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.District}</dd>

        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Interviewer name</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.InterviewerName}</dd>
      </dl>
      <br />
      {/* Individual details */}

      <ONSTable
        columns={GetColumnHeadings(Number(caseSummary.NumberOfRespondents))}
        tableCaption="Relationship Grid"
        tableID="Respondents-table"
      >
        <>
          {caseSummary.Respondents.map((respondent) => (
            <tr
              className="ons-table__row"
              key={respondent.PersonNumber}
            >
              <td className="ons-table__cell" aria-label="RespondentNumber">
                {respondent.PersonNumber}
              </td>
              <td className="ons-table__cell status" aria-label="RespondentName">
                {respondent.RespondentName}
              </td>
              <td className="ons-table__cell" aria-label="BenefitUnit">
                {respondent.BenefitUnit}
              </td>
              <td className="ons-table__cell" aria-label="Sex">
                {respondent.Sex}
              </td>
              <td className="ons-table__cell" aria-label="DateOfBirth">
                {respondent.DateOfBirth.toDateString()}
              </td>
              <td className="ons-table__cell" aria-label="$MaritalStatus">
                {respondent.MaritalStatus}
              </td>
              {respondent.Relationship.map((relationship) => (
                <td className="ons-table__cell" aria-label={`Relationship-${respondent.PersonNumber}`}>
                  {relationship}
                </td>
              ))}
            </tr>
          ))}
        </>
      </ONSTable>

    </>
  );
}
