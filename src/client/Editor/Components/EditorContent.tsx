import { ONSPanel, ONSSelect, ONSTable } from 'blaise-design-system-react-components';
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { EditorInformation } from '../../Interfaces/editorInterface';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';
//

interface EditorsContentProps {
  editorInformation: EditorInformation;
  questionnaire: QuestionnaireDetails
}

/* async function exportSummary(questionnaireName: string, case_id: string) {
  const caseSummary = await getCaseSummary2(questionnaireName, case_id);

  const fileData = JSON.stringify(caseSummary);
  const blob = new Blob([fileData], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `case-summary-${case_id}.txt`;
  link.href = url;
  link.click();
} */

export default function EditorContent({ editorInformation, questionnaire }: EditorsContentProps): ReactElement {
  const [status, setStatus] = useState('');

  return (
    <div className="editorContent" data-testid={`${questionnaire.questionnaireName}-editorContent`}>
      <ONSPanel status="info">
        <dl
          className="ons-metadata ons-metadata__list ons-grid ons-grid--gutterless ons-u-cf ons-u-mb-no"
          title="editorContent"
          data-testid="editorContent-dl"
          style={{ padding: '0 0 15px 5px' }}
        >
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Field period:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>{questionnaire.fieldPeriod}</strong></dd>
          <dt className="ons-description-list__term ons-grid__col ons-col-5@m">Cases assigned to me:</dt>
          <dd className="ons-description-list__value ons-grid__col ons-col-7@m"><strong>{editorInformation.numberOfCasesAllocated}</strong></dd>

        </dl>
      </ONSPanel>
      <ONSSelect
        defaultValue="in-progress"
        id="filter-cases"
        label="Filter cases"
        onChange={(e) => setStatus(e.target.value)}
        options={[
          {
            label: 'All',
            value: '',
          },
          {
            label: 'In progress',
            value: 'In progress',
          },
          {
            label: 'Queried',
            value: 'Queried',
          },
          {
            label: 'Completed',
            value: 'Completed',
          },
          {
            label: 'Not started',
            value: 'Not started',
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
        tableID={`${questionnaire.questionnaireName}-Case-table`}
      >
        <>
          {editorInformation.Cases.filter((c) => (status.length > 0 ? c.EditStatus === status : c)).map((caseDetails) => (
            <tr
              className="ons-table__row"
              key={caseDetails.CaseId}
            >
              <td className="ons-table__cell" aria-label={`${questionnaire.questionnaireName}-CaseID`}>
                {caseDetails.CaseId}
              </td>
              <td className="ons-table__cell status" aria-label={`${questionnaire.questionnaireName}-EditStatus`}>
                {caseDetails.EditStatus}
              </td>
              <td className="ons-table__cell links">
                {/*                 <span className="link" onClick={() => { exportSummary(questionnaire.questionnaireName, caseDetails.CaseId); }} onKeyDown={() => { exportSummary(questionnaire.questionnaireName, caseDetails.CaseId); }} role="presentation">Download</span>
                {' | '} */}
                <Link to={`/questionnaires/${questionnaire.questionnaireName}/cases/${caseDetails.CaseId}/summary`}>Summary</Link>
                {' | '}
                <Link to={caseDetails.EditUrl} target="_blank" rel="noopener noreferrer">Edit</Link>
              </td>
            </tr>
          ))}
        </>
      </ONSTable>

    </div>
  );
}
