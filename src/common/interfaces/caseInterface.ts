export interface CaseSummaryDetails {
  CaseId: string
  OutcomeCode: string,
  InterviewDate: Date,
  District: string,
  InterviewerName: string,
  NumberOfRespondents: string,
  Household: {
    Accommodation: {
      Main: string,
      Type: string,
    }
    FloorNumber: string,
    Status: string,
    NumberOfBedrooms: string,
    ReceiptOfHousingBenefit: string,
    PeriodCode: string,
    CouncilTaxBand: string,
    BusinessRoom: boolean,
    SelfEmployed: boolean,
    SelfEmployedMembers: string[],
    IncomeSupport: boolean,
    IncomeSupportMembers: string[],
    IncomeBasedJaSupport: boolean,
    IncomeBasedJaSupportMembers: string[],

  },
  Respondents: {
    RespondentName: string,
    DateOfBirth: Date,
  }[]
}
