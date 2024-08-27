import { CaseOutcome } from 'blaise-api-node-client';
import ServerConfigurationProvider from '../../../server/configuration/ServerConfigurationProvider';
import { RoleConfiguration } from '../../../server/interfaces/roleConfigurationInterface';

export default class FakeServerConfigurationProvider implements ServerConfigurationProvider {
  BlaiseApiUrl: string;

  BuildFolder: string;

  Port: number;

  ServerPark: string;

  ExternalWebUrl: string;

  SessionSecret: string;

  SessionTimeout: string;

  Roles: string[];

  Surveys: string[];

  DefaultSessionTimeout: string = '12h';

  DefaultRoles: string[] = ['SVT_Supervisor', 'SVT_Editor'];

  RoleConfiguration: RoleConfiguration[];

  constructor(
    blaiseApiUrl?: string,
    buildFolder?: string,
    port?: number,
    serverPark?: string,
    externalWebUrl?: string,
    sessionSecret?: string,
    sessionTimeout?: string,
    roles?: string[],
    surveys?: string[],
    roleConfiguration?: RoleConfiguration[],
  ) {
    this.BlaiseApiUrl = blaiseApiUrl ?? 'restapi.blaise.com';
    this.BuildFolder = buildFolder ?? 'dist';
    this.Port = port ?? 5000;
    this.ServerPark = serverPark ?? 'gusty';
    this.ExternalWebUrl = externalWebUrl ?? 'cati.blaise.com';
    this.SessionSecret = sessionSecret ?? 'richlikesricecakes';
    this.SessionTimeout = sessionTimeout ?? this.DefaultSessionTimeout;
    this.Roles = roles ?? this.DefaultRoles;
    this.Surveys = surveys ?? ['FRS'];
    this.RoleConfiguration = roleConfiguration ?? [{
      Role: 'SVT_Supervisor',
      Surveys: [{
        Survey: 'LMS',
        Organisations: ['ONS'],
        Outcomes: [CaseOutcome.Completed, CaseOutcome.CompletedNudge],
      }],
    },
    {
      Role: 'SVT_Editor',
      Surveys: [{
        Survey: 'TEST',
        Organisations: ['ONS'],
        Outcomes: [],
      },
      {
        Survey: 'FRS',
        Organisations: ['ONS'],
        Outcomes: [CaseOutcome.Completed, CaseOutcome.CompletedNudge],
      }],
    },
    {
      Role: 'SVT_AllOutcomes',
      Surveys: [{
        Survey: 'FRS',
        Organisations: ['ONS'],
        Outcomes: [],
      }],
    }];
  }
}
