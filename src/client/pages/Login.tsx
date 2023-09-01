import { ONSLoadingPanel, ONSPanel } from 'blaise-design-system-react-components';
import { LoginForm } from 'blaise-login-react-client';
import { ReactElement, useEffect, useState } from 'react';
import LoginManager from '../clients/LoginManager';

interface LoginProps {
  loginManager:LoginManager;
  setLoggedIn: (loggedIn: boolean) => void;
}

export default function LoginPage({ loginManager, setLoggedIn }: LoginProps): ReactElement {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loginManager.loggedIn().then((isLoggedIn: boolean) => {
      setLoggedIn(isLoggedIn);
      setLoaded(true);
    });
  }, [loginManager, setLoggedIn]);

  if (loaded) {
    return (
      <>
        <ONSPanel status="info">Enter your Blaise username and password</ONSPanel>
        <LoginForm authManager={loginManager} setLoggedIn={setLoggedIn} />
      </>
    );
  }

  return <ONSLoadingPanel />;
}
