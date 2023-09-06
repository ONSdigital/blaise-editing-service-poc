import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { User } from 'blaise-api-node-client';
import Surveys from '../pages/Surveys';
import Cases from '../pages/Cases';
import CaseFactsheet from '../pages/CaseFactsheet';
import NodeApi from '../clients/NodeApi';

interface AppContentProps {
  user:User
  nodeApi: NodeApi;
}

export default function AppContent({ user, nodeApi }: AppContentProps): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Surveys nodeApi={nodeApi} user={user} />} />
      <Route path="questionnaires/:questionnaireName/cases/" element={<Cases nodeApi={nodeApi} />} />
      <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet nodeApi={nodeApi} />} />
    </Routes>

  );
}
