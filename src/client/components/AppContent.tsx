import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Surveys from '../pages/Surveys';
import Cases from '../pages/Cases';
import CaseFactsheet from '../pages/CaseFactsheet';
import AuthenticationApi from '../clients/AuthenticationApi';
import { useAsyncRequest } from '../hooks/useAsyncRequest';
import AsyncContent from './AsyncContent';
import NodeApi from '../clients/NodeApi';

interface AppContentProps {
  authenticationApi:AuthenticationApi;
  nodeApi: NodeApi;
}

export default function AppContent({ authenticationApi, nodeApi }: AppContentProps): ReactElement {
  const getUserRole = useAsyncRequest<string>(authenticationApi.getRoleOfLoggedInUser);

  return (
    <AsyncContent content={getUserRole}>
      {(userRole) => (
        <Routes>
          <Route path="/" element={<Surveys nodeApi={nodeApi} userRole={userRole} />} />
          <Route path="questionnaires/:questionnaireName/cases/" element={<Cases nodeApi={nodeApi} />} />
          <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet nodeApi={nodeApi} />} />
        </Routes>
      )}
    </AsyncContent>

  );
}
