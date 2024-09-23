import {
  Dispatch, ReactElement, SetStateAction, useState,
} from 'react';
import { AllocationDetails } from '../../../common/interfaces/allocationInterface';
import { getAllocationDetails, updateAllocationDetails } from '../../api/NodeApi';
import AllocateContentForm from './AllocateContentForm';
import Option from '../../Interfaces/controlsInterface';
import { useAsyncRequestWithThreeParamsWithRefresh } from '../../Common/hooks/useAsyncRequest';
import UserRole from '../../Common/enums/UserRole';
import AsyncContent from '../../Common/components/AsyncContent';
import { Message } from '../../Common/types/MessageType';

interface AllocateProps {
  questionnaireName: string;
  supervisorRole: UserRole;
  editorRole: UserRole;
  reallocate: boolean;
  setMessage: Dispatch<SetStateAction<Message>>;
}

export default function AllocateCases({
  questionnaireName, supervisorRole, editorRole, reallocate, setMessage,
} : AllocateProps): ReactElement {
  let [refresh, setRefresh] = useState(0); /* eslint-disable-line */
  const allocationInformation = useAsyncRequestWithThreeParamsWithRefresh<AllocationDetails, string, UserRole, UserRole, number>(getAllocationDetails, questionnaireName, supervisorRole, editorRole, refresh);

  function refreshContent() {
    setRefresh(refresh += 1);
  }

  function getInterviewerOptions(allocation: AllocationDetails): Option[] {
    const options: Option[] = [];

    allocation.Interviewers.forEach((interviewer) => {
      options.push({
        label: `${interviewer.Name} (${interviewer.Cases.length} case(s))`,
        value: interviewer.Name,
      });
    });

    return options;
  }

  function getEditorOptions(allocation: AllocationDetails): Option[] {
    const options: Option[] = [];
    allocation.Editors.forEach((editor) => {
      options.push({
        label: `${editor.Name} (${editor.Cases.length} case(s))`,
        value: editor.Name,
      });
    });

    return options;
  }

  async function allocateCases(name: string, cases: string[]) {
    setMessage({ show: false, text: '', type: '' });

    try {
      await updateAllocationDetails(questionnaireName, name, cases);
      setMessage({ show: true, text: 'Cases have been allocated', type: 'success' });
      refreshContent();
    } catch (error: unknown) {
      setMessage({ show: true, text: 'Cases could not be allocated', type: 'error' });
    }
  }

  return (
    <AsyncContent content={allocationInformation}>
      {(allocationDetails) => (
        <>
        { !reallocate && <AllocateContentForm allocationDetails={allocationDetails.Interviewers} allocateCases={allocateCases} fromOptions={getInterviewerOptions(allocationDetails)} toOptions={getEditorOptions(allocationDetails) /* eslint-disable-line */} />} 
        { reallocate && <AllocateContentForm allocationDetails={allocationDetails.Editors} allocateCases={allocateCases} fromOptions={getEditorOptions(allocationDetails)} toOptions={getEditorOptions(allocationDetails) /* eslint-disable-line */} />}
        </>
      )}
    </AsyncContent>
  );
}
