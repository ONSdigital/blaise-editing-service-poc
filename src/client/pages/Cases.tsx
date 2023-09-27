import { useParams } from 'react-router-dom';
import { ReactElement } from 'react';
import AsyncContent from '../components/AsyncContent';
import CasesList from '../components/CasesList';
import { useAsyncRequestWithTwoParams } from '../hooks/useAsyncRequest';
import { CaseDetails } from '../../common/interfaces/caseInterface';
import { getCases } from '../api/NodeApi';
import { User } from 'blaise-api-node-client';

function DisplayCases(questionnaireName: string, username: string) {
  const cases = useAsyncRequestWithTwoParams<CaseDetails[], string, string>(getCases, questionnaireName, username);

  return (
    <div data-testid="Cases">
      <AsyncContent content={cases}>
        {(loadedCases) => <CasesList cases={loadedCases} />}
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
