import { ONSPanel } from 'blaise-design-system-react-components';
import { LoginForm } from 'blaise-login-react-client';
import { ReactElement } from 'react';
import AuthenticationApi from '../clients/AuthenticationApi';

interface LoginProps {
  authenticationApi:AuthenticationApi;
  setLoggedIn: (loggedIn: boolean) => void;
}

export default function Login({ authenticationApi, setLoggedIn }: LoginProps): ReactElement {
  return (
    <>
      <ONSPanel status="info">Enter your Blaise username and password</ONSPanel>
      <LoginForm authManager={authenticationApi} setLoggedIn={setLoggedIn} />
    </>
  );
}
