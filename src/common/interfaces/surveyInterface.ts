export interface Survey {
  name: string,
  questionnaires: QuestionnaireDetails[],
}

export interface QuestionnaireDetails {
  questionnaireName: string,
  questionnaireDisplayName: string,
  numberOfCases: number,
  numberOfCasesAllocated: number,
}

export interface AllocationDetails extends QuestionnaireDetails {
  editorAllocationDetails: EditorAllocationDetails[]
}

export interface EditorAllocationDetails {
  editor: string,
  cases: string[]
}
