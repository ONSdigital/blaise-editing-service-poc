import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { User } from 'blaise-api-node-client';
import Surveys from '../pages/Surveys';
import Cases from '../pages/Cases';
import CaseFactsheet from '../pages/CaseFactsheet';
import Allocate from '../pages/Allocate';
import AllocatedList from '../pages/CurrentlyAllocated';
import ConditionalRoute from './ConditionalRoute';

interface AppContentProps {
  user:User
}

export default function AppContent({ user }: AppContentProps): ReactElement {
  return (
    <Routes>
      <Route element={<ConditionalRoute condition={user.role === 'Manager'}/>}>
        <Route path="/" element={<Surveys user={user} />} />
        <Route path="questionnaires/:questionnaireName/allocation/allocate" element={<Allocate />} />
      </Route>

      <Route element={<ConditionalRoute condition={user.role === 'Editor'}/>}>
        <Route path="/" element={<Surveys user={user} />} />
        <Route path="questionnaires/:questionnaireName/cases/" element={<Cases user={user} />} />
        <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet />} />
        <Route path="questionnaires/:questionnaireName/allocation/allocated" element={<AllocatedList />} />
      </Route>

    </Routes>
  );
}
