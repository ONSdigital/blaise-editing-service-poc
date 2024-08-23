import { CaseOutcome } from 'blaise-api-node-client';

export interface RoleSurveyFilter {
  Role: string;
  Surveys: SurveyCaseFilter[]
}

export interface SurveyCaseFilter {
  Survey: string
  Organisations: string[];
  Outcomes: CaseOutcome[]
}
