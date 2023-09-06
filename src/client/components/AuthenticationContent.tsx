import { User } from 'blaise-api-node-client';
import { ReactElement } from 'react';
import AuthenticationApi from '../clients/AuthenticationApi';
import { useAsyncRequestWithParam } from '../hooks/useAsyncRequest';
import AsyncContent from './AsyncContent';

interface AuthenticationContentProps {
  authenticationApi: AuthenticationApi;
  children: (user: User) => React.ReactNode;
}

async function getLoggedInUser(authenticationApi: AuthenticationApi): Promise<User> {
  return authenticationApi.getLoggedInUser();
}

export default function AuthenticationContent({ authenticationApi, children }:AuthenticationContentProps): ReactElement {
  const getUser = useAsyncRequestWithParam<User, AuthenticationApi>(getLoggedInUser, authenticationApi);
  return (
    <AsyncContent content={getUser}>
      {(user) => (
        children(user)
      )}
    </AsyncContent>
  );
}
