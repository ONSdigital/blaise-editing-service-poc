import { ReactElement } from 'react';
import { CaseEditInformation } from 'blaise-api-node-client';
import { useAsyncRequestWithThreeParams } from '../../Common/hooks/useAsyncRequest';
import UserRole from '../../Common/enums/UserTypes';
import { getCaseSearchResults } from '../../api/NodeApi';
import AsyncContent from '../../Common/components/AsyncContent';
import CaseSearchResults from './CaseSearchResults';

interface CaseSearchDetailsProps {
  questionnaireName: string;
  caseId: string;
  role: UserRole
}

export default function CaseSearchDetails({ questionnaireName, caseId, role }: CaseSearchDetailsProps): ReactElement {
  const caseSearchResults = useAsyncRequestWithThreeParams<CaseEditInformation[], string, string, UserRole>(getCaseSearchResults, questionnaireName, caseId, role);
  return (
    <div className="case-search-results" data-testid="case-search-results">
      <AsyncContent content={caseSearchResults}>
        {(loadedCaseSearchResults) => <CaseSearchResults questionnaireName={questionnaireName} cases={loadedCaseSearchResults} />}
      </AsyncContent>
    </div>
  );
}
