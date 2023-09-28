import { CaseData, Questionnaire } from 'blaise-api-node-client';
import { QuestionnaireDetails } from '../../common/interfaces/surveyInterface';
import stringIsNullOrEmpty from '../../common/helpers/stringHelper';
import { mapCaseDetails } from './caseMapper';

export default function mapQuestionnaireDetails(questionnaire: Questionnaire, caseData: CaseData[]): QuestionnaireDetails {
  const allocatedCases = caseData.filter((cases) => !stringIsNullOrEmpty(cases['allocation.toeditor']));
  const unallocatedCases = caseData.filter((cases) => !allocatedCases.includes(cases));
  const numberOfAllocatedCases = allocatedCases.length;

  const questionaireDetails: QuestionnaireDetails = {
    questionnaireName: questionnaire.name,
    numberOfCases: questionnaire.dataRecordCount ?? 0,
    allocationDetails: {
      numberOfAllocatedCases,
      casesAllocated: mapCaseDetails(allocatedCases),
      casesNotAllocated: mapCaseDetails(unallocatedCases),
    },
  };

  return questionaireDetails;
}
