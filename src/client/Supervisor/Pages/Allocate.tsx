import { ONSPanel } from 'blaise-design-system-react-components';
import { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserRole from '../../Common/enums/UserRole';
import { useAsyncRequestWithThreeParamsWithRefresh } from '../../Common/hooks/useAsyncRequest';
import AsyncContent from '../../Common/components/AsyncContent';
import AllocateContent from '../Components/AllocateContent';
import { getAllocationDetails } from '../../api/NodeApi';
import { AllocationDetails } from '../../../common/interfaces/allocationInterface';
import ErrorPanel from '../../Common/components/ErrorPanel';
import SuccessPanel from '../../Common/components/SuccessPanel';

interface AllocateProps {
  supervisorRole: UserRole;
  editorRole: UserRole;
}

export type AllocateParams = {
  questionnaireName: string
};

export default function AllocateCases({ supervisorRole, editorRole } : AllocateProps): ReactElement {
  const { questionnaireName } = useParams<keyof AllocateParams>() as AllocateParams;

  const [errored, setErrored] = useState(false);
  const [success, setSuccess] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const allocationInformation = useAsyncRequestWithThreeParamsWithRefresh<AllocationDetails, string, UserRole, UserRole, number>(getAllocationDetails, questionnaireName, supervisorRole, editorRole, refresh);

  return (
    <>
      <ONSPanel status="info">
        Allocate cases from an interviewer to an editor. All cases conducted by that interviewer will be allocated to the editor
      </ONSPanel>

      {errored && <ErrorPanel message="Unable to allocate cases, please try again" /> }
      {success && <SuccessPanel message="Cases have been allocated" /> }

      <br />
      <h3>{questionnaireName}</h3>
      <AsyncContent content={allocationInformation}>
        {(loadedAllocationInformation) => <AllocateContent questionnaireName={questionnaireName} allocation={loadedAllocationInformation} setErrored={setErrored} setSuccess={setSuccess} setRefresh={setRefresh} />}
      </AsyncContent>
      <br />
    </>
  );
}
