import { QuestionnaireAllocation, Survey } from '../../common/interfaces/surveyInterface';

export default function mapSurveys(questionnaires: QuestionnaireAllocation[]): Survey[] {
  const surveys: Survey[] = [];

  questionnaires.forEach((questionnaire) => {
    const surveyName = questionnaire.name.slice(0, 3);
    const surveyElement = surveys.find((survey) => survey.name === surveyName);

    if (surveyElement === undefined) {
      surveys.push({
        name: surveyName,
        questionnaires: [questionnaire],
      });
    } else {
      surveyElement.questionnaires.push(questionnaire);
    }
  });
  return surveys;
}
