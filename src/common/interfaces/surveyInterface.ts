import { CaseDetails } from "./caseInterface"

export interface Survey {
  name: string,
  questionnaires: QuestionnaireDetails[],
}

//TODO: maybe not use this and use QuestionnaireDetails
 export interface QuestionnaireCaseDetails {
  questionnaireName: string,
  numberOfCases: number,
  numberOfCasesAllocated: number
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

