import BlaiseClient, {
  CaseResponse, CaseStatus, Questionnaire, QuestionnaireReport,
} from 'blaise-api-node-client';
import { Configuration } from '../interfaces/configurationInterface';
import { QuestionnaireAllocation } from '../../common/interfaces/surveyInterface';
import mapQuestionnaireAllocation from '../mappers/questionnaireMapper';

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

  async getQuestionnaires(): Promise<QuestionnaireAllocation[]> {
    const questionnaires = await this.blaiseApiClient.getQuestionnaires(this.config.ServerPark) as QuestionnaireAllocation[];
    const questionnairesReportData = await this.getReportsForQuestionnaires(questionnaires);

    return mapQuestionnaireAllocation(questionnaires, questionnairesReportData);
  }

  private async getReportsForQuestionnaires(questionnaires: Questionnaire[]): Promise<QuestionnaireReport[]> {
    const allocationFieldIds = ['allocation.toeditor'];
    const reports: Promise<QuestionnaireReport>[] = [];

    questionnaires.forEach((questionnaire) => {
      reports.push(this.blaiseApiClient.getQuestionnaireReportData(this.config.ServerPark, questionnaire.name, allocationFieldIds));
    });

    return Promise.all(reports);
  }
}
