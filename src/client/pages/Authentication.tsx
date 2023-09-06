import React, { ReactElement, useState } from 'react';
import { User } from 'blaise-api-node-client';
import AuthenticationApi from '../clients/AuthenticationApi';
import Login from '../components/Login';
import LayoutTemplate from '../components/LayoutTemplate';
import AuthenticationContent from '../components/AuthenticationContent';

interface AuthenticationProps {
  children: (user: User) => React.ReactNode;
}

export default function Authentication({ children }:AuthenticationProps): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);
  const authenticationApi = new AuthenticationApi();

  return (
    <LayoutTemplate showSignOutButton={loggedIn} signOut={() => authenticationApi.logOut(setLoggedIn)}>
      {
          loggedIn
            ? <AuthenticationContent authenticationApi={authenticationApi}>{children}</AuthenticationContent>
            : <Login authenticationApi={authenticationApi} setLoggedIn={setLoggedIn} />
      }
    </LayoutTemplate>
  );
}
