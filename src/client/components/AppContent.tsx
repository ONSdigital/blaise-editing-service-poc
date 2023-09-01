import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Surveys from '../pages/Surveys';
import Cases from '../pages/Cases';
import CaseFactsheet from '../pages/CaseFactsheet';

interface AppContentProps {
  userRole: string;
}

export default function AppContent({ userRole }: AppContentProps): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Surveys userRole={userRole} />} />
      <Route path="questionnaires/:questionnaireName/cases/" element={<Cases />} />
      <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet />} />
    </Routes>
  );
}
