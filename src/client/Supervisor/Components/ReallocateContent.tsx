import { ONSButton, ONSSelect } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';
import { AllocationDetails } from '../../Interfaces/allocationInterface';
import Option from '../../Interfaces/controlsInterface';

interface ReallocateProps {
  allocation: AllocationDetails;
}

function getEditorFromOptions(allocation: AllocationDetails) {
  const options: Option[] = [];

  allocation.editors.forEach((editor) => {
    if (editor.Cases.length === 0) {
      return;
    }

    options.push({
      label: `${editor.name} (${editor.Cases.length} case(s))`,
      value: editor.name,
    });
  });

  return options;
}

function getEditorToOptions(allocation: AllocationDetails) {
  const options: Option[] = [];

  allocation.editors.forEach((editor) => {
    options.push({
      label: `${editor.name} (${editor.Cases.length} case(s))`,
      value: editor.name,
    });
  });

  return options;
}

export default function RellocateCases({ allocation } : ReallocateProps): ReactElement {
  return (
    <>
      <ONSSelect
        defaultValue=""
        id="select-editor-from"
        label="Reallocate cases from editor"
        options={getEditorFromOptions(allocation)}
        value=""
      />
      <ONSSelect
        defaultValue=""
        id="select-editor-to"
        label="To editor"
        options={getEditorToOptions(allocation)}
        value=""
      />
      <br />
      <ONSButton
        label="Reallocate"
        primary
      />
    </>
  );
}
