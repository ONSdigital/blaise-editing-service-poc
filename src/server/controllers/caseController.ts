import express, { Request, Response } from 'express';
import { CaseEditInformation } from 'blaise-api-node-client';
import { Controller } from '../interfaces/controllerInterface';
import notFound from '../helpers/axiosHelper';
import BlaiseApi from '../api/BlaiseApi';
import ServerConfigurationProvider from '../configuration/ServerConfigurationProvider';
import { CaseSummaryDetails } from '../../common/interfaces/caseInterface';
import mapCaseSummary from '../mappers/caseMapper';

export default class CaseController implements Controller {
  blaiseApi: BlaiseApi;

  configuration: ServerConfigurationProvider;

  constructor(blaiseApi: BlaiseApi, configuration: ServerConfigurationProvider) {
    this.blaiseApi = blaiseApi;
    this.configuration = configuration;
    this.getCaseEditInformation = this.getCaseEditInformation.bind(this);
    this.getCaseSummary = this.getCaseSummary.bind(this);
  }

  getRoutes() {
    const router = express.Router();
    router.get('/api/questionnaires/:questionnaireName/cases/:caseId/summary', this.getCaseSummary);
    router.get('/api/questionnaires/:questionnaireName/cases/edit', this.getCaseEditInformation);

    return router;
  }

  async getCaseSummary(request: Request<{ questionnaireName:string, caseId:string }>, response: Response<CaseSummaryDetails>) {
    const {
      questionnaireName,
      caseId,
    } = request.params;

    try {
      const caseResponse = await this.blaiseApi.getCase(questionnaireName, caseId);
      const caseSummary = mapCaseSummary(caseResponse);

      return response.status(200).json(caseSummary);
    } catch (error: unknown) {
      if (notFound(error)) {
        return response.status(404).json();
      }
      return response.status(500).json();
    }
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
      return response.status(500).json();
    }
  }

  async GetCaseEditInformationForRole(questionnaireName:string, userRole: string): Promise<CaseEditInformation[]> {
    const cases = await this.blaiseApi.getCaseEditInformation(questionnaireName);
    const surveyTla = questionnaireName.substring(0, 3);
    const roleConfig = this.configuration.getSurveyConfigForRole(surveyTla, userRole);

    const filteredcases = cases
      .filter((caseEditInformation) => roleConfig.Organisations.includes(caseEditInformation.organisation))
      .filter((caseEditInformation) => (roleConfig.Outcomes.length > 0 ? roleConfig.Outcomes.includes(caseEditInformation.outcome) : caseEditInformation));

    return filteredcases;
  }
}
