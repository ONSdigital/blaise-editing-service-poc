import { ReactElement, SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ONSButton, ONSPanel, ONSTextInput } from 'blaise-design-system-react-components';
import { CaseSummaryDetails } from '../../../common/interfaces/caseInterface';
import { recodeCase } from '../../api/NodeApi';
import { CaseSummaryParams } from '../../Common/types/CaseSummaryParams';
import { Message } from '../../Common/types/MessageType';
import ErrorPanel from '../../Common/components/ErrorPanel';
import SuccessPanel from '../../Common/components/SuccessPanel';

function DisplayRecodeContent(questionnaireName: string, caseId: string) {
  // const caseSummary = useAsyncRequestWithTwoParams<CaseSummaryDetails, string, string>(getCaseSummary, questionnaireName, caseId);
  const caseSummary: CaseSummaryDetails = {
    CaseId: caseId,
    OutcomeCode: '110',
    InterviewDate: new Date('2024-05-11'),
    District: 'Gwent',
    InterviewerName: 'Rich',
    NumberOfRespondents: '2',
    Household: {
      Accommodation: {
        Main: 'House/Bungalow',
        Type: 'Detached',
      },
      FloorNumber: '2',
      Status: 'Conventional',
      NumberOfBedrooms: '2',
      ReceiptOfHousingBenefit: [
        {
          Amount: '380',
          PeriodCode: 'One week',
        },
        {
          Amount: '420',
          PeriodCode: 'Two weeks',
        },
      ],
      CouncilTaxBand: 'Band A',
      BusinessRoom: true,
      SelfEmployed: true,
      SelfEmployedMembers: ['1', '2'],
      IncomeSupport: true,
      IncomeSupportMembers: ['1'],
      IncomeBasedJaSupport: true,
      IncomeBasedJaSupportMembers: ['1'],
    },
    Respondents: [
      {
        PersonNumber: '1',
        RespondentName: 'Richmond Ricecake',
        BenefitUnit: '1',
        Sex: 'M',
        DateOfBirth: new Date('1980-01-15'),
        MaritalStatus: 'COH',
        Relationship: ['*', '1'],
      },
      {
        PersonNumber: '2',
        RespondentName: 'Betty Bettison',
        BenefitUnit: '1',
        Sex: 'F',
        DateOfBirth: new Date('1995-06-11'),
        MaritalStatus: 'COH',
        Relationship: ['1', '*'],
      },
    ],
  };

  const [outcomeCodeValue, setOutcomeCodeValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const defaultMessage: Message = { show: false, text: '', type: '' };
  const [message, setMessage] = useState(defaultMessage);

  const handleOutcomeCodeChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setOutcomeCodeValue(e.target?.value);
  };

  async function updateOutcomeFunction() {
    setMessage({ show: false, text: '', type: '' });

    if (outcomeCodeValue.length !== 3) {
      setMessage({ show: true, text: 'Outcome code must be three characters in length. i.e. 210', type: 'error' });
      return;
    }

    try {
      await recodeCase(questionnaireName, caseId, outcomeCodeValue);
      caseSummary.OutcomeCode = outcomeCodeValue;
      setMessage({ show: true, text: 'Case was successfully recoded', type: 'success' });
    } catch (error) {
      setMessage({ show: true, text: 'Case could not be recoded', type: 'error' });
    }
  }

  return (
    <div data-testid="Summary">
      {/*       <AsyncContent content={caseSummary}>
        {(caseSummaryDetails) => (
          <>
          </>
        )}
      </AsyncContent>
 */}
      <ONSPanel status="info">
        <dl
          className="ons-metadata ons-metadata__list ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
          title="Questionnares"
          data-testid={`${questionnaireName}-Recode-Content`}
          style={{ padding: '0 0 15px 5px' }}
        >
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Serial Number:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m">{caseSummary.CaseId}</dd>
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Outcome code:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m">{caseSummary.OutcomeCode}</dd>
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Interview date:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m">{caseSummary.InterviewDate.toDateString()}</dd>
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">District:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m">{caseSummary.District}</dd>
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Interviewer name:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m">{caseSummary.InterviewerName}</dd>
        </dl>
      </ONSPanel>
      {message.show && message.type === 'error' && <ErrorPanel message={message.text} setMessage={setMessage} /> }
      {message.show && message.type === 'success' && <SuccessPanel message={message.text} setMessage={setMessage} /> }
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
    </div>
  );
}

export default function CaseSearchForm(): ReactElement {
  const { questionnaireName, caseId } = useParams<keyof CaseSummaryParams>() as CaseSummaryParams;

  return DisplayRecodeContent(questionnaireName, caseId);
}
