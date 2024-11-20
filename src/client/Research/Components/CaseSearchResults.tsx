import { ReactElement } from 'react';
import { CaseEditInformation } from 'blaise-api-node-client';
import { ONSTable } from 'blaise-design-system-react-components';
import { Link } from 'react-router-dom';

interface CaseSearchResultsProps {
  questionnaireName:string
  cases: CaseEditInformation[]
}

export default function CaseSearchResults({ questionnaireName, cases }: CaseSearchResultsProps): ReactElement {
  return (
    <div>
      <ONSTable
        columns={[
          'Case ID',
          '',
        ]}
        tableID={`${questionnaireName}-Case-results`}
      >
        <>
          {cases.map((caseDetails) => (
            <tr
              className="ons-table__row"
              key={caseDetails.primaryKey}
            >
              <td className="ons-table__cell" aria-label={`${questionnaireName}-CaseID`}>
                {caseDetails.primaryKey}
              </td>

              <td className="ons-table__cell links">
                <Link to="/">Read only</Link>
                {' | '}
                <Link to="/">Edit</Link>
              </td>
            </tr>
          ))}
        </>
      </ONSTable>
    </div>
  );
}
