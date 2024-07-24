import { ONSPanel } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';

export default function CaseSummary(): ReactElement {
  return (
    <>
      <ONSPanel spacious status="info">
        Case summary for
        {' '}
        <strong>10001011</strong>
        {' '}
        completed by
        {' '}
        <strong>Inteviewer1</strong>
      </ONSPanel>
      <dl
        className="ons-metadata ons-metadata__list ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
        style={{ margin: '2% 10% 2% 10%' }}
        title="summary"
      >
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">CaseId:</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">10001011</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Address:</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">1</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">Test Street</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m" />
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m" />
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">Test Town</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">Test County</dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">TE5 TPC</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Interviewer:</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">Inteviewer1</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Outcome code:</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">110</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Household size:</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m">4</dd>
        <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Respondents:</dt>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m" key="Test Person 1">
          Test Person 1
          {' '}
          17/09/1994
        </dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m" key="Test Person 1">
          Test Person 2
          {' '}
          02/03/1997
        </dd>
        <dd className="ons-metadata__value ons-grid__col ons-col-9@m" key="Test Person 1">
          Test Person 3
          {' '}
          07/06/2010
        </dd>
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
