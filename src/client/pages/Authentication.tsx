import React, { ReactElement, useState } from 'react';
import { User } from 'blaise-api-node-client';
import AuthenticationApi from '../clients/AuthenticationApi';
import Login from '../components/Login';
import LayoutTemplate from '../components/LayoutTemplate';
import { useAsyncRequestWithTwoParams } from '../hooks/useAsyncRequest';
import AsyncContent from '../components/AsyncContent';
import AuthenticationContent from '../components/AuthenticationContent';

interface AuthenticationProps {
  authenticationApi: AuthenticationApi;
  children: (user: User) => React.ReactNode;
}

async function loginUserIfAuthenticated(authenticationApi: AuthenticationApi, setLoggedIn: (loggedIn: boolean) => void) {
  authenticationApi.loggedIn().then((loggedIn) => { setLoggedIn(loggedIn); });
}

export default function Authentication({ authenticationApi, children }:AuthenticationProps): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);
  const logInUser = useAsyncRequestWithTwoParams<void, AuthenticationApi, (loggedIn: boolean) => void>(loginUserIfAuthenticated, authenticationApi, setLoggedIn);

  return (
    <LayoutTemplate showSignOutButton={loggedIn} signOut={() => authenticationApi.logOut(setLoggedIn)}>
      <AsyncContent content={logInUser}>
        {() => (
          loggedIn
            ? <AuthenticationContent authenticationApi={authenticationApi}>{children}</AuthenticationContent>
            : <Login authenticationApi={authenticationApi} setLoggedIn={setLoggedIn} />
        )}
      </AsyncContent>
    </LayoutTemplate>
  );
}
