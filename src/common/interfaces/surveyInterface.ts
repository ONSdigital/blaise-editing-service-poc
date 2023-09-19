import { CaseData, Questionnaire } from 'blaise-api-node-client';

export interface Survey {
  name: string,
  questionnaires: QuestionnaireAllocation[],
}

export interface QuestionnaireAllocation extends Questionnaire {
  caseAllocation?: CaseData
}
