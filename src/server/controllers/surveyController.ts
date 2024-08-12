import express, { Request, Response } from 'express';
import { Controller } from '../interfaces/controllerInterface';
import notFound from '../helpers/axiosHelper';
import { QuestionnaireDetails, Survey } from '../../common/interfaces/surveyInterface';
import mapSurveys from '../mappers/surveyMapper';
import BlaiseApi from '../api/BlaiseApi';
import { SurveyConfiguration } from '../interfaces/surveyConfigurationInterface';

export default class SurveyController implements Controller {
  blaiseApi: BlaiseApi;
  configuration: SurveyConfiguration;

  constructor(blaiseApi: BlaiseApi, surveyConfiguration: SurveyConfiguration) {
    this.blaiseApi = blaiseApi;
    this.configuration = surveyConfiguration;
    this.getSurveys = this.getSurveys.bind(this);
  }

  getRoutes() {
    const router = express.Router();
    return router.get('/api/surveys', this.getSurveys);
  }

  async getSurveys(_request: Request, response: Response<Survey[]>) {
    try {
      const questionnaires = await this.GetSupportedQuestionnaires();
      const surveys = mapSurveys(questionnaires ?? []);

      return response.status(200).json(surveys);
    } catch (error: unknown) {
      if (notFound(error)) {
        return response.status(404).json();
      }
      return response.status(500).json();
    }
  }

  async GetSupportedQuestionnaires(): Promise<QuestionnaireDetails[]> {
    const questionnaires = await this.blaiseApi.getQuestionnaires();
    return questionnaires.filter(q => this.configuration.Surveys.includes(q.surveyTla));
  }
}