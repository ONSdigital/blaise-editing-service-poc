import './App.css';
import { ReactElement, useState } from 'react';
import AppContent from './components/AppContent';
import LayoutTemplate from './components/LayoutTemplate';
import Login from './components/Login';
import LoginManager from './clients/LoginManager';
import { useAsyncRequestWithTwoParams } from './hooks/useAsyncRequest';
import AsyncContent from './components/AsyncContent';
import NodeApi from './clients/NodeApi';

async function setLoggedInUser(loginManager: LoginManager, setLoggedIn: (loggedIn: boolean) => void) {
  setLoggedIn(await loginManager.loggedIn());
}

interface AppProps {
  loginManager:LoginManager;
  nodeApi: NodeApi;
}

function App({ loginManager, nodeApi }:AppProps): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);

  const logInUser = useAsyncRequestWithTwoParams<void, LoginManager, (loggedIn: boolean) => void>(setLoggedInUser, loginManager, setLoggedIn);

  return (
    <LayoutTemplate showSignOutButton={loggedIn} signOut={() => loginManager.logOut(setLoggedIn)}>
      <AsyncContent content={logInUser}>
        {() => (
          loggedIn
            ? <AppContent loginManager={loginManager} nodeApi={nodeApi} />
            : <Login loginManager={loginManager} setLoggedIn={setLoggedIn} />
        )}
      </AsyncContent>
    </LayoutTemplate>
  );
}

export default App;
