import { Questionnaire } from 'blaise-api-node-client';
import { Survey } from '../../common/interfaces/surveyInterface';

export default function mapSurveys(questionnaires: Questionnaire[]): Survey[] {
  console.debug(questionnaires);
  return [];
}
