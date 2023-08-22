import { Questionnaire } from 'blaise-api-node-client';
import { Survey } from '../../common/interfaces/surveyInterface';

export default function mapSurveys(questionnaires: Questionnaire[]): Survey[] {
  let surveys: Survey[] = []; 
  let surveyIndex = 0;

  questionnaires.forEach((questionaire) => {
      let surveyName = questionaire.name.slice(0, 3);
      let existingIndex = surveys.findIndex(s => s.name === surveyName);
      if(existingIndex === -1) {
        surveys[surveyIndex] = {
          name: surveyName,
          questionnaires: [questionaire]
        };

        surveyIndex++;
      }
      else {
        surveys[existingIndex]?.questionnaires.push(questionaire);
      }
  });

  return surveys;
}
