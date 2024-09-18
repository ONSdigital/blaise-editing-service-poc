import { ONSPanel } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import UserRole from '../../Common/enums/UserRole';
import { useAsyncRequestWithThreeParams } from '../../Common/hooks/useAsyncRequest';
import { getAllocationDetails } from '../../api/NodeApi';
import { AllocationDetails } from '../../Interfaces/allocationInterface';
import AsyncContent from '../../Common/components/AsyncContent';
import ReallocateContent from '../Components/ReallocateContent';

interface ReallocateProps {
  supervisorRole: UserRole;
  editorRole: UserRole;
}

export type ReallocateParams = {
  questionnaireName: string
};

export default function ReallocateCases({ supervisorRole, editorRole } : ReallocateProps): ReactElement {
  const { questionnaireName } = useParams<keyof ReallocateParams>() as ReallocateParams;
  const allocationInformation = useAsyncRequestWithThreeParams<AllocationDetails, string, UserRole, UserRole>(getAllocationDetails, questionnaireName, supervisorRole, editorRole);

  return (
    <>
      <ONSPanel status="info">
        Re-allocate cases from one editor to another editor. All non-completed cases will be transfered
      </ONSPanel>
      <br />
      <h3>{questionnaireName}</h3>
      <AsyncContent content={allocationInformation}>
        {(loadedAllocationInformation) => <ReallocateContent allocation={loadedAllocationInformation} />}
      </AsyncContent>
    </>
  );
}
