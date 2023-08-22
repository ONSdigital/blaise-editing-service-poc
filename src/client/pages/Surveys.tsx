import AsyncContent from '../components/AsyncContent';
import { useAsyncRequest } from '../hooks/useAsyncRequest';
import { getSurveys } from '../api/blaiseApi';
import { Survey } from '../../common/interfaces/surveyInterface';
import SurveysList from '../components/SurveysList';

export default function Surveys() {
  const surveys = useAsyncRequest<Survey []>(getSurveys);

  return (
    <AsyncContent content={surveys}>
      {(loadedSurveys) => <SurveysList surveys={loadedSurveys} />}
    </AsyncContent>
  );
}
