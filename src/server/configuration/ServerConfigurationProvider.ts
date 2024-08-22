import { AuthConfig } from 'blaise-login-react-server';
import { ServerConfiguration } from '../interfaces/serverConfigurationInterface';
import {
  fixUrl, generateSessionSecret,
  getNumberOrThrowError, getStringOrSetDefault, getStringOrThrowError, GetListOrSetDefault,
} from '../helpers/configurationHelper';
import { SurveyConfiguration } from '../interfaces/surveyConfigurationInterface';


interface RoleSurveyFilter {
  Role: string;
  Surveys: SurveyCaseFilter[]
}

interface SurveyCaseFilter {
  Survey: string
  Organisations: string[];
  Outcomes: string[]
}


export default class ServerConfigurationProvider implements SurveyConfiguration, ServerConfiguration, AuthConfig {
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

  DefaultSurveys: string[] = ['FRS'];

  RoleFilters: RoleSurveyFilter[] = [{
    Role:'SVT_Supervisor',
    Surveys: [{
      Survey: 'FRS',
      Organisations: ['ONS'],
      Outcomes: ["110", "120", "130"]
    }]},
    {
      Role:'SVT_Editor',
      Surveys: [{
        Survey: 'FRS',
        Organisations: ['ONS'],
        Outcomes: ["110", "120", "130"]
      }]
  }]

  constructor() {
    const {
      BLAISE_API_URL,
      PORT,
      SERVER_PARK,
      VM_EXTERNAL_WEB_URL,
      SESSION_SECRET,
      SESSION_TIMEOUT,
      ROLES,
      SURVEYS,
    } = process.env;

    this.BuildFolder = '../../build';

    this.BlaiseApiUrl = fixUrl(getStringOrThrowError(BLAISE_API_URL, 'BLAISE_API_URL'));

    this.Port = getNumberOrThrowError(PORT, 'PORT');

    this.ServerPark = getStringOrThrowError(SERVER_PARK, 'SERVER_PARK');

    this.ExternalWebUrl = getStringOrThrowError(VM_EXTERNAL_WEB_URL, 'VM_EXTERNAL_WEB_URL');

    this.SessionSecret = generateSessionSecret(SESSION_SECRET);

    this.SessionTimeout = getStringOrSetDefault(SESSION_TIMEOUT, this.DefaultSessionTimeout);

    this.Roles = GetListOrSetDefault(ROLES, this.DefaultRoles);

    this.Surveys = GetListOrSetDefault(SURVEYS, this.DefaultSurveys);
  }
}
