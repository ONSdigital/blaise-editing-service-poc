import { AuthManager, getCurrentUser } from 'blaise-login-react-client';

export default class LoginManager extends AuthManager {
  constructor() {
    super();
    this.getRoleOfLoggedInUser = this.getRoleOfLoggedInUser.bind(this);
  }

  userLoggedIn:boolean = false;

  async LoginUser() {
    this.userLoggedIn = await this.loggedIn();
  }

  logOut(setLoggedIn:(loggedIn: boolean) => void) {
    super.clearToken();
    setLoggedIn(false);
    this.userLoggedIn = false;
  }

  async getRoleOfLoggedInUser():Promise<string> {
    try {
      const user = await getCurrentUser(this);
      return user.role;
    } catch (error) {
      throw new Error('Unable to retrieve logged in user');
    }
  }
}
