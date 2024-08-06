import axios from 'axios';
import notFound from '../../../server/helpers/axiosHelper';
import { Survey } from '../../../common/interfaces/surveyInterface';

async function getDataFromNode<T>(url: string, notFoundError: string): Promise<T> {
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

export async function getSurveys(): Promise<Survey[]> {
  return getDataFromNode('/api/surveys', 'Unable to find surveys, please contact Richmond Rice');
}

export async function getCaseEditInformation(questionnaireName: string): Promise<Survey[]> {
  return getDataFromNode(`/api/${questionnaireName}/cases/edit`, 'Unable to find case edit information, please contact Richmond Rice');
}
