import { ONSLoadingPanel, ONSPanel } from 'blaise-design-system-react-components';
import { AuthManager, LoginForm } from 'blaise-login-react-client';
import { ReactElement, useEffect, useState } from 'react';

interface LoginProps {
  authManager:AuthManager;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginPage({ authManager, setLoggedIn }: LoginProps): ReactElement {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.debug('useEffect LoginPage');
    authManager.loggedIn().then((isLoggedIn: boolean) => {
      setLoggedIn(isLoggedIn);
      setLoaded(true);
    });
  }, [authManager, setLoggedIn]);

  if (loaded) {
    return (
      <>
        <ONSPanel status="info">Enter your Blaise username and password</ONSPanel>
        <LoginForm authManager={authManager} setLoggedIn={setLoggedIn} />
      </>
    );
  }

  return <ONSLoadingPanel />;
}
