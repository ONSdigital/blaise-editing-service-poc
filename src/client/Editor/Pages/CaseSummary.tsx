import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { getCaseSummary } from '../../api/NodeApi';
import { useAsyncRequestWithTwoParams } from '../../Common/hooks/useAsyncRequest';
import AsyncContent from '../../Common/components/AsyncContent';
import { CaseSummaryDetails } from '../../../common/interfaces/caseInterface';
import CaseSummaryContent from '../Components/CaseSummaryContent';

function DisplayCaseSummary(questionnaireName: string, caseId: string) {
  const caseSummary = useAsyncRequestWithTwoParams<CaseSummaryDetails, string, string>(getCaseSummary, questionnaireName, caseId);

  return (
    <div data-testid="Summary">
      <AsyncContent content={caseSummary}>
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

  return DisplayCaseSummary(questionnaireName, caseId);
}
