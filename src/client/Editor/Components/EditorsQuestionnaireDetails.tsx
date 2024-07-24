import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ONSPanel, ONSTable } from 'blaise-design-system-react-components';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';

interface EditorsQuestionnairesDetailsProps {
  questionnaire: QuestionnaireDetails;
}

export default function EditorsQuestionnairesDetails({ questionnaire }: EditorsQuestionnairesDetailsProps): ReactElement {
  return (
    <>
      <dl
        className="ons-metadata ons-metadata__list ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
        title="Questionnares"
        data-testid="QuestionnaireList"
        style={{ padding: '0 0 15px 5px' }}
      >
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Field period:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>{questionnaire.fieldPeriod}</strong></dd>
      </dl>
      <ONSPanel status="info">
        <ONSTable
          columns={[
            'Case ID',
            '',
            '',
          ]}
        >
          <>
            <tr
              className="ons-table__row"
              data-testid="questionnaire-table-row"
            >
              <td className="ons-table__cell">
                10001011
              </td>
              <td className="ons-table__cell status">
                In Progress
              </td>
              <td className="ons-table__cell links">
                <Link className="Edit" to="/">Summary</Link>
                {' | '}
                <Link className="Edit" to="/">Edit</Link>
              </td>
            </tr>

            <tr
              className="ons-table__row"
              data-testid="questionnaire-table-row2"
            >
              <td className="ons-table__cell">
                10001012
              </td>
              <td className="ons-table__cell status">
                Complete
              </td>
              <td className="ons-table__cell links">
                <Link className="Edit" to="/">Summary</Link>
                {' | '}
                <Link className="Edit" to="/">Edit</Link>
              </td>
            </tr>

            <tr
              className="ons-table__row"
              data-testid="questionnaire-table-row3"
            >
              <td className="ons-table__cell">
                10001013
              </td>
              <td className="ons-table__cell status">
                Not Started
              </td>
              <td className="ons-table__cell links">
                <Link className="Edit" to="/">Summary</Link>
                {' | '}
                <Link className="Edit" to="/">Edit</Link>
              </td>
            </tr>
          </>
        </ONSTable>
      </ONSPanel>
    </>
  );
}
