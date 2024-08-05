import express, { Request, Response } from 'express';
import { Controller } from '../interfaces/controllerInterface';
import notFound from '../helpers/axiosHelper';
import BlaiseApi from '../api/BlaiseApi';
import { EditingDetails } from 'blaise-api-node-client';

export default class SurveyController implements Controller {
  blaiseApi: BlaiseApi;

  constructor(blaiseApi: BlaiseApi) {
    this.blaiseApi = blaiseApi;
    this.getEditingDetails = this.getEditingDetails.bind(this);
  }

  getRoutes() {
    const router = express.Router();
    return router.get('/api/edit/:questionnaireName/editingDetails', this.getEditingDetails);
  }

  async getEditingDetails(request: Request<{ questionnaireName:string }>, response: Response<EditingDetails[]>) {
    const { questionnaireName } = request.params;
    try {
      const editingDetailsList = await this.blaiseApi.getEditingDetails(questionnaireName);

      return response.status(200).json(editingDetailsList);
    } catch (error: unknown) {
      if (notFound(error)) {
        return response.status(404).json();
      }
      return response.status(500).json();
    }
  }
}
