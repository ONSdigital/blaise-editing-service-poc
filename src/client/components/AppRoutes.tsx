import { ReactElement, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Surveys from '../pages/Surveys';
import Cases from '../pages/Cases';
import CaseFactsheet from '../pages/CaseFactsheet';
import LoginClient from '../clients/Login';

interface RoutesProps {
  loginClient: LoginClient;
}

export default function AppRoutes({ loginClient }: RoutesProps): ReactElement {
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    if (loginClient.loggedIn) {
      loginClient.getRoleOfCurrentUser().then((role) => {
        setUserRole(role);
      });
    }
  }, [loginClient]);

  if (loginClient.loggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Surveys userRole={userRole} />} />
        <Route path="questionnaires/:questionnaireName/cases/" element={<Cases />} />
        <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet />} />
      </Routes>
    );
  }

  return loginClient.loginPage();
}
