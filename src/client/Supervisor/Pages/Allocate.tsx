import { ONSPanel } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import UserRole from '../../Common/enums/UserRole';
import { useAsyncRequestWithThreeParams } from '../../Common/hooks/useAsyncRequest';
import AsyncContent from '../../Common/components/AsyncContent';
import AllocateContent from '../Components/AllocateContent';
import { getAllocationDetails } from '../../api/NodeApi';
import { AllocationDetails } from '../../../common/interfaces/allocationInterface';

interface AllocateProps {
  supervisorRole: UserRole;
  editorRole: UserRole;
}

export type AllocateParams = {
  questionnaireName: string
};

export default function AllocateCases({ supervisorRole, editorRole } : AllocateProps): ReactElement {
  const { questionnaireName } = useParams<keyof AllocateParams>() as AllocateParams;
  const allocationInformation = useAsyncRequestWithThreeParams<AllocationDetails, string, UserRole, UserRole>(getAllocationDetails, questionnaireName, supervisorRole, editorRole);

  return (
    <>
      <ONSPanel status="info">
        Allocate cases from an interviewer to an editor. All cases conducted by that interviewer will be allocated to the editor
      </ONSPanel>
      <br />
      <h3>{questionnaireName}</h3>
      <AsyncContent content={allocationInformation}>
        {(loadedAllocationInformation) => <AllocateContent allocation={loadedAllocationInformation} />}
      </AsyncContent>
    </>
  );
}
