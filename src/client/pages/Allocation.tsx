import { User } from 'blaise-api-node-client';
import { ONSPanel, ONSSelect } from 'blaise-design-system-react-components';
import { useParams } from 'react-router-dom';

const caseEditors:User[] = [{
  name: 'Toby Maguire',
  role: 'Editor',
  serverParks: ['gusty'],
  defaultServerPark: 'gusty',
},
{
  name: 'Richmond Ricecake',
  role: 'Editor',
  serverParks: ['gusty'],
  defaultServerPark: 'gusty',
},
{
  name: 'Sarah Bosslady',
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
        Allocations for
        {questionnaireName}
      </ONSPanel>
      <ONSSelect
        value="Select the editor"
        id="select-editor"
        label="Select editor"
        options={mapEditorsToOptionList(caseEditors)}
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
