import BlaiseClient, { CaseData, Questionnaire, QuestionnaireReport } from 'blaise-api-node-client';
import { Configuration } from '../interfaces/configurationInterface';
import mapQuestionnaireDetails from '../mappers/questionnaireMapper';
import { mapCaseFactsheet } from '../mappers/caseMapper';
import { CaseFactsheetDetails } from '../../common/interfaces/caseInterface';
import { QuestionnaireDetails } from '../../common/interfaces/surveyInterface';

export default class BlaiseApi {
  config: Configuration;

  blaiseApiClient: BlaiseClient;

  constructor(config: Configuration, blaiseApiClient: BlaiseClient) {
    this.config = config;
    this.blaiseApiClient = blaiseApiClient;
    this.getQuestionnaireDetails = this.getQuestionnaireDetails.bind(this);
    this.getCaseFactsheet = this.getCaseFactsheet.bind(this);
    this.getQuestionnaires = this.getQuestionnaires.bind(this);
    this.getCaseFieldsForQuestionnaire = this.getCaseFieldsForQuestionnaire.bind(this);
    this.getQuestionnaireDetailsList = this.getQuestionnaireDetailsList.bind(this);
  }

  async getCaseFactsheet(questionnaireName: string, caseId: string): Promise<CaseFactsheetDetails> {
    const caseResponse = await this.blaiseApiClient.getCase(this.config.ServerPark, questionnaireName, caseId);
    const casefactsheet = mapCaseFactsheet(caseResponse);

    return casefactsheet;
  }

  async getQuestionnaires(username?: string): Promise<QuestionnaireDetails[]> {
    const questionnaires = await this.blaiseApiClient.getQuestionnaires(this.config.ServerPark);
     
    return await this.getQuestionnaireDetailsList(questionnaires, username); 
  }

  private async getCaseFieldsForQuestionnaire(questionnaireName: string, fieldIds: string[]): Promise<QuestionnaireReport> {
    return this.blaiseApiClient.getQuestionnaireReportData(this.config.ServerPark, questionnaireName, fieldIds);
  }

  private async getQuestionnaireDetails(questionnaire: Questionnaire, username?: string): Promise<QuestionnaireDetails> {
    const fieldIds: string[] = ['qserial.serial_number', 'qhadmin.hout', 'allocation.toeditor'];
    const questionnaireReportData = await this.getCaseFieldsForQuestionnaire(questionnaire.name, fieldIds);
    const reportData = questionnaireReportData.reportingData;

    const caseData: CaseData[]  = !username 
      ? reportData
      : reportData.filter((caseData) => caseData['allocation.toeditor'] === username);
    
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
