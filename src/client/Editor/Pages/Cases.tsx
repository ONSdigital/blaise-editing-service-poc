import { useParams } from 'react-router-dom';
import { ReactElement } from 'react';
import { User } from 'blaise-api-node-client';
import AsyncContent from '../../Common/components/AsyncContent';
import CasesList from '../Components/CasesList';
import { useAsyncRequestWithTwoParams } from '../../Common/hooks/useAsyncRequest';
import { CaseDetails } from '../../../common/interfaces/caseInterface';
import { getCases } from '../../Common/api/NodeApi';

function DisplayCases(questionnaireName: string, username: string) {
  const cases = useAsyncRequestWithTwoParams<CaseDetails[], string, string>(getCases, questionnaireName, username);

  return (
    <div data-testid="Cases">
      <AsyncContent content={cases}>
        {(loadedCases) => <CasesList questionnaireName={questionnaireName} cases={loadedCases} />}
      </AsyncContent>
    </div>
  );
}

interface CasesProps {
  user: User
}

export type CasesParams = {
  questionnaireName: string
};

export default function Cases({ user }: CasesProps): ReactElement {
  const { questionnaireName } = useParams<keyof CasesParams>() as CasesParams;

  return DisplayCases(questionnaireName, user.name);
}
