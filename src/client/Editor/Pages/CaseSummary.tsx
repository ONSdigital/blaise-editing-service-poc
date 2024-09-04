import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { getCaseSummary } from '../../api/NodeApi';
import { useAsyncRequestWithTwoParams } from '../../Common/hooks/useAsyncRequest';
import AsyncContent from '../../Common/components/AsyncContent';
import { CaseSummaryDetails } from '../../../common/interfaces/caseInterface';
import CaseSummaryContent from '../Components/CaseSummaryContent';

function DisplayCaseFactsheet(questionnaireName: string, caseId: string) {
  const caseFactsheet = useAsyncRequestWithTwoParams<CaseSummaryDetails, string, string>(getCaseSummary, questionnaireName, caseId);

  return (
    <div data-testid="Summary">
      <AsyncContent content={caseFactsheet}>
        {(caseSummaryContent) => <CaseSummaryContent caseSummary={caseSummaryContent} />}
      </AsyncContent>
    </div>
  );
}

export type CaseSummaryParams = {
  questionnaireName: string
  caseId: string
};

export default function CaseSummary(): ReactElement {
  const { questionnaireName, caseId } = useParams<keyof CaseSummaryParams>() as CaseSummaryParams;

  return DisplayCaseFactsheet(questionnaireName, caseId);
}
