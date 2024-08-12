import express, { Request, Response } from 'express';
import { Controller } from '../interfaces/controllerInterface';
import notFound from '../helpers/axiosHelper';
import BlaiseApi from '../api/BlaiseApi';
import mapEditorInformaiton from '../mappers/editorInformaitionMapper';
import { EditorInformation } from '../../common/interfaces/editorInterface';

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

  async getCaseEditInformation(request: Request<{ questionnaireName:string }, {}, {}, { username:string }>, response: Response<EditorInformation>) {
    const { questionnaireName } = request.params;
    const { username } = request.query;
    try {
      const caseEditInformationList = await this.blaiseApi.getCaseEditInformation(questionnaireName);
      const filteredCaseEditInformationList = caseEditInformationList.filter((caseEditInformation) => caseEditInformation.assignedTo === username);
      const ediorInformaiton = mapEditorInformaiton(filteredCaseEditInformationList);
      return response.status(200).json(ediorInformaiton);
    } catch (error: unknown) {
      if (notFound(error)) {
        return response.status(404).json();
      }
      return response.status(500).json();
    }
  }
}
