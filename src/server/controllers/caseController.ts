import express, { Request, Response } from 'express';
import { CaseEditInformation } from 'blaise-api-node-client';
import { Controller } from '../interfaces/controllerInterface';
import notFound from '../helpers/axiosHelper';
import BlaiseApi from '../api/BlaiseApi';
import ServerConfigurationProvider from '../configuration/ServerConfigurationProvider';

export default class CaseController implements Controller {
  blaiseApi: BlaiseApi;

  config: ServerConfigurationProvider;

  constructor(blaiseApi: BlaiseApi, config: ServerConfigurationProvider) {
    this.blaiseApi = blaiseApi;
    this.config = config;
    this.getCaseEditInformation = this.getCaseEditInformation.bind(this);
  }

  getRoutes() {
    const router = express.Router();
    return router.get('/api/questionnaire/:questionnaireName/cases/edit', this.getCaseEditInformation);
  }

  async getCaseEditInformation(request: Request<{ questionnaireName:string }, {}, {}, { userRole:string }>, response: Response<CaseEditInformation[]>) {
    const { questionnaireName } = request.params;
    const { userRole } = request.query;

    try {
      const caseEditInformationList = await this.GetCaseEditInformationForRole(questionnaireName, userRole);

      return response.status(200).json(caseEditInformationList);
    } catch (error: unknown) {
      if (notFound(error)) {
        return response.status(404).json();
      }
      console.log('error - ', error);
      return response.status(500).json();
    }
  }

  async GetCaseEditInformationForRole(questionnaireName:string, userRole: string): Promise<CaseEditInformation[]> {
    const surveyTla = questionnaireName.substring(0, 3);
    const surveyConfig = this.GetSurveyConfigForRole(surveyTla, userRole);

    const CaseEditInformationList = await this.blaiseApi.getCaseEditInformation(questionnaireName);
    const outcomesFilter = surveyConfig.Outcomes;

    if (outcomesFilter.length > 0) {
      return CaseEditInformationList.filter((caseEditInformation) => outcomesFilter.includes(caseEditInformation.outcome));
    }
    return CaseEditInformationList;
  }

  GetSurveyConfigForRole(surveyTla: string, userRole: string) {
    const roleConfig = this.config.RoleConfiguration.find(({ Role }) => Role === userRole);

    if (roleConfig === undefined) {
      throw new Error(`Role ${userRole} not found in Role configuration`);
    }

    const surveyConfig = roleConfig.Surveys.find((survey) => survey.Survey === surveyTla);

    if (surveyConfig === undefined) {
      throw new Error(`No '${surveyTla}' survey configuration found for Role ${userRole}`);
    }

    return surveyConfig;
  }
}
