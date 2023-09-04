import axios from 'axios';
import { CaseDetails, CaseFactsheetDetails } from '../../common/interfaces/caseInterface';
import notFound from '../../common/helpers/axiosHelper';
import { Survey } from '../../common/interfaces/surveyInterface';

/* eslint-disable class-methods-use-this */
export default class NodeApi {
  constructor() {
    this.getSurveys = this.getSurveys.bind(this);
    this.getCases = this.getCases.bind(this);
    this.getCaseFactsheet = this.getCaseFactsheet.bind(this);
  }

  async getDataFromNode<T>(url: string, notFoundError: string): Promise<T> {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      if (notFound(error)) {
        throw new Error(notFoundError);
      }
      throw new Error('Unable to complete request, please try again in a few minutes');
    }
  }

  async getSurveys(): Promise<Survey[]> {
    return this.getDataFromNode('/api/surveys', 'Unable to find surveys, please contact Richmond Rice');
  }

  async getCases(questionnaireName: string): Promise<CaseDetails[]> {
    return this.getDataFromNode(`/api/questionnaires/${questionnaireName}/cases`, 'The questionnaire is no longer available');
  }

  async getCaseFactsheet(questionnaireName: string, caseId: string): Promise<CaseFactsheetDetails> {
    return this.getDataFromNode(`/api/questionnaires/${questionnaireName}/cases/${caseId}/factsheet`, 'The questionnaire is no longer available');
  }
}
