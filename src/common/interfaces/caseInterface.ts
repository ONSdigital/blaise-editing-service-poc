export interface CaseSummaryDetails {
  CaseId: string
  OutcomeCode: number,
  InterviewDate: Date,
  InterviewerName: string,
  InterviewerNumber: string,
  NumberOfRespondents: number,
  Household: {
    Address: {
      AddressLine1: string,
      AddressLine2: string,
      AddressLine3: string,
      AddressLine4: string,
      County: string,
      Town: string,
      Postcode: string,
    },
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
