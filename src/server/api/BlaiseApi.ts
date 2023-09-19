import BlaiseClient, { CaseResponse, CaseStatus } from 'blaise-api-node-client';
import { Configuration } from '../interfaces/configurationInterface';
import { QuestionnaireAllocation } from '../../common/interfaces/surveyInterface';

export default class BlaiseApi  {
    config: Configuration;

    blaiseApiClient: BlaiseClient;

    constructor(config: Configuration, blaiseApiClient: BlaiseClient) {
        this.config = config;
        this.blaiseApiClient = blaiseApiClient;
        this.getQuestionnairesWithAllocation = this.getQuestionnairesWithAllocation.bind(this);
      }

    async getCaseStatus(questionnaireName: string): Promise<CaseStatus[]> {
        return await this.blaiseApiClient.getCaseStatus(this.config.ServerPark, questionnaireName);
    }

    async getCase(questionnaireName: string, caseId: string): Promise<CaseResponse> {
        return await this.blaiseApiClient.getCase(this.config.ServerPark, questionnaireName, caseId);
    }

    async getQuestionnairesWithAllocation(): Promise<QuestionnaireAllocation[]> {
        let questionnairesWithAllocation:QuestionnaireAllocation[] = [];

        const questionnaires = await this.blaiseApiClient.getQuestionnaires(this.config.ServerPark);

        questionnaires.forEach(async (questionnaire) => {
          let questionaireWithAllocation :QuestionnaireAllocation = questionnaire;
          const reportData = await this.blaiseApiClient.getReportData(this.config.ServerPark, questionnaire.name);

          questionaireWithAllocation.caseAllocation = reportData.reportingData;
          questionnairesWithAllocation.push(questionaireWithAllocation);
        });  
        
        return questionnairesWithAllocation;
    }
}