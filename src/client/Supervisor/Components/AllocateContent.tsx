import { ONSButton, ONSSelect } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';
import { AllocationDetails } from '../../Interfaces/allocationInterface';
import Option from '../../Interfaces/controlsInterface';

interface AllocateProps {
  allocation: AllocationDetails;
}

function getInterviewerOptions(allocation: AllocationDetails) {
  const options: Option[] = [];

  allocation.interviewers.forEach((interviewer) => {
    options.push({
      label: `${interviewer.name} (${interviewer.Cases.length} case(s))`,
      value: interviewer.name,
    });
  });

  return options;
}

function getEditorOptions(allocation: AllocationDetails) {
  const options: Option[] = [];

  allocation.editors.forEach((editor) => {
    options.push({
      label: `${editor.name} (${editor.Cases.length} case(s))`,
      value: editor.name,
    });
  });

  return options;
}

export default function AllocateCases({ allocation } : AllocateProps): ReactElement {
  return (
    <>
      <ONSSelect
        defaultValue=""
        id="select-interviewer"
        label="Allocate cases from interviewer"
        options={getInterviewerOptions(allocation)}
        value=""
      />
      <ONSSelect
        defaultValue=""
        id="select-editor"
        label="To editor"
        options={getEditorOptions(allocation)}
        value=""
      />
      <br />
      <ONSButton
        label="Allocate"
        primary
      />
    </>
  );
}
