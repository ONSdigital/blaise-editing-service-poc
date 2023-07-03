import BlaiseApiClient, { Questionnaire } from 'blaise-api-node-client';
import { Request, Response } from 'express';

export default class QuestionnaireHandler {
  blaiseApiClient: BlaiseApiClient;

  constructor(blaiseApiClient: BlaiseApiClient) {
    this.blaiseApiClient = blaiseApiClient;
    this.getQuestionnaires = this.getQuestionnaires.bind(this);
  }

  async getQuestionnaires(_request: Request, response: Response<Questionnaire[]>) {
    const questionnaires = await this.blaiseApiClient.getQuestionnaires('gusty');
    return response.status(200).json(questionnaires);
  }
}