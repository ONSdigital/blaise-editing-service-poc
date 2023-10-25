import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import { User } from 'blaise-api-node-client';
import Surveys from '../pages/Surveys';
import Allocate from '../pages/Allocate';
import Cases from '../pages/Cases';
import CaseFactsheet from '../pages/CaseFactsheet';
import AllocatedList from '../pages/CurrentlyAllocated';
import UserRole from '../enums/UserRole';
import CreateRoutes from './ConditionalRoute';

interface AppContentProps {
  user:User
}

export default function AppContent({ user }: AppContentProps): ReactElement {
  const userRole:UserRole = UserRole[user.role as UserRole];

  return (
    <>
      <CreateRoutes onConditionThat={userRole === UserRole.Manager}>
        <Route path="/" element={<Surveys user={user} />} />
        <Route path="questionnaires/:questionnaireName/allocation/allocate" element={<Allocate />} />
      </CreateRoutes>

      <CreateRoutes onConditionThat={userRole === UserRole.Editor}>
        <Route path="/" element={<Surveys user={user} />} />
        <Route path="questionnaires/:questionnaireName/cases/" element={<Cases user={user} />} />
        <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet />} />
        <Route path="questionnaires/:questionnaireName/allocation/allocated" element={<AllocatedList />} />
      </CreateRoutes>
    </>
  );
}
