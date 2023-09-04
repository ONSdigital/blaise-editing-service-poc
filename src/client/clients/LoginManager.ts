import { AuthManager } from 'blaise-login-react-client';
import { getLoggedInUser } from './serverApi';

export default class LoginManager extends AuthManager {
  constructor() {
    super();
    this.getRoleOfLoggedInUser = this.getRoleOfLoggedInUser.bind(this);
  }

  logOut(setLoggedIn:(loggedIn: boolean) => void) {
    super.clearToken();
    setLoggedIn(false);
  }

  async getRoleOfLoggedInUser():Promise<string> {
    const user = await getLoggedInUser(this);
    return user.role;
  }
}
