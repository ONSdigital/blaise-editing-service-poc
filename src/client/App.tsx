import './App.css';
import { ReactElement, useEffect, useState } from 'react';
import { AuthManager } from 'blaise-login-react-client';
import AppContent from './components/AppContent';
import LayoutTemplate from './components/LayoutTemplate';
import LoginPage from './pages/Login';
import { getLoggedInUser } from './clients/serverApi';

const authManager = new AuthManager();
console.debug('AuthManager');

function App(): ReactElement {
  console.debug('App');

  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  useEffect(() => {
    console.debug('useEffect App');

    if (loggedIn) {
      console.debug('getLoggedInUser');
      getLoggedInUser(authManager).then((user) => {
        console.debug('setUserRole ', user.role);
        setUserRole(user.role);
      });
    }
  }, [loggedIn]);

  function logOut() {
    console.debug('logOut');
    authManager.clearToken();
    setLoggedIn(false);
  }

  return (
    <LayoutTemplate isLoggedIn={loggedIn} logOut={() => logOut()}>
      {loggedIn
        ? <AppContent userRole={userRole} />
        : <LoginPage authManager={authManager} setLoggedIn={setLoggedIn} />}
    </LayoutTemplate>
  );
}

export default App;
