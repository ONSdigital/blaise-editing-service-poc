import express, { Request, Response } from 'express';
import { Controller } from '../interfaces/controllerInterface';
import notFound from '../helpers/axiosHelper';
import BlaiseApi from '../api/BlaiseApi';
import { SupervisorInformation } from '../../common/interfaces/supervisorInterface';
import mapSupervisorInformaiton from '../mappers/supervisorInformationMapper';

export default class SupervisorController implements Controller {
  blaiseApi: BlaiseApi;

  constructor(blaiseApi: BlaiseApi) {
    this.blaiseApi = blaiseApi;
    this.getSupervisorInformation = this.getSupervisorInformation.bind(this);
  }

  getRoutes() {
    const router = express.Router();
    return router.get('/api/:questionnaireName/supervisor/edit', this.getSupervisorInformation);
  }

  async getSupervisorInformation(request: Request<{ questionnaireName:string }>, response: Response<SupervisorInformation>) {
    const { questionnaireName } = request.params;
    try {
      const caseEditInformationList = await this.blaiseApi.getCaseEditInformation(questionnaireName);
      const supervisorInformation = mapSupervisorInformaiton(caseEditInformationList);
      return response.status(200).json(supervisorInformation);
    } catch (error: unknown) {
      if (notFound(error)) {
        return response.status(404).json();
      }
      return response.status(500).json();
    }
  }
}
