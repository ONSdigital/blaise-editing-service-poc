import BlaiseClient, { Questionnaire, QuestionnaireReport } from 'blaise-api-node-client';
import { Configuration } from '../interfaces/configurationInterface';
import { QuestionnaireAllocation } from '../../common/interfaces/surveyInterface';
import mapQuestionnaireAllocation from '../mappers/questionnaireMapper';
import { mapCaseDetails, mapCaseFactsheet } from '../mappers/caseMapper';
import { CaseDetails, CaseFactsheetDetails } from '../../common/interfaces/caseInterface';

export default class BlaiseApi {
  config: Configuration;

  blaiseApiClient: BlaiseClient;

  constructor(config: Configuration, blaiseApiClient: BlaiseClient) {
    this.config = config;
    this.blaiseApiClient = blaiseApiClient;
    this.getCaseDetails = this.getCaseDetails.bind(this);
    this.getCaseFactsheet = this.getCaseFactsheet.bind(this);
    this.getQuestionnaires = this.getQuestionnaires.bind(this);
    this.getReportsForQuestionnaires = this.getReportsForQuestionnaires.bind(this);
  }

  async getCaseDetails(questionnaireName: string): Promise<CaseDetails[]> {
    const caseStatusList = await this.blaiseApiClient.getCaseStatus(this.config.ServerPark, questionnaireName);
    const caseDetails = mapCaseDetails(caseStatusList, questionnaireName, this.config.ExternalWebUrl);

    return caseDetails;
  }

  async getCaseFactsheet(questionnaireName: string, caseId: string): Promise<CaseFactsheetDetails> {
    const caseResponse = await this.blaiseApiClient.getCase(this.config.ServerPark, questionnaireName, caseId);
    const casefactsheet = mapCaseFactsheet(caseResponse);

    return casefactsheet;
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
