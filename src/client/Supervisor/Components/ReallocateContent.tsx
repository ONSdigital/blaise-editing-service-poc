import { ONSButton, ONSSelect } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';
import Option from '../../Interfaces/controlsInterface';
import { AllocationDetails } from '../../../common/interfaces/allocationInterface';

interface ReallocateProps {
  allocation: AllocationDetails;
}

function getEditorFromOptions(allocation: AllocationDetails) {
  const options: Option[] = [];

  allocation.Editors.forEach((editor) => {
    if (editor.Cases.length === 0) {
      return;
    }

    options.push({
      label: `${editor.Name} (${editor.Cases.length} case(s))`,
      value: editor.Name,
    });
  });

  return options;
}

function getEditorToOptions(allocation: AllocationDetails) {
  const options: Option[] = [];

  allocation.Editors.forEach((editor) => {
    options.push({
      label: `${editor.Name} (${editor.Cases.length} case(s))`,
      value: editor.Name,
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
