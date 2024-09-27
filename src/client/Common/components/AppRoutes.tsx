import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import { User } from 'blaise-api-node-client';
import UserRole from '../enums/UserTypes';
import CreateRoutes from './CreateRoutes';
import SupervisorsHome from '../../Supervisor/Pages/SupervisorsHome';
import EditorHome from '../../Editor/Pages/EditorHome';
import Allocate from '../../Supervisor/Pages/Allocate';
import CaseSummary from '../../Editor/Pages/CaseSummary';

interface AppContentProps {
  user:User
}

export default function AppContent({ user }: AppContentProps): ReactElement {
  const userRole:UserRole = UserRole[user.role as UserRole];

  return (
    <>
      <CreateRoutes onConditionThat={userRole === UserRole.SVT_Supervisor}>
        <Route path="/" element={<SupervisorsHome user={user} />} />
        <Route path="/questionnaires/:questionnaireName/allocate" element={<Allocate supervisorRole={UserRole.SVT_Supervisor} editorRole={UserRole.SVT_Editor} reallocate={false} />} />
        <Route path="/questionnaires/:questionnaireName/reallocate" element={<Allocate supervisorRole={UserRole.SVT_Supervisor} editorRole={UserRole.SVT_Editor} reallocate />} />
      </CreateRoutes>

      <CreateRoutes onConditionThat={userRole === UserRole.SVT_Editor}>
        <Route path="/" element={<EditorHome user={user} />} />
        <Route path="questionnaires/:questionnaireName/cases/:caseId/summary" element={<CaseSummary />} />
      </CreateRoutes>
    </>
  );
}
