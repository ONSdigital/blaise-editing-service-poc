import axios from 'axios';

import { CaseEditInformation } from 'blaise-api-node-client/lib/cjs/interfaces/case';
import { User } from 'blaise-api-node-client/lib/cjs/interfaces/user';
import notFound from '../../server/helpers/axiosHelper';
import { Survey } from '../../common/interfaces/surveyInterface';
import { SupervisorInformation } from '../Interfaces/supervisorInterface';
import { EditorInformation } from '../Interfaces/editorInterface';
import mapEditorInformation from '../Mappers/editorInformaitionMapper';
import mapSupervisorInformation from '../Mappers/supervisorInformationMapper';
import UserRole from '../Common/enums/UserRole';

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

async function getCaseEditInformation(questionnaireName: string) {
  return getDataFromNode<CaseEditInformation[]>(`/api/questionnaire/${questionnaireName.toUpperCase()}/cases/edit`, 'Unable to find case edit information, please contact Richmond Rice');
}

export async function getEditorInformation(questionnaireName: string, editorUsername:string): Promise<EditorInformation> {
  // TODO Fix the URL upper
  const caseEditInformationList = await getCaseEditInformation(questionnaireName);
  const caseEditInformationListForEditor = caseEditInformationList.filter((caseEditInformation) => caseEditInformation.assignedTo === editorUsername);

  return mapEditorInformation(caseEditInformationListForEditor);
}

export async function getSupervisorEditorInformation(questionnaireName: string, userRole: UserRole): Promise<SupervisorInformation> {
  // TODO Fix the URL upper
  const caseEditInformationList = await getCaseEditInformation(questionnaireName);
  const editorInformation = await getDataFromNode<User[]>(`/api/users?userRole=${userRole}`, 'Unable to find user information, please contact Richmond Rice');

  return mapSupervisorInformation(caseEditInformationList, editorInformation);
}
