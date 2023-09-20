import { Questionnaire, QuestionnaireReport } from 'blaise-api-node-client';
import { QuestionnaireAllocation, Survey } from '../../common/interfaces/surveyInterface';

export default function mapSurveys(questionnaires: Questionnaire[], reportsForQuestionnaires: QuestionnaireReport[]): Survey[] {
  const surveys: Survey[] = [];

  questionnaires.forEach((questionnaire) => {
    const questionnaireAllocation: QuestionnaireAllocation = questionnaire;
    questionnaireAllocation.caseAllocation = reportsForQuestionnaires.find((r) => r.questionnaireName === questionnaire.name)?.reportingData ?? [];

    const surveyName = questionnaire.name.slice(0, 3);
    const surveyElement = surveys.find((survey) => survey.name === surveyName);

    if (surveyElement === undefined) {
      surveys.push({
        name: surveyName,
        questionnaires: [questionnaireAllocation],
      });
    } else {
      surveyElement.questionnaires.push(questionnaireAllocation);
    }
  });
  return surveys;
}
