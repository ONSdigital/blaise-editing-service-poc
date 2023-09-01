import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { User } from 'blaise-api-node-client';
import { AuthManager } from 'blaise-login-react-client';
import Surveys from '../pages/Surveys';
import Cases from '../pages/Cases';
import CaseFactsheet from '../pages/CaseFactsheet';
import LoginManager from '../clients/LoginManager';
import { useAsyncRequestWithParam } from '../hooks/useAsyncRequest';
import AsyncContent from './AsyncContent';
import { getLoggedInUser } from '../clients/serverApi';

interface AppContentProps {
  loginManager:LoginManager;
}

export default function AppContent({ loginManager }: AppContentProps): ReactElement {
  const getUser = useAsyncRequestWithParam<User, AuthManager>(getLoggedInUser, loginManager);

  return (
    <AsyncContent content={getUser}>
      {(user) => (
        <Routes>
          <Route path="/" element={<Surveys userRole={user.role} />} />
          <Route path="questionnaires/:questionnaireName/cases/" element={<Cases />} />
          <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet />} />
        </Routes>
      )}
    </AsyncContent>

  );
}
