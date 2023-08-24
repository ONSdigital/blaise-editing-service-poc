import { AuthConfig } from 'blaise-login-react-server';
import { loadRoles, sessionSecret } from './configurationHelper';

export default class AuthConfigurationProvider implements AuthConfig {
  SessionSecret: string;

  SessionTimeout: string;

  Roles: string[];

  BlaiseApiUrl: string;

  constructor() {
    const {
      SESSION_SECRET,
      SESSION_TIMEOUT,
      ROLES,
      BLAISE_API_URL,
    } = process.env;

    if (SESSION_TIMEOUT === undefined || SESSION_TIMEOUT === '_SESSION_TIMEOUT') {
      this.SessionTimeout = '12h';
    } else {
      this.SessionTimeout = SESSION_TIMEOUT;
    }

    if (BLAISE_API_URL === undefined) {
      this.BlaiseApiUrl = 'ENV_VAR_NOT_SET';
    } else {
      this.BlaiseApiUrl = BLAISE_API_URL;
    }

    this.SessionSecret = sessionSecret(SESSION_SECRET);
    this.Roles = loadRoles(ROLES);
  }
}
