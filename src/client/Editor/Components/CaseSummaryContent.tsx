import { ReactElement } from 'react';
import { ONSPanel } from 'blaise-design-system-react-components';
import { CaseSummaryDetails } from '../../../common/interfaces/caseInterface';

interface CaseSummaryContentProps {
  caseSummary: CaseSummaryDetails;
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
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">CaseId:</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.CaseId}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Address:</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Address.AddressLine1}</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Address.AddressLine2}</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Address.AddressLine3}</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Address.AddressLine4}</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Address.Town}</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Address.County}</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Address.Postcode}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Interviewer:</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.InterviewerName}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Outcome code:</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.OutcomeCode}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Household size:</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.NumberOfRespondents}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Respondents:</dt>

        {caseSummary.Respondents.map((respondent) => (
          <dd className="ons-metadata__value ons-grid__col ons-col-9@m" key={respondent.RespondentName}>
            {respondent.RespondentName}
            {' '}
            {respondent.DateOfBirth.toDateString()}
          </dd>
        ))}

        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Notes:</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">
          These are the notes that the editor has made and has
          been extracted from the quetsionnarie. They may be able
          to be edited and saved again in this screen. If this is what you wish to do?
        </dd>
      </dl>

    </>
  );
}
