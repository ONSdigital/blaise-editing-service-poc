import { ONSPanel, ONSTable } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';

export default function CaseSummary(): ReactElement {
  return (
    <>
      <ONSPanel status="info">
        Summery of case 10001011
      </ONSPanel>
      <ONSTable
        columns={[
          'Field',
          'Value',
        ]}
      >
        <>
          <tr
            className="ons-table__row"
            data-testid="questionnaire-table-row"
          >
            <td className="ons-table__cell">
              Outcome
            </td>
            <td className="ons-table__cell status">
              110
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
          </tr>
        </>
      </ONSTable>
    </>
  );
}
