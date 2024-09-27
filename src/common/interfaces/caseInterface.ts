export interface CaseSummaryDetails {
  CaseId: string
  OutcomeCode: number,
  InterviewDate: Date,
  District: string,
  InterviewerName: string,
  NumberOfRespondents: number,
  Household: {
    Type: string,
    FloorNumber: number,
    Status: string,
    NumberOfBedrooms: number,
    ReceiptOfHousingBenefit: number,
    PeriodCode: number,
    CouncilTaxBand: string,
    BusinessRoom: boolean,
    SelfEmployed: boolean,
    SelfEmployedMembers: string,
    IncomeSupport: boolean,
    IncomeSupportMembers: string,
    IncomeBasesJaSupport: boolean,
    IncomeBasesJaSupportMembers: string,

  },
  Respondents: {
    RespondentName: string,
    DateOfBirth: Date,
  }[]
}
