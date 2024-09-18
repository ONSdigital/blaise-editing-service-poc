import { ONSButton, ONSSelect } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';
import { AllocationDetails } from '../../Interfaces/allocationInterface';
import Option from '../../Interfaces/controlsInterface';

interface ReallocateProps {
  allocation: AllocationDetails;
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

export default function RellocateCases({ allocation } : ReallocateProps): ReactElement {
  return (
    <>
      <ONSSelect
        defaultValue=""
        id="select-editor-to"
        label="Select editor (to)"
        options={getEditorToOptions(allocation)}
        value=""
      />
      <ONSSelect
        defaultValue=""
        id="select-editor-from"
        label="Select editor (from)"
        options={getEditorFromOptions(allocation)}
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
