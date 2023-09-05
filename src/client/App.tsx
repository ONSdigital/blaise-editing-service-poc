import './App.css';
import { ReactElement, useState } from 'react';
import AppContent from './components/AppContent';
import LayoutTemplate from './components/LayoutTemplate';
import Login from './components/Login';
import LoginManager from './clients/LoginManager';
import NodeApi from './clients/NodeApi';

interface AppProps {
  loginManager:LoginManager;
  nodeApi: NodeApi;
}

function App({ loginManager, nodeApi }:AppProps): ReactElement {
  const [loggedIn, setLoggedIn] = useState(loginManager.userLoggedIn);

  return (
    <LayoutTemplate showSignOutButton={loggedIn} signOut={() => loginManager.logOut(setLoggedIn)}>
      {(
          loggedIn
            ? <AppContent loginManager={loginManager} nodeApi={nodeApi} />
            : <Login loginManager={loginManager} setLoggedIn={setLoggedIn} />
        )}
    </LayoutTemplate>
  );
}

export default App;
