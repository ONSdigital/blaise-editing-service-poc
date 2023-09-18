import { Questionnaire2, Survey } from '../../common/interfaces/surveyInterface';

export default function mapSurveys(questionnaires: Questionnaire2[]): Survey[] {
  const surveys: Survey[] = [];

  questionnaires.forEach((questionaire) => {
    const surveyName = questionaire.name.slice(0, 3);
    const surveyElement = surveys.find((survey) => survey.name === surveyName);

    if (surveyElement === undefined) {
      surveys.push({
        name: surveyName,
        questionnaires: [questionaire],
      });
    } else {
      surveyElement.questionnaires.push(questionaire);
    }
  });

  return surveys;
}
