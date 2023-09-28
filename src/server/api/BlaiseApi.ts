import BlaiseClient, { CaseData, Questionnaire, QuestionnaireReport } from 'blaise-api-node-client';
import { Configuration } from '../interfaces/configurationInterface';
import mapQuestionnaireDetails from '../mappers/questionnaireMapper';
import { mapCaseDetails, mapCaseFactsheet } from '../mappers/caseMapper';
import { CaseDetails, CaseFactsheetDetails } from '../../common/interfaces/caseInterface';
import { QuestionnaireDetails } from '../../common/interfaces/surveyInterface';

export default class BlaiseApi {
  config: Configuration;

  blaiseApiClient: BlaiseClient;

  constructor(config: Configuration, blaiseApiClient: BlaiseClient) {
    this.config = config;
    this.blaiseApiClient = blaiseApiClient;
    this.getCaseDetails = this.getCaseDetails.bind(this);
    this.getQuestionnaireDetails = this.getQuestionnaireDetails.bind(this);
    this.getCaseFactsheet = this.getCaseFactsheet.bind(this);
    this.getQuestionnaires = this.getQuestionnaires.bind(this);
    this.getCaseData = this.getCaseData.bind(this);
    this.getCaseFieldsForQuestionnaire = this.getCaseFieldsForQuestionnaire.bind(this);
    this.getQuestionnaireDetailsList = this.getQuestionnaireDetailsList.bind(this);
  }

  async getCaseDetails(questionnaireName: string, username?: string): Promise<CaseDetails[]> {
    const caseData = await this.getCaseData(questionnaireName, username);

    return mapCaseDetails(caseData);
  }

  async getCaseFactsheet(questionnaireName: string, caseId: string): Promise<CaseFactsheetDetails> {
    const caseResponse = await this.blaiseApiClient.getCase(this.config.ServerPark, questionnaireName, caseId);
    const casefactsheet = mapCaseFactsheet(caseResponse);

    return casefactsheet;
  }

  async getQuestionnaires(username?: string): Promise<QuestionnaireDetails[]> {
    const questionnaires = await this.blaiseApiClient.getQuestionnaires(this.config.ServerPark);

    return this.getQuestionnaireDetailsList(questionnaires, username);
  }

  private async getCaseFieldsForQuestionnaire(questionnaireName: string, fieldIds: string[]): Promise<QuestionnaireReport> {
    return this.blaiseApiClient.getQuestionnaireReportData(this.config.ServerPark, questionnaireName, fieldIds);
  }

  private async getCaseData(questionnaireName: string, username?: string): Promise<CaseData[]> {
    const fieldIds: string[] = ['qserial.serial_number', 'qhadmin.hout', 'allocation.toeditor'];
    const questionnaireReportData = await this.getCaseFieldsForQuestionnaire(questionnaireName, fieldIds);
    const reportData = questionnaireReportData.reportingData;

    return !username
      ? reportData
      : reportData.filter((caseData) => caseData['allocation.toeditor'] === username);
  }

  private async getQuestionnaireDetails(questionnaire: Questionnaire, username?: string): Promise<QuestionnaireDetails> {
    const caseData = await this.getCaseData(questionnaire.name, username);

    return mapQuestionnaireDetails(questionnaire, caseData);
  }

  private async getQuestionnaireDetailsList(questionnaires: Questionnaire[], username?: string): Promise<QuestionnaireDetails[]> {
    const reports: Promise<QuestionnaireDetails>[] = [];

    questionnaires.forEach((questionnaire) => {
      reports.push(this.getQuestionnaireDetails(questionnaire, username));
    });

    return Promise.all(reports);
  }
}
