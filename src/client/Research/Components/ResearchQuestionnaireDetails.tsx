import { ReactElement } from 'react';
import { QuestionnaireDetails } from '../../../common/interfaces/surveyInterface';

interface ResearchQuestionnairesDetailsProps {
  questionnaire: QuestionnaireDetails;
}

export default function ResearchQuestionnairesDetails({ questionnaire }: ResearchQuestionnairesDetailsProps): ReactElement {
  return (

    <div className="questionnaire" data-testid="questionnaire">
      <strong>{questionnaire.questionnaireName}</strong>
    </div>
  );
}
