import { ONSPanel } from 'blaise-design-system-react-components';
import { User } from 'blaise-api-node-client';
import AsyncContent from '../components/AsyncContent';
import { useAsyncRequest } from '../hooks/useAsyncRequest';
import { Survey } from '../../common/interfaces/surveyInterface';
import SurveysList from '../components/SurveysList';
import NodeApi from '../clients/NodeApi';

interface SurveyProps {
  nodeApi: NodeApi;
  user: User;
}

export default function Surveys({ nodeApi, user }: SurveyProps) {
  const infoPanelMessage = `Bonjour tout le monde ${user.name}`;
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
