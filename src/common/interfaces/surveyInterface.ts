import { CaseData, Questionnaire } from 'blaise-api-node-client';

export interface Survey {
  name: string,
  questionnaires: Questionnaire2[],
}

export interface Questionnaire2 extends Questionnaire {
  caseAllocation?: CaseData
}
