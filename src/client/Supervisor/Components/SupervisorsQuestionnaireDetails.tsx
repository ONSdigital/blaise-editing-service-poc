import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ONSPanel, ONSTable } from 'blaise-design-system-react-components';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';
import { SupervisorInformationMockObject } from '../../../test/client/MockObjects/CaseMockObject';

interface SupervisorsQuestionnairesDetailsProps {
  questionnaire: QuestionnaireDetails;
}

export default function SupervisorsQuestionnaireDetails({ questionnaire }: SupervisorsQuestionnairesDetailsProps): ReactElement {
  return (
    <div className="questionnaire">
      <ONSPanel status="info">
        <dl
          className="ons-metadata ons-metadata__list ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
          title="Questionnares"
          data-testid="QuestionnaireList"
          style={{ padding: '0 0 15px 5px' }}
        >
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Field period:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m">{questionnaire.fieldPeriod}</dd>
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Total number of cases:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m">{SupervisorInformationMockObject.TotalNumberOfCases}</dd>
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Number of cases not allocated:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m">{SupervisorInformationMockObject.NumberOfCasesNotAllocated}</dd>
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Number of cases allocated:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m">{SupervisorInformationMockObject.NumberOfCasesAllocated}</dd>
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Number of cases completed:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m">{SupervisorInformationMockObject.NumberOfCasesCompleted}</dd>
        </dl>
      </ONSPanel>

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
          {SupervisorInformationMockObject.Editors.map((editor) => (
            <tr
              className="ons-table__row"
              data-testid="questionnaire-table-row"
            >
              <td className="ons-table__cell">
                <Link to="/">
                  {editor.EditorName}
                  :
                </Link>
              </td>
              <td className="ons-table__cell status">
                {editor.NumberOfCasesAllocated}
              </td>
              <td className="ons-table__cell ">
                {editor.NumberOfCasesCompleted}
              </td>
              <td className="ons-table__cell ">
                {editor.NumberOfCasesQueried}
              </td>
              <td className="ons-table__cell links">
                <Link to="/allocate">Allocate</Link>
                {' | '}
                <Link to="/reallocate">Reallocate</Link>
              </td>
            </tr>
          ))}
        </>
      </ONSTable>
    </div>
  );
}
