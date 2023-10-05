import {
  ONSButton, ONSPanel, ONSSelect, ONSTextInput,
} from 'blaise-design-system-react-components';
import { ReactElement } from 'react';
import { User } from 'blaise-api-node-client';
import { caseEditorsMockObject } from '../../test/mockObjects/userMockObject';

function mapEditorsToOptionList(editors:User[]) {
  return editors.map((editor) => ({
    label: editor.name,
    value: editor.name,
  }));
}

interface AllocateCasesProps {
  questionnaireName: string;
}

export default function AllocateCases({ questionnaireName }: AllocateCasesProps): ReactElement {
  return (

    <>
      <ONSPanel spacious status="info" testID="info-panel">
        Allocate cases for
        {' '}
        {questionnaireName}
      </ONSPanel>

      <ONSSelect
        value="Select the editor"
        id="select-editor"
        label="Select editor"
        options={mapEditorsToOptionList(caseEditorsMockObject)}

      />

      <ONSTextInput
        id="select-number"
        label="Select number of cases to allocate"
        placeholder="50"
      />

      <ONSButton
        label="Allocate"
        primary
      />
    </>
  );
}
