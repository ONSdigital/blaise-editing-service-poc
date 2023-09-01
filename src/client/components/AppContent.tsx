import { ReactElement, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Surveys from '../pages/Surveys';
import Cases from '../pages/Cases';
import CaseFactsheet from '../pages/CaseFactsheet';
import LoginManager from '../clients/LoginManager';

interface AppContentProps {
  loginManager:LoginManager;
}

export default function AppContent({ loginManager }: AppContentProps): ReactElement {
  const [userRole, setUserRole] = useState<string>('');
  useEffect(() => {
    loginManager.getRoleOfCurrentUser().then((role) => {
      setUserRole(role);
    });
  }, [loginManager]);

  return (
    <Routes>
      <Route path="/" element={<Surveys userRole={userRole} />} />
      <Route path="questionnaires/:questionnaireName/cases/" element={<Cases />} />
      <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet />} />
    </Routes>
  );
}
