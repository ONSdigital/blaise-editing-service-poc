import express, { Request, Response } from 'express';
import { CaseEditInformation, CaseOutcome } from 'blaise-api-node-client';
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

  async getCaseEditInformation(request: Request<{ questionnaireName:string }, {}, {}, { userRole:string, surveyTla:string }>, response: Response<CaseEditInformation[]>) {
    const { questionnaireName } = request.params;
    const { userRole } = request.query;
    const { surveyTla } = request.query;

    try {
      const caseEditInformationList = await this.GetFilteredCaseEditInformation(questionnaireName, userRole, surveyTla);

      return response.status(200).json(caseEditInformationList);
    } catch (error: unknown) {
      if (notFound(error)) {
        return response.status(404).json();
      }
      return response.status(500).json();
    }
  }

  async GetFilteredCaseEditInformation(questionnaireName:string, userRole: string, surveyTla:string): Promise<CaseEditInformation[]> {
    const CaseEditInformationList = await this.blaiseApi.getCaseEditInformation(questionnaireName);

    const OutcomesFilter: CaseOutcome[] | undefined = this.config.RoleFilters.filter((roleFilter) => roleFilter.Role === userRole)[0]
      ?.Surveys.filter((surveys) => surveys.Survey === surveyTla)[0]?.Outcomes;

    if (!OutcomesFilter) {
      throw new Error(`Role ${userRole} with Survey ${surveyTla} not found in RoleFilters configuration`);
    }

    if (OutcomesFilter.length > 0) {
      return CaseEditInformationList.filter((caseEditInformation) => OutcomesFilter.includes(caseEditInformation.outcome));
    }
    return CaseEditInformationList;
  }
}
