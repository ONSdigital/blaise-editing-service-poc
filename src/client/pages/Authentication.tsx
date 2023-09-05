import React, { ReactElement, useState } from 'react';
import LoginManager from '../clients/LoginManager';
import Login from '../components/Login';
import LayoutTemplate from '../components/LayoutTemplate';
import { useAsyncRequestWithTwoParams } from '../hooks/useAsyncRequest';
import AsyncContent from '../components/AsyncContent';

interface AuthenticationProps {
  loginManager: LoginManager;
  children: React.ReactNode;
}

async function loginUserIfAuthenticated(loginManager: LoginManager, setLoggedIn: (loggedIn: boolean) => void) {
  loginManager.loggedIn().then((loggedIn) => { setLoggedIn(loggedIn); });
}

export default function Authentication({ loginManager, children }:AuthenticationProps): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);
  const logInUser = useAsyncRequestWithTwoParams<void, LoginManager, (loggedIn: boolean) => void>(loginUserIfAuthenticated, loginManager, setLoggedIn);

  return (
    <LayoutTemplate showSignOutButton={loggedIn} signOut={() => loginManager.logOut(setLoggedIn)}>
      <AsyncContent content={logInUser}>
        {() => (

          loggedIn
            ? children
            : <Login loginManager={loginManager} setLoggedIn={setLoggedIn} />

        )}
      </AsyncContent>
    </LayoutTemplate>
  );
}
