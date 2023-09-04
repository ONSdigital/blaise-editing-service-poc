import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Surveys from '../pages/Surveys';
import Cases from '../pages/Cases';
import CaseFactsheet from '../pages/CaseFactsheet';
import LoginManager from '../clients/LoginManager';
import { useAsyncRequest } from '../hooks/useAsyncRequest';
import AsyncContent from './AsyncContent';

interface AppContentProps {
  loginManager:LoginManager;
}

export default function AppContent({ loginManager }: AppContentProps): ReactElement {
  const getUserRole = useAsyncRequest<string>(loginManager.getRoleOfLoggedInUser);

  return (
    <AsyncContent content={getUserRole}>
      {(userRole) => (
        <Routes>
          <Route path="/" element={<Surveys userRole={userRole} />} />
          <Route path="questionnaires/:questionnaireName/cases/" element={<Cases />} />
          <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet />} />
        </Routes>
      )}
    </AsyncContent>

  );
}
