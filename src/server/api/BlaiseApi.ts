import BlaiseClient, { EditingDetails, Questionnaire } from 'blaise-api-node-client';
import { ServerConfiguration } from '../interfaces/serverConfigurationInterface';
import { QuestionnaireDetails } from '../../common/interfaces/surveyInterface';
import mapQuestionnaireDetails from '../mappers/questionnaireMapper';

export default class BlaiseApi {
  config: ServerConfiguration;

  blaiseApiClient: BlaiseClient;

  constructor(config: ServerConfiguration, blaiseApiClient: BlaiseClient) {
    this.config = config;
    this.blaiseApiClient = blaiseApiClient;
    this.getQuestionnaires = this.getQuestionnaires.bind(this);
  }

  async getQuestionnaires(): Promise<QuestionnaireDetails[]> {
    const questionnaires = await this.blaiseApiClient.getQuestionnaires(this.config.ServerPark);
    const questionnaireDetailsList: QuestionnaireDetails[] = [];
    questionnaires.forEach((questionnaire : Questionnaire) => {
      questionnaireDetailsList.push(mapQuestionnaireDetails(questionnaire));
    });
    const editQuestionnaireDetailsList = questionnaireDetailsList.filter((questionnaire) => questionnaire.surveyTla === 'FRS');
    return editQuestionnaireDetailsList;
  }

  async getEditingDetails(questionnaire: string): Promise<EditingDetails[]> {
    return this.blaiseApiClient.getEditingDetails(this.config.ServerPark, questionnaire);
  }
}
