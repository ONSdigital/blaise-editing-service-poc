import { ONSButton, ONSPanel, ONSSelect } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

export type AllocateParams = {
  questionnaireName: string
};

export default function AllocateCases(): ReactElement {
  const { questionnaireName } = useParams<keyof AllocateParams>() as AllocateParams;
  return (
    <>
      <ONSPanel status="info">
        Allocate cases from an interviewer to an editor. All cases conducted by that interviewer will be allocated to the editor
      </ONSPanel>
      <br />
      <h3>{questionnaireName}</h3>
      <ONSSelect
        defaultValue="Doctor Doom"
        id="select-editor"
        label="Select editor"
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
      <ONSSelect
        defaultValue="Interviewer1"
        id="select-interviewer"
        label="Select interviewer"
        options={[
          {
            label: 'Interviewer 1 (10 cases)',
            value: 'interviewer1',
          },
          {
            label: 'Interviewer 2 (20 cases)',
            value: 'interviewer2',
          },
          {
            label: 'Interviewer 3 (20 cases)',
            value: 'interviewer3',
          },
          {
            label: 'Interviewer 4 (5 cases)',
            value: 'interviewer4',
          },
          {
            label: 'Interviewer 5 (20 cases)',
            value: 'interviewer5',
          },
        ]}
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
