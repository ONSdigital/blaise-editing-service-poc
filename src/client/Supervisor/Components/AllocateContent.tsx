import { ONSButton, ONSSelect } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';
import { CasesNotAllocatedInformation } from '../../Interfaces/caseAllocationInterface';

interface AllocateProps {
  allocation: CasesNotAllocatedInformation;
}

function getEditorOptions(allocation: CasesNotAllocatedInformation) {
  const editorOptions = [
    {
      label: 'Select Editor',
      value: '',
    },
  ];

  allocation.editors.forEach((editor) => {
    editorOptions.push({
      label: editor,
      value: editor,
    });
  });

  return editorOptions;
}

function getInterviewerOptions(allocation: CasesNotAllocatedInformation) {
  const interviewerOptions = [
    {
      label: 'Select Interviewer',
      value: '',
    },
  ];

  allocation.interviewers.forEach((interviewer) => {
    interviewerOptions.push({
      label: interviewer.Interviewer,
      value: interviewer.Interviewer,
    });
  });

  return interviewerOptions;
}

export default function AllocateCases({ allocation } : AllocateProps): ReactElement {
  return (
    <>
      <ONSSelect
        defaultValue=""
        id="select-editor"
        label="Select editor"
        options={getEditorOptions(allocation)}
        value=""
      />
      <ONSSelect
        defaultValue=""
        id="select-interviewer"
        label="Select interviewer"
        options={getInterviewerOptions(allocation)}
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
