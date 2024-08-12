import ServerConfigurationProvider from '../../../server/configuration/ServerConfigurationProvider';

export default class FakeServerConfigurationProvider implements ServerConfigurationProvider {
  BlaiseApiUrl: string;

  BuildFolder: string;

  Port: number;

  ServerPark: string;

  ExternalWebUrl: string;

  SessionSecret: string;

  SessionTimeout: string;

  Roles: string[];

  Surveys: string[]

  DefaultSessionTimeout: string = '12h';

  DefaultRoles: string[] =  ['SVT_Supervisor', 'SVT_Editor'];

  DefaultSurveys: string[] = ['FRS'];    

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
  ) {    
    this.BlaiseApiUrl = blaiseApiUrl ?? 'restapi.blaise.com';
    this.BuildFolder = buildFolder ?? 'dist';
    this.Port = port ?? 5000;
    this.ServerPark = serverPark ?? 'gusty';
    this.ExternalWebUrl = externalWebUrl ?? 'cati.blaise.com';
    this.SessionSecret = sessionSecret ?? 'richlikesricecakes';    
    this.SessionTimeout = sessionTimeout ?? this.DefaultSessionTimeout;
    this.Roles = roles ?? this.DefaultRoles;
    this.Surveys = surveys ?? this.DefaultSurveys
  }
}
