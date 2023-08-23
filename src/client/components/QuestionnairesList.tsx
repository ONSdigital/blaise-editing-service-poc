import { Questionnaire } from 'blaise-api-node-client';
import { ONSPanel } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface QuestionnairesListProps {
  questionnaires: Questionnaire[];
}

const tableStyle = {
  margin: '15px',
  width: '700px',
};

const linkStyle = {
  textDecoration: 'none',
  color: 'blue',
};

export default function QuestionnairesList({ questionnaires }: QuestionnairesListProps): ReactElement {
  if (questionnaires.length === 0) {
    return (
      <ONSPanel spacious status="info">There are no questionnaires available</ONSPanel>
    );
  }
  return (
    <table style={tableStyle} id="questionnaire-table">
      <thead>
        <th style={{
          width: '50%', textAlign: 'left', margin: '5px', padding: '5px',
        }}
        >
          <strong>Questionnaire name</strong>
        </th>
        <th style={{
          width: '50%', textAlign: 'left', margin: '5px', padding: '5px',
        }}
        >
          <strong>Case count</strong>
        </th>
      </thead>
      {questionnaires.map((questionnaire) => (
        <tr key={questionnaire.name} data-testid="questionnaire-table-row">
          <td style={{
            width: '50%', textAlign: 'left', margin: '5px', padding: '5px',
          }}
          >
            <Link to={`/questionnaires/${questionnaire.name}/cases`} style={linkStyle}>{questionnaire.name}</Link>
          </td>
          <td style={{
            width: '50%', textAlign: 'left', margin: '5px', padding: '5px',
          }}
          >
            {questionnaire.dataRecordCount}
          </td>
        </tr>
      ))}
    </table>
  );
}
