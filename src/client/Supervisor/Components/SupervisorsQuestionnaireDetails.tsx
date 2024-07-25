import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ONSPanel, ONSTable } from 'blaise-design-system-react-components';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';

interface SupervisorsQuestionnairesDetailsProps {
  questionnaire: QuestionnaireDetails;
}

export default function SupervisorsQuestionnaireDetails({ questionnaire }: SupervisorsQuestionnairesDetailsProps): ReactElement {
  return (
    <div className="questionnaire">
      <dl
        className="ons-metadata ons-metadata__list ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
        title="Questionnares"
        data-testid="QuestionnaireList"
        style={{ padding: '0 0 15px 5px' }}
      >
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Field period:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>{questionnaire.fieldPeriod}</strong></dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Total number of cases:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>1000</strong></dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Number of cases not allocated:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>970</strong></dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Number of cases allocated:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>25</strong></dd>
        <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Number of cases completed:</dt>
        <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>9</strong></dd>
      </dl>

      <ONSPanel status="info">
        <ONSTable
          columns={[
            'Editor',
            'Allocated',
            'Completed',
            'Queried',
            '',
          ]}
        >
          <>
            <tr
              className="ons-table__row"
              data-testid="questionnaire-table-row"
            >
              <td className="ons-table__cell">
                <Link to="/">Doctor Doom:</Link>
              </td>
              <td className="ons-table__cell status">
                10
              </td>
              <td className="ons-table__cell ">
                5
              </td>
              <td className="ons-table__cell ">
                0
              </td>
              <td className="ons-table__cell links">
                <Link to="/allocate">Allocate</Link>
                {' | '}
                <Link to="/reallocate">Reallocate</Link>
              </td>
            </tr>
            <tr
              className="ons-table__row"
              data-testid="questionnaire-table-row"
            >
              <td className="ons-table__cell">
                <Link to="/">Captain Fantastic:</Link>
              </td>
              <td className="ons-table__cell status">
                5
              </td>
              <td className="ons-table__cell ">
                4
              </td>
              <td className="ons-table__cell ">
                1
              </td>
              <td className="ons-table__cell links">
                <Link to="/allocate">Allocate</Link>
                {' | '}
                <Link to="/reallocate">Reallocate</Link>
              </td>
            </tr>
            <tr
              className="ons-table__row"
              data-testid="questionnaire-table-row"
            >
              <td className="ons-table__cell">
                <Link to="/">The thing:</Link>
              </td>
              <td className="ons-table__cell status">
                0
              </td>
              <td className="ons-table__cell ">
                0
              </td>
              <td className="ons-table__cell ">
                0
              </td>
              <td className="ons-table__cell links">
                <Link to="/allocate">Allocate</Link>
                {' | '}
                <Link to="/reallocate">Reallocate</Link>
              </td>
            </tr>
          </>
        </ONSTable>
      </ONSPanel>
    </div>
  );
}
