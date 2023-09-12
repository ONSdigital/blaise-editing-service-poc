import { User } from 'blaise-api-node-client';
import {
  ONSButton, ONSPanel, ONSSelect, ONSTextInput,
} from 'blaise-design-system-react-components';
import { useParams } from 'react-router-dom';

const caseEditors:User[] = [{
  name: 'Toby Maguire (0 cases)',
  role: 'Editor',
  serverParks: ['gusty'],
  defaultServerPark: 'gusty',
},
{
  name: 'Richmond Ricecake (20 cases)',
  role: 'Editor',
  serverParks: ['gusty'],
  defaultServerPark: 'gusty',
},
{
  name: 'Sarah Bosslady (0 cases)',
  role: 'Editor',
  serverParks: ['gusty'],
  defaultServerPark: 'gusty',
},
];

function mapEditorsToOptionList(editors:User[]) {
  return editors.map((editor) => ({
    label: editor.name,
    value: editor.name,
  }));
}

function displayAllocation(questionnaireName:string) {
  return (
    <div>
      <ONSPanel spacious status="info">
        There are 20 cases left to allocate for
        {' '}
        {questionnaireName}
      </ONSPanel>

      <ONSSelect
        value="Select the editor"
        id="select-editor"
        label="Select editor"
        options={mapEditorsToOptionList(caseEditors)}
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
    </div>
  );
}

export default function Allocation() {
  const { questionnaireName } = useParams();
  if (!questionnaireName) {
    return (
      <div>
        No questionnaire
      </div>
    );
  }

  return displayAllocation(questionnaireName);
}
