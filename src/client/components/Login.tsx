import { ONSPanel } from 'blaise-design-system-react-components';
import { LoginForm } from 'blaise-login-react-client';
import { ReactElement } from 'react';
import LoginManager from '../clients/LoginManager';

interface LoginProps {
  loginManager:LoginManager;
  setLoggedIn: (loggedIn: boolean) => void;
}

export default function Login({ loginManager, setLoggedIn }: LoginProps): ReactElement {
  return (
    <>
      <ONSPanel status="info">Enter your Blaise username and password</ONSPanel>
      <LoginForm authManager={loginManager} setLoggedIn={setLoggedIn} />
    </>
  );
}
