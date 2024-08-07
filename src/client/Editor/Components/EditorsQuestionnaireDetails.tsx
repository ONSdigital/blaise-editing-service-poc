import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ONSPanel, ONSSelect, ONSTable } from 'blaise-design-system-react-components';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';
import { EditorInformationMockObject } from '../../../test/client/MockObjects/CaseMockObject';

interface EditorsQuestionnairesDetailsProps {
  questionnaire: QuestionnaireDetails;
}

export default function EditorsQuestionnairesDetails({ questionnaire }: EditorsQuestionnairesDetailsProps): ReactElement {
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
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>{questionnaire.fieldPeriod}</strong></dd>
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Cases assigned to me:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>{EditorInformationMockObject.numberOfCasesAllocated}</strong></dd>

        </dl>
      </ONSPanel>
      <ONSSelect
        defaultValue="in-progress"
        id="filter-cases"
        label="Filter cases"
        onChange={() => {}}
        options={[
          {
            label: 'In Progress',
            value: 'in-progress',
          },
          {
            label: 'Complete',
            value: 'complete',
          },
          {
            label: 'Not Started',
            value: 'not-started',
          },
        ]}
        value=""
      />

      <ONSTable
        columns={[
          'Case ID',
          'Status',
          '',
        ]}
      >
        <>
          {EditorInformationMockObject.Cases.map((caseDetails) => (
            <tr
              className="ons-table__row"
              data-testid={`questionnaire-table-row-${caseDetails.CaseId}`}
            >
              <td className="ons-table__cell">
                {caseDetails.CaseId}
              </td>
              <td className="ons-table__cell status">
                {caseDetails.EditStatus}
              </td>
              <td className="ons-table__cell links">
                <Link className="Edit" to="/summary">Summary</Link>
                {' | '}
                <Link className="Edit" to="/">Edit</Link>
              </td>
            </tr>
          ))}

        </>
      </ONSTable>

    </div>
  );
}
