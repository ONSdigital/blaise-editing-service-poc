import { ONSButton, ONSSelect } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';
import Option from '../../Interfaces/controlsInterface';
import { AllocationDetails } from '../../../common/interfaces/allocationInterface';

interface AllocateProps {
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
