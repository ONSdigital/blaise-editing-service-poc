import './App.css';
import { ReactElement, useState } from 'react';
import AppContent from './components/AppContent';
import LayoutTemplate from './components/LayoutTemplate';
import Login from './components/Login';
import LoginManager from './clients/LoginManager';
import { useAsyncRequestWithParam } from './hooks/useAsyncRequest';
import AsyncContent from './components/AsyncContent';

const loginManager = new LoginManager();

async function setLoggedInUser(setLoggedIn: (loggedIn: boolean) => void) {
  setLoggedIn(await loginManager.loggedIn());
}

function App(): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);

  const getUserLoggedIn = useAsyncRequestWithParam<void, (loggedIn: boolean) => void>(setLoggedInUser, setLoggedIn);

  return (
    <LayoutTemplate showSignOutButton={loggedIn} signOut={() => loginManager.logOut(setLoggedIn)}>
      <AsyncContent content={getUserLoggedIn}>
        {() => (
          loggedIn
            ? <AppContent loginManager={loginManager} />
            : <Login loginManager={loginManager} setLoggedIn={setLoggedIn} />
        )}
      </AsyncContent>
    </LayoutTemplate>
  );
}

export default App;
