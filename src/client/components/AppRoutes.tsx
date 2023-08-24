import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthManager } from 'blaise-login-react-client';
import Surveys from '../pages/Surveys';
import Cases from '../pages/Cases';
import CaseFactsheet from '../pages/CaseFactsheet';
import Login from '../pages/Login';

interface RoutesProps {
  authManager: AuthManager;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AppRoutes({ authManager, loggedIn, setLoggedIn }: RoutesProps): ReactElement {
  if (loggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Surveys />} />
        <Route path="questionnaires/:questionnaireName/cases/" element={<Cases />} />
        <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet />} />
      </Routes>
    );
  }

  return <Login authManager={authManager} setLoggedIn={setLoggedIn} />;
}
