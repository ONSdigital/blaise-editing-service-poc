import { CaseOutcome } from 'blaise-api-node-client';

export interface CaseDetails {
  CaseId: string,
  CaseStatus: CaseOutcome,
  CaseLink: string
}

export interface CaseFactsheet {
  CaseId: string
  OutcomeCode: string,
  InterviewerName: string,
  NumberOfRespondants: string,
  Address: {
    AddressLine1: string,
    AddressLine2: string,
    AddressLine3: string,
    AddressLine4: string,
    County: string,
    Town: string,
    Postcode: string,
  },
  Respondents: {
    RespondentName: string,
    DateOfBirth: string,
  }[]
};
