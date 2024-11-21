import { ReactElement, SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ONSButton, ONSPanel, ONSTextInput } from 'blaise-design-system-react-components';
import { useAsyncRequestWithTwoParams } from '../../Common/hooks/useAsyncRequest';
import { CaseSummaryDetails } from '../../../common/interfaces/caseInterface';
import { getCaseSummary, recodeCase } from '../../api/NodeApi';
import { CaseSummaryParams } from '../../Common/types/CaseSummaryParams';
import AsyncContent from '../../Common/components/AsyncContent';

function DisplayRecodeContent(questionnaireName: string, caseId: string) {
  const caseSummary = useAsyncRequestWithTwoParams<CaseSummaryDetails, string, string>(getCaseSummary, questionnaireName, caseId);

  const [outcomeCodeValue, setOutcomeCodeValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleOutcomeCodeChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setOutcomeCodeValue(e.target?.value);
  };

  async function updateOutcomeFunction() {
    if (outcomeCodeValue.length !== 3) {
      // show error
      return;
    }

    await recodeCase(questionnaireName, caseId, outcomeCodeValue);
  }

  return (
    <div data-testid="Summary">
      <AsyncContent content={caseSummary}>
        {(caseSummaryDetails) => (
          <>
            <ONSPanel status="info">
              Case summary for
              {' '}
              <strong>{caseSummaryDetails.CaseId}</strong>
              {' '}
              completed by
              {' '}
              <strong>{caseSummaryDetails.InterviewerName}</strong>
            </ONSPanel>
            <dl
              className="ons-metadata ons-metadata__list ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
              style={{ margin: '2% 5% 2% 5%' }}
              title="summary"
            >
              <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Serial Number</dt>
              <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummaryDetails.CaseId}</dd>
              <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Outcome code</dt>
              <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummaryDetails.OutcomeCode}</dd>

              <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Interview date</dt>
              <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummaryDetails.InterviewDate.toDateString()}</dd>
              <dt className="ons-metadata__term ons-grid__col ons-col-3@m">District</dt>
              <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummaryDetails.District}</dd>

              <dt className="ons-metadata__term ons-grid__col ons-col-3@m">Interviewer name</dt>
              <dd className="ons-metadata__value ons-grid__col ons-col-9@m">{caseSummaryDetails.InterviewerName}</dd>
            </dl>

            <br />
            <ONSTextInput
              label="Enter new outcome code"
              id="outcomecode"
              autoFocus
              onChange={handleOutcomeCodeChange}
            />
            <ONSButton
              label="Update"
              primary
              loading={submitting}
              onClick={async () => { setSubmitting(true); await updateOutcomeFunction(); setSubmitting(false); }}
            />
            <br />
            <br />

          </>
        )}
      </AsyncContent>

    </div>
  );
}

export default function CaseSearchForm(): ReactElement {
  const { questionnaireName, caseId } = useParams<keyof CaseSummaryParams>() as CaseSummaryParams;

  return DisplayRecodeContent(questionnaireName, caseId);
}
