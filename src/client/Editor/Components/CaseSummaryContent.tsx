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
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Serial Number</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.CaseId}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Outcome code</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.OutcomeCode}</dd>

        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Interview date</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.InterviewDate.toDateString()}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">District</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.Address.County}</dd>

        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Interviewer number</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.InterviewerNumber}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Interviewer name</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.InterviewerName}</dd>

        {/* Individual details */}

        {/* Household composition */}
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Address:</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.Address.AddressLine1}</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.Address.AddressLine2}</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.Address.AddressLine3}</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.Address.AddressLine4}</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.Address.Town}</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.Address.County}</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.Address.Postcode}</dd>

        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Type of accommodation</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.Type}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Floor number</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.FloorNumber}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Household status</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.Status}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Number of bedrooms</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.NumberOfBedrooms}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Receipt of housing benefit</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.ReceiptOfHousingBenefit}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Period code</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.PeriodCode}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Council tax band</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.CouncilTaxBand}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Business room?</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.BusinessRoom}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Anyone self emplyed?</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.SelfEmployed}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">H/H members</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.SelfEmployedMembers}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Income support received now</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.IncomeSupport}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">H/H members</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.IncomeSupportMembers}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Income based JA received now</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.IncomeBasesJaSupport}</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">H/H members</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummary.Household.IncomeBasesJaSupportMembers}</dd>

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
