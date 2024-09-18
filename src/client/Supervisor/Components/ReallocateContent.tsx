import { ONSButton, ONSSelect } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';
import { AllocationDetails } from '../../Interfaces/allocationInterface';
import Option from '../../Interfaces/controlsInterface';

interface ReallocateProps {
  allocation: AllocationDetails;
}

function getEditorOptions(allocation: AllocationDetails) {
  const options: Option[] = [];

  allocation.editors.forEach((editor) => {
    options.push({
      label: `${editor.name} (${editor.Cases.length} cases)`,
      value: editor.name,
    });
  });

  return options;
}

export default function RellocateCases({ allocation } : ReallocateProps): ReactElement {
  const options = getEditorOptions(allocation);

  return (
    <>
      <ONSSelect
        defaultValue=""
        id="select-editor-to"
        label="Select editor (to)"
        options={options}
        value=""
      />
      <ONSSelect
        defaultValue=""
        id="select-editor-from"
        label="Select editor (from)"
        options={options}
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
