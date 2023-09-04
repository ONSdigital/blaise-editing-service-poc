import { useParams } from 'react-router-dom';
import { ReactElement } from 'react';
import AsyncContent from '../components/AsyncContent';
import CasesList from '../components/CasesList';
import { useAsyncRequestWithParam } from '../hooks/useAsyncRequest';
import { CaseDetails } from '../../common/interfaces/caseInterface';
import NodeApi from '../clients/NodeApi';

function DisplayCases(nodeApi: NodeApi, questionnaireName: string) {
  const { getCases } = nodeApi;
  const cases = useAsyncRequestWithParam<CaseDetails[], string>(getCases, questionnaireName);

  return (
    <div data-testid="Cases">
      <AsyncContent content={cases}>
        {(loadedCases) => <CasesList cases={loadedCases} />}
      </AsyncContent>
    </div>
  );
}

interface CasesProps {
  nodeApi: NodeApi;
}

export default function Cases({ nodeApi }:CasesProps): ReactElement {
  const { questionnaireName } = useParams();
  if (!questionnaireName) {
    return (
      <div>
        No questionnaire name
      </div>
    );
  }

  return DisplayCases(nodeApi, questionnaireName);
}
