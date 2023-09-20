import BlaiseClient, {
  CaseResponse, CaseStatus, Questionnaire, QuestionnaireReport,
} from 'blaise-api-node-client';
import { Configuration } from '../interfaces/configurationInterface';

export default class BlaiseApi {
  config: Configuration;

  blaiseApiClient: BlaiseClient;

  constructor(config: Configuration, blaiseApiClient: BlaiseClient) {
    this.config = config;
    this.blaiseApiClient = blaiseApiClient;
    this.getCaseStatus = this.getCaseStatus.bind(this);
    this.getCaseStatus = this.getCaseStatus.bind(this);
    this.getQuestionnaires = this.getQuestionnaires.bind(this);
    this.getReportsForQuestionnaires = this.getReportsForQuestionnaires.bind(this);
  }

  async getCaseStatus(questionnaireName: string): Promise<CaseStatus[]> {
    return this.blaiseApiClient.getCaseStatus(this.config.ServerPark, questionnaireName);
  }

  async getCase(questionnaireName: string, caseId: string): Promise<CaseResponse> {
    return this.blaiseApiClient.getCase(this.config.ServerPark, questionnaireName, caseId);
  }

  async getQuestionnaires(): Promise<Questionnaire[]> {
    return this.blaiseApiClient.getQuestionnaires(this.config.ServerPark);
  }

  async getReportsForQuestionnaires(questionnaireNames: string[]): Promise<QuestionnaireReport[]> {
    const allocationFieldIds = ['allocation.toeditor'];
    const results: Promise<QuestionnaireReport>[] = [];

    questionnaireNames.forEach((questionnaireName) => {
      results.push(this.blaiseApiClient.getQuestionnaireReportData(this.config.ServerPark, questionnaireName, allocationFieldIds));
    });

    return Promise.all(results);
  }
}
