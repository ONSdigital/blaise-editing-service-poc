import './App.css';
import { Footer, Header } from 'blaise-design-system-react-components';
import { ReactElement, useState } from 'react';
import { AuthManager } from 'blaise-login-react-client';
import AppRoutes from './components/AppRoutes';

const divStyle = {
  minHeight: 'calc(67vh)',
};
const authManager = new AuthManager();

/* eslint-disable react/jsx-no-bind */
function App(): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);

  function signOut(): void {
    authManager.clearToken();
    setLoggedIn(false);
  }

  return (
    <>
      <Header
        title="Blaise Editing Service"
        noSave
        signOutButton
        signOutFunction={signOut}
        navigationLinks={[
          {
            endpoint: '/',
            id: 'home',
            label: 'Home',
          },
        ]}
      />
      <div style={divStyle} className="ons-page__container ons-container">
        <AppRoutes authManager={authManager} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </div>
      <Footer />
    </>
  );
}

export default App;
