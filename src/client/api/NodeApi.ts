import axios from 'axios';

import { CaseEditInformation } from 'blaise-api-node-client/lib/cjs/interfaces/case';
import notFound from '../../server/helpers/axiosHelper';
import { Survey } from '../../common/interfaces/surveyInterface';

import { SupervisorInformation } from '../../common/interfaces/supervisorInterface';
import { EditorInformation } from '../Interfaces/editorInterface';
import mapEditorInformation from '../Mappers/editorInformaitionMapper';

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

export async function getEditorInformation(questionnaireName: string, editorUsername:string): Promise<EditorInformation> {
  // TODO Fix the URL upper
  const caseEditInformationList = await getDataFromNode<CaseEditInformation[]>(`/api/${questionnaireName.toUpperCase()}/cases/edit`, 'Unable to find case edit information, please contact Richmond Rice');
  const caseEditInformationListForEditor = caseEditInformationList.filter((caseEditInformation) => caseEditInformation.assignedTo === editorUsername);

  return mapEditorInformation(caseEditInformationListForEditor);
}

export async function getSupervisorEditorInformation(questionnaireName: string): Promise<SupervisorInformation> {
  // TODO Fix the URL upper
  return getDataFromNode(`/api/${questionnaireName.toUpperCase()}/supervisor/edit`, 'Unable to find supervisor information, please contact Richmond Rice');
}
