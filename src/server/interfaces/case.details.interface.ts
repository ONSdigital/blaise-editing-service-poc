import { CaseOutcome } from 'blaise-api-node-client';

export interface CaseDetails {
  CaseId: string,
  CaseStatus: CaseOutcome,
  CaseLink: string
}
