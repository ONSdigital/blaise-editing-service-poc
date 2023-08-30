import { ONSPanel } from 'blaise-design-system-react-components';
import AsyncContent from '../components/AsyncContent';
import { useAsyncRequest } from '../hooks/useAsyncRequest';
import { getSurveys } from '../clients/serverApi';
import { Survey } from '../../common/interfaces/surveyInterface';
import SurveysList from '../components/SurveysList';

interface SurveyProps {
  userRole: string;
}

export default function Surveys(props: SurveyProps) {
  const { userRole } = props;
  const surveys = useAsyncRequest<Survey []>(getSurveys);

  return (
    <>
      <ONSPanel status="info">
        Bonjour tout le monde
        {userRole}
      </ONSPanel>
      <AsyncContent content={surveys}>
        {(loadedSurveys) => <SurveysList surveys={loadedSurveys} />}
      </AsyncContent>
    </>
  );
}
