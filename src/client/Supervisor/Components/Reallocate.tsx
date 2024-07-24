import { ONSButton, ONSPanel, ONSSelect } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';

export default function ReallocateCases(): ReactElement {
  return (
    <>
      <ONSPanel status="info">
        Re-allocate cases from one editor to another editor. All non-completed cases will be transfered
      </ONSPanel>
      <br />
      <ONSSelect
        defaultValue="Doctor Doom"
        id="select-editor"
        label="Select editor (from)"
        options={[
          {
            label: 'Doctor Doom (40 cases)',
            value: 'ddoom',
          },
          {
            label: 'Captain Fantastic (20 cases)',
            value: 'cfantastic',
          },
          {
            label: 'The Thing (0 cases)',
            value: 'tthing',
          },
        ]}
        value=""
      />

      <ONSSelect
        defaultValue="cfantastic"
        id="select-editor"
        label="Select editor (to)"
        options={[
          {
            label: 'Doctor Doom',
            value: 'ddoom',
          },
          {
            label: 'Captain Fantastic',
            value: 'cfantastic',
          },
          {
            label: 'The Thing',
            value: 'tthing',
          },
        ]}
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
