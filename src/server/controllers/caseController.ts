import express, { Request, Response } from 'express';
import { CaseEditInformation } from 'blaise-api-node-client';
import { Controller } from '../interfaces/controllerInterface';
import notFound from '../helpers/axiosHelper';
import BlaiseApi from '../api/BlaiseApi';

export default class CaseController implements Controller {
  blaiseApi: BlaiseApi;

  constructor(blaiseApi: BlaiseApi) {
    this.blaiseApi = blaiseApi;
    this.getCaseEditInformation = this.getCaseEditInformation.bind(this);
  }

  getRoutes() {
    const router = express.Router();
    return router.get('/api/:questionnaireName/cases/edit', this.getCaseEditInformation);
  }

  async getCaseEditInformation(request: Request<{ questionnaireName:string }>, response: Response<CaseEditInformation[]>) {
    const { questionnaireName } = request.params;

    try {
      const caseEditInformationList = await this.blaiseApi.getCaseEditInformation(questionnaireName);

      return response.status(200).json(caseEditInformationList);
    } catch (error: unknown) {
      if (notFound(error)) {
        return response.status(404).json();
      }
      return response.status(500).json();
    }
  }
}
