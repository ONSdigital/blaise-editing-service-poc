import { AuthManager } from 'blaise-login-react-client';

export default class LoginManager extends AuthManager {
  isLoggedIn: boolean = false;

  logOut(setLoggedIn:(loggedIn: boolean) => void) {
    console.debug('logOut');
    super.clearToken();
    setLoggedIn(false);
  }
}
