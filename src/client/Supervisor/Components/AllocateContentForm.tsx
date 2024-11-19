import { ONSButton, ONSPanel, ONSSelect } from 'blaise-design-system-react-components';
import { ReactElement, SetStateAction, useState } from 'react';
import Option from '../../Interfaces/controlsInterface';
import { UserAllocationDetails } from '../../../common/interfaces/allocationInterface';

interface AllocateProps {
  allocationDetails: UserAllocationDetails[];
  fromOptions: Option[];
  toOptions: Option[];
  reallocate: boolean;
  allocateCases: (name: string, cases: string[]) => Promise<void>
}

export default function AllocateCases({
  fromOptions, toOptions, allocationDetails, reallocate, allocateCases,
} : AllocateProps): ReactElement {
  const [casesValue, setCasesValue] = useState(['']);
  const [nameValue, setNameValue] = useState('');
  const [numberOfCasesValue, setNumberOfCasesValue] = useState('-1');
  const [submitting, setSubmitting] = useState(false);

  async function allocateCasesFunction() {
    const numberOfCases = +numberOfCasesValue;

    if (numberOfCases === -1 || casesValue.length <= numberOfCases) {
      await allocateCases(nameValue, casesValue);
      return;
    }

    await allocateCases(nameValue, casesValue.slice(0, numberOfCases));
  }

  const handleCasesChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    const user = allocationDetails.find((i) => i.Name === e.target.value);
    setCasesValue(user?.Cases ?? []);
  };

  const handleNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNameValue(e.target?.value);
  };

  const handleNumberOfCasesChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNumberOfCasesValue(e.target?.value);
  };

  if (fromOptions.length === 0 || toOptions.length === 0) {
    return (
      <ONSPanel status="info">
        {
              toOptions.length === 0
                ? 'There are no editors configured'
                : 'There are no cases left to allocate'
            }
      </ONSPanel>
    );
  }

  return (
    <>
      <ONSSelect
        id="select-from"
        label={`${reallocate ? 'Reallocate' : 'Allocate'} cases from ${reallocate ? 'editor' : 'interviewer'}`}
        options={fromOptions}
        value=""
        onChange={handleCasesChange}
        testId="select-from"
      />
      <ONSSelect
        id="select-to"
        label="To editor"
        options={toOptions}
        value=""
        onChange={handleNameChange}
        testId="select-to"
      />
      <ONSSelect
        id="number-of-cases"
        label="Number of cases"
        options={[{
          label: 'All',
          value: '-1',
        },
        {
          label: '50',
          value: '50',
        },
        {
          label: '45',
          value: '45',
        },
        {
          label: '40',
          value: '40',
        },
        {
          label: '35',
          value: '35',
        },
        {
          label: '30',
          value: '30',
        },
        {
          label: '25',
          value: '25',
        },
        {
          label: '20',
          value: '20',
        },
        {
          label: '15',
          value: '15',
        },
        {
          label: '10',
          value: '10',
        },
        {
          label: '5',
          value: '5',
        },
        {
          label: '1',
          value: '1',
        }]}
        value=""
        defaultValue="-1"
        onChange={handleNumberOfCasesChange}
        testId="number-of-cases"
      />
      <br />
      <ONSButton
        label={`${reallocate ? 'Reallocate' : 'Allocate'}`}
        primary
        loading={submitting}
        onClick={async () => { setSubmitting(true); await allocateCasesFunction(); setSubmitting(false); }}
      />
    </>
  );
}
