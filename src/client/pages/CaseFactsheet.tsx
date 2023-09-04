import { useParams } from 'react-router-dom';
import { useAsyncRequestWithTwoParams } from '../hooks/useAsyncRequest';
import { CaseFactsheetDetails } from '../../common/interfaces/caseInterface';
import AsyncContent from '../components/AsyncContent';
import FactsheetContent from '../components/FactsheetContent';
import NodeApi from '../clients/NodeApi';

function DisplayCaseFactsheet(nodeApi: NodeApi, questionnaireName: string, caseId: string) {
  const { getCaseFactsheet } = nodeApi;
  const caseFactsheet = useAsyncRequestWithTwoParams<CaseFactsheetDetails, string, string>(getCaseFactsheet, questionnaireName, caseId);

  return (
    <div data-testid="Factsheet">
      <AsyncContent content={caseFactsheet}>
        {(factsheetContent) => <FactsheetContent factsheet={factsheetContent} />}
      </AsyncContent>
    </div>
  );
}

interface CaseFactSheetProps {
  nodeApi: NodeApi;
}

export default function CaseFactSheet({ nodeApi }:CaseFactSheetProps) {
  const { questionnaireName, caseId } = useParams();
  if (!questionnaireName || !caseId) {
    return (
      <div>
        questionnaire name or caseId not provided
      </div>
    );
  }

  return DisplayCaseFactsheet(nodeApi, questionnaireName, caseId);
}
