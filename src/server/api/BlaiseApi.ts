import BlaiseClient, { CaseEditInformation, Questionnaire, User } from 'blaise-api-node-client';
import { ServerConfiguration } from '../interfaces/serverConfigurationInterface';
import { QuestionnaireDetails } from '../../common/interfaces/surveyInterface';
import mapQuestionnaireDetails from '../mappers/questionnaireMapper';
import { CaseSummaryDetails } from '../../common/interfaces/caseInterface';
import mapCaseSummary from '../mappers/caseMapper';

export default class BlaiseApi {
  config: ServerConfiguration;

  blaiseApiClient: BlaiseClient;

  constructor(config: ServerConfiguration, blaiseApiClient: BlaiseClient) {
    this.config = config;
    this.blaiseApiClient = blaiseApiClient;
    this.getQuestionnaires = this.getQuestionnaires.bind(this);
    this.getCaseSummary = this.getCaseSummary.bind(this);
    this.getCaseEditInformation = this.getCaseEditInformation.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  async getQuestionnaires(): Promise<QuestionnaireDetails[]> {
    const questionnaires = await this.blaiseApiClient.getQuestionnaires(this.config.ServerPark);

    const questionnaireDetailsList: QuestionnaireDetails[] = [];
    questionnaires.forEach((questionnaire : Questionnaire) => {
      questionnaireDetailsList.push(mapQuestionnaireDetails(questionnaire));
    });

    return questionnaireDetailsList;
  }

  async getCaseSummary(questionnaireName: string, caseId: string): Promise<CaseSummaryDetails> {
    const caseResponse = await this.blaiseApiClient.getCase(this.config.ServerPark, questionnaireName, caseId);

    return mapCaseSummary(caseResponse);
  }

  async getCaseEditInformation(questionnaireName: string): Promise<CaseEditInformation[]> {
    const caseEditInformationList = await this.blaiseApiClient.getCaseEditInformation(this.config.ServerPark, questionnaireName);

    caseEditInformationList.forEach((caseEditInformation) => {
      caseEditInformation.editUrl = `https://${this.config.ExternalWebUrl}/${questionnaireName}?Mode=CAWI&KeyValue=${caseEditInformation.primaryKey}`;
    });

    return caseEditInformationList;
  }

  async getUsers(): Promise<User[]> {
    return this.blaiseApiClient.getUsers();
  }
}
