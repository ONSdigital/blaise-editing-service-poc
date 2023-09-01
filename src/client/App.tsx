import './App.css';
import { ReactElement, useState } from 'react';
import AppContent from './components/AppContent';
import LayoutTemplate from './components/LayoutTemplate';
import LoginPage from './pages/Login';
import LoginManager from './clients/LoginManager';

const loginManager = new LoginManager();

function App(): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LayoutTemplate isLoggedIn={loggedIn} logOut={() => loginManager.logOut(setLoggedIn)}>
      {loggedIn
        ? <AppContent loginManager={loginManager} />
        : <LoginPage loginManager={loginManager} setLoggedIn={setLoggedIn} />}
    </LayoutTemplate>
  );
}

export default App;
