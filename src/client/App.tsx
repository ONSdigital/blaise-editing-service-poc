import './App.css';
import { ReactElement, useEffect, useState } from 'react';
import AppContent from './components/AppContent';
import LayoutTemplate from './components/LayoutTemplate';
import Login from './components/Login';
import LoginManager from './clients/LoginManager';
import Loading from './pages/LoadingPage';

const loginManager = new LoginManager();

function App(): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loginManager.loggedIn().then((isLoggedIn: boolean) => {
      setLoggedIn(isLoggedIn);
      setLoaded(true);
    });
  }, [setLoggedIn]);

  if (!loaded) return <Loading showSignOutButton={loggedIn} signOut={() => loginManager.logOut(setLoggedIn)} />;

  return (
    <LayoutTemplate showSignOutButton={loggedIn} signOut={() => loginManager.logOut(setLoggedIn)}>
      {loggedIn
        ? <AppContent loginManager={loginManager} />
        : <Login loginManager={loginManager} setLoggedIn={setLoggedIn} />}
    </LayoutTemplate>
  );
}

export default App;
