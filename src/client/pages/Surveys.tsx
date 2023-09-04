import { ONSPanel } from 'blaise-design-system-react-components';
import AsyncContent from '../components/AsyncContent';
import { useAsyncRequest } from '../hooks/useAsyncRequest';
import { Survey } from '../../common/interfaces/surveyInterface';
import SurveysList from '../components/SurveysList';
import NodeApi from '../clients/NodeApi';

interface SurveyProps {
  nodeApi: NodeApi;
  userRole: string;
}

export default function Surveys({ userRole, nodeApi }: SurveyProps) {
  const infoPanelMessage = `Bonjour tout le monde ${userRole}`;
  const surveys = useAsyncRequest<Survey []>(nodeApi.getSurveys);

  return (
    <>
      <ONSPanel status="info">
        {infoPanelMessage}
      </ONSPanel>
      <div data-testid="Surveys">
        <AsyncContent content={surveys}>
          {(loadedSurveys) => <SurveysList surveys={loadedSurveys} />}
        </AsyncContent>
      </div>
    </>
  );
}
