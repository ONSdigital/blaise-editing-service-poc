import { ONSButton, ONSPanel, ONSSelect } from 'blaise-design-system-react-components';
import { ReactElement, SetStateAction, useState } from 'react';
import Option from '../../Interfaces/controlsInterface';
import { AllocationDetails } from '../../../common/interfaces/allocationInterface';

interface AllocateProps {
  allocation: AllocationDetails;
  allocateCases: (name: string, cases: string[]) => Promise<void>
}

function getNameOptions(allocation: AllocationDetails): Option[] {
  const options: Option[] = [];

  allocation.Editors.forEach((editor) => {
    options.push({
      label: `${editor.Name} (${editor.Cases.length} case(s))`,
      value: editor.Name,
    });
  });

  return options;
}

function getCasesOptions(allocation: AllocationDetails): Option[] {
  const options: Option[] = [];

  allocation.Editors.forEach((editor) => {
    options.push({
      label: `${editor.Name} (${editor.Cases.length} case(s))`,
      value: editor.Name,
    });
  });

  return options;
}

export default function ReallocateCases({ allocation, allocateCases } : AllocateProps): ReactElement {
  const interviewerOptions = getNameOptions(allocation);
  const editorOptions = getCasesOptions(allocation);

  const [casesValue, setCasesValue] = useState(['']);
  const [nameValue, setNameValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCasesChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    const interviewer = allocation.Interviewers.find((i) => i.Name === e.target.value);
    setCasesValue(interviewer?.Cases ?? []);
  };

  const handleNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNameValue(e.target?.value);
  };

  if (interviewerOptions.length === 0 || editorOptions.length === 0) {
    return (
      <ONSPanel status="info">
        There are no editors configured
      </ONSPanel>
    );
  }

  return (
    <>
      <ONSSelect
        id="select-editor-from"
        label="Reallocate cases from editor"
        options={interviewerOptions}
        value=""
        onChange={handleCasesChange}
      />
      <ONSSelect
        id="select-editor-to"
        label="To editor"
        options={editorOptions}
        value=""
        onChange={handleNameChange}
      />
      <br />
      <ONSButton
        label="Reallocate"
        primary
        loading={submitting}
        onClick={async () => { setSubmitting(true); await allocateCases(nameValue, casesValue); setSubmitting(false); }}
      />
    </>
  );
}
