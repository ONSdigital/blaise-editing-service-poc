import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import { User } from 'blaise-api-node-client';
import Surveys from '../pages/Surveys';
import Allocate from '../pages/Allocate';
import Cases from '../pages/Cases';
import CaseFactsheet from '../pages/CaseFactsheet';
import AllocatedList from '../pages/CurrentlyAllocated';
import UserRole from '../enums/UserRole';
import ConditionalRoute from './ConditionalRoute';

interface AppContentProps {
  user:User
}

export default function AppContent({ user }: AppContentProps): ReactElement {
  const userRole:UserRole = UserRole[user.role as UserRole];

  return (
    <>
      <ConditionalRoute condition={userRole === UserRole.Manager}>
        <Route path="/" element={<Surveys user={user} />} />
        <Route path="questionnaires/:questionnaireName/allocation/allocate" element={<Allocate />} />
      </ConditionalRoute>
      <ConditionalRoute condition={userRole === UserRole.Editor}>
        <Route path="/" element={<Surveys user={user} />} />
        <Route path="questionnaires/:questionnaireName/cases/" element={<Cases user={user} />} />
        <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet />} />
        <Route path="questionnaires/:questionnaireName/allocation/allocated" element={<AllocatedList />} />
      </ConditionalRoute>
    </>
  );

  // switch (userRole) {
  //   case 'Manager':
  //     return (
  //       <Routes>
  //         <Route path="/" element={<Surveys user={user} />} />
  //         <Route path="questionnaires/:questionnaireName/allocation/allocate" element={<Allocate />} />
  //       </Routes>
  //     );
  //   case 'Editor':
  //     return (
  //       <Routes>
  //         <Route path="/" element={<Surveys user={user} />} />
  //         <Route path="questionnaires/:questionnaireName/cases/" element={<Cases user={user} />} />
  //         <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet />} />
  //         <Route path="questionnaires/:questionnaireName/allocation/allocated" element={<AllocatedList />} />
  //       </Routes>
  //     );
  //   default:
  //     return <div />;
  // }

  // return userRole === 'Manager' ? (
  //   <Routes>
  //     <Route path="/" element={<Surveys user={user} />} />
  //     <Route path="questionnaires/:questionnaireName/allocation/allocate" element={<Allocate />} />
  //   </Routes>
  // )
  //   : (
  //     <Routes>
  //       <Route path="/" element={<Surveys user={user} />} />
  //       <Route path="questionnaires/:questionnaireName/cases/" element={<Cases user={user} />} />
  //       <Route path="questionnaires/:questionnaireName/cases/:caseId/factsheet" element={<CaseFactsheet />} />
  //       <Route path="questionnaires/:questionnaireName/allocation/allocated" element={<AllocatedList />} />
  //     </Routes>
  //   );
}
