export interface Survey {
  name: string,
  questionnaires: QuestionnaireDetails[],
}

export interface QuestionnaireDetails {
  questionnaireName: string,
  questionnaireDisplayName: string,
  numberOfCases: number,
  fieldPeriod: string | null,
  surveyTla: string,
}
