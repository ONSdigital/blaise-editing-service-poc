import { User } from 'blaise-api-node-client';
import { AuthManager, getCurrentUser } from 'blaise-login-react-client';

export default class AuthenticationApi extends AuthManager {
  constructor() {
    super();
    this.getLoggedInUser = this.getLoggedInUser.bind(this);
  }

  logOut(setLoggedIn:(loggedIn: boolean) => void) {
    super.clearToken();
    setLoggedIn(false);
  }

  async getLoggedInUser():Promise<User> {
    try {
      return await getCurrentUser(this);
    } catch (error) {
      throw new Error('Unable to retrieve logged in user');
    }
  }
}
