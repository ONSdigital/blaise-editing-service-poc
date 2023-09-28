import { CaseDetails } from './caseInterface';

export interface Survey {
  name: string,
  questionnaires: QuestionnaireDetails[],
}

export interface QuestionnaireDetails {
  questionnaireName: string,
  numberOfCases: number,
  allocationDetails: AllocationDetails
}

export interface AllocationDetails {
  numberOfAllocatedCases: number
  casesAllocated: CaseDetails[]
  casesNotAllocated: CaseDetails[]
}
