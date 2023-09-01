import { AuthManager } from 'blaise-login-react-client';
import { getLoggedInUser } from './serverApi';

export default class LoginManager extends AuthManager {
  isLoggedIn: boolean = false;

  async CheckIfUserIsLoggedIn() {
    super.loggedIn().then((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logOut(setLoggedIn:(loggedIn: boolean) => void) {
    console.debug('logOut');
    super.clearToken();
    setLoggedIn(false);
  }

  async getRoleOfCurrentUser(): Promise<string> {
    const user = await getLoggedInUser(this);

    return user.role;
  }
}
