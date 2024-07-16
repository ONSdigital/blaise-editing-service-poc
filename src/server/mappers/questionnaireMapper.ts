import { Questionnaire } from 'blaise-api-node-client';
import { QuestionnaireDetails } from '../../common/interfaces/surveyInterface';

export default function mapQuestionnaireDetails(questionnaire: Questionnaire): QuestionnaireDetails {
  const questionaireDetails: QuestionnaireDetails = {
    questionnaireName: questionnaire.name,
    numberOfCases: questionnaire.dataRecordCount ?? 0,
  };

  return questionaireDetails;
}
