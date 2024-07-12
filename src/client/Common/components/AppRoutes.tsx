import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import { User } from 'blaise-api-node-client';
import Allocate from '../../Supervisor/Pages/Allocate';
import Cases from '../../Editor/Pages/Cases';
import CaseFactsheet from '../../Editor/Pages/CaseFactsheet';
import UserRole from '../enums/UserRole';
import CreateRoutes from './CreateRoutes';
import CurrentlyAllocated from '../../Supervisor/Pages/CurrentlyAllocated';
import SupervisorsHome from '../../Supervisor/Pages/SupervisorsHome';
import EditorHome from '../../Editor/Pages/EditorHome';

interface AppContentProps {
  user:User
}

export default function AppContent({ user }: AppContentProps): ReactElement {
  const userRole:UserRole = UserRole[user.role as UserRole];

  return (
    <>
      <CreateRoutes onConditionThat={userRole === UserRole.SVT_Supervisor}>
        <Route path="/" element={<SupervisorsHome user={user} />} />
        <Route path="questionnaires/:questionnaireName/allocation/allocate" element={<Allocate />} />
        <Route path="questionnaires/:questionnaireName/allocation/allocated" element={<CurrentlyAllocated />} />
      </CreateRoutes>

      <CreateRoutes onConditionThat={userRole === UserRole.SVT_Editor}>
        <Route path="/" element={<EditorHome user={user} />} />
        <Route path="questionnaires/:questionnaireName/cases/" element={<Cases user={user} />} />
        <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet />} />
      </CreateRoutes>
    </>
  );
}
