import { ONSButton, ONSSelect } from 'blaise-design-system-react-components';
import { ReactElement, SetStateAction, useState } from 'react';
import Option from '../../Interfaces/controlsInterface';
import { AllocationDetails } from '../../../common/interfaces/allocationInterface';
import { updateAllocationDetails } from '../../api/NodeApi';

interface AllocateProps {
  questionnaireName: string;
  allocation: AllocationDetails;
}

function getInterviewerOptions(allocation: AllocationDetails) {
  const options: Option[] = [];

  allocation.Interviewers.forEach((interviewer) => {
    options.push({
      label: `${interviewer.Name} (${interviewer.Cases.length} case(s))`,
      value: interviewer.Name,
    });
  });

  return options;
}

function getEditorOptions(allocation: AllocationDetails) {
  const options: Option[] = [];

  allocation.Editors.forEach((editor) => {
    options.push({
      label: `${editor.Name} (${editor.Cases.length} case(s))`,
      value: editor.Name,
    });
  });

  return options;
}

async function allocateCases(questionnaireName: string, name: string, cases: string[]) {
  console.log(`Allocte cases for ${questionnaireName} ${name} ${cases}`);
  await updateAllocationDetails(questionnaireName, name, cases);
}

export default function AllocateCases({ questionnaireName, allocation } : AllocateProps): ReactElement {
  const interviewerOptions = getInterviewerOptions(allocation);
  const editorOptions = getEditorOptions(allocation);

  const [casesValue, setICasesValue] = useState(['']);
  const [nameValue, setNameValue] = useState('');

  const handleInterviewerChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    const interviewer = allocation.Interviewers.find((i) => i.Name === e.target.value);
    setICasesValue(interviewer?.Cases ?? []);
  };

  const handleEditorChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNameValue(e.target?.value);
  };

  return (
    <>
      <ONSSelect
        defaultValue=""
        id="select-interviewer"
        label="Allocate cases from interviewer"
        options={interviewerOptions}
        value=""
        onChange={handleInterviewerChange}
      />
      <ONSSelect
        defaultValue=""
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
        onClick={async () => { await allocateCases(questionnaireName, nameValue, casesValue); }}
      />
    </>
  );
}
