import { CaseOutcome } from 'blaise-api-node-client';

export interface RoleConfiguration {
  Role: string;
  Surveys: SurveyCaseConfiguration[]
}

export interface SurveyCaseConfiguration {
  Survey: string
  Organisations: string[];
  Outcomes: CaseOutcome[]
}
