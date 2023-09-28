import { CaseData, Questionnaire } from 'blaise-api-node-client';
import { QuestionnaireDetails } from '../../common/interfaces/surveyInterface';
import stringIsNullOrEmpty from '../../common/helpers/stringHelper';

export default function mapQuestionnaireDetails(questionnaire: Questionnaire, caseData: CaseData[]): QuestionnaireDetails {
  const numberOfAllocatedCases = caseData.filter(caseData => !stringIsNullOrEmpty(caseData['allocation.toeditor'])).length;
  
  const questionaireDetails: QuestionnaireDetails = {
    questionnaireName: questionnaire.name,
    numberOfCases: questionnaire.dataRecordCount ?? 0,
    allocationDetails : {
      numberOfAllocatedCases: numberOfAllocatedCases,
      casesAllocated : [],
      casesNotAllocated: []
    }
  }

  return questionaireDetails;
}
