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
  const [userRole, setUserRole] = useState<string>();

  useEffect(() => {
    console.debug('Enter use effect');

    loginClient.authManager.loggedIn().then((isLoggedIn: boolean) => {
      console.debug('Enter authManager Log in', isLoggedIn);
      loginClient.setLoggedIn(isLoggedIn);
    });

    if (loginClient.loggedIn) {
      console.debug('Enter loginClient.loggedIn');
      loginClient.getRoleOfCurrentUser().then((role) => {
        console.debug('Enter getRole');
        setUserRole(role);
      });
    }
  }, [loginClient]);

  if (loginClient.loggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Surveys userRole={userRole || ''} />} />
        <Route path="questionnaires/:questionnaireName/cases/" element={<Cases />} />
        <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet />} />
      </Routes>
    );
  }

  return loginClient.loginPage();
}
