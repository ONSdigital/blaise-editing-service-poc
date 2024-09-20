import { ONSButton, ONSPanel, ONSSelect } from 'blaise-design-system-react-components';
import { ReactElement, SetStateAction, useState } from 'react';
import Option from '../../Interfaces/controlsInterface';
import { AllocationDetails } from '../../../common/interfaces/allocationInterface';
import { updateAllocationDetails } from '../../api/NodeApi';

interface AllocateProps {
  questionnaireName: string;
  allocation: AllocationDetails;
  setErrored: (errored: boolean) => void;
  setSuccess: (success: boolean) => void;
  setRefresh: (refresh: number) => void;
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

export default function AllocateCases({
  questionnaireName, allocation, setErrored, setSuccess, setRefresh,
} : AllocateProps): ReactElement {
  const interviewerOptions = getInterviewerOptions(allocation);
  const editorOptions = getEditorOptions(allocation);
  const [casesValue, setCasesValue] = useState(['']);
  const [nameValue, setNameValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleInterviewerChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    const interviewer = allocation.Interviewers.find((i) => i.Name === e.target.value);
    setCasesValue(interviewer?.Cases ?? []);
  };

  const handleEditorChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNameValue(e.target?.value);
  };

  async function allocateCases(name: string, cases: string[]) {
    setSuccess(false);
    setErrored(false);
    setSubmitting(true);

    try {
      await updateAllocationDetails(questionnaireName, name, cases);
      setSuccess(true);
      setRefresh(1);
    } catch (error: unknown) {
      setErrored(true);
    }

    setSubmitting(false);
  }

  if (interviewerOptions.length === 0 || editorOptions.length === 0) {
    return (
      <ONSPanel status="info">
        {
              interviewerOptions.length === 0
                ? 'There are no cases left to allocate'
                : 'There are no editors configured'
            }
      </ONSPanel>
    );
  }

  return (
    <>
      <ONSSelect
        id="select-interviewer"
        label="Allocate cases from interviewer"
        options={interviewerOptions}
        value=""
        onChange={handleInterviewerChange}
      />
      <ONSSelect
        id="select-editor"
        label="To editor"
        options={editorOptions}
        value=""
        onChange={handleEditorChange}
      />
      <br />
      <ONSButton
        label="Allocate"
        primary
        loading={submitting}
        onClick={async () => { await allocateCases(nameValue, casesValue); }}
      />
    </>
  );
}
