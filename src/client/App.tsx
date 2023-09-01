import './App.css';
import { ReactElement, useState } from 'react';
import AppRoutes from './components/AppRoutes';
import LoginClient from './clients/Login';
import LayoutTemplate from './components/LayoutTemplate';

function App(): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);
  const loginClient = new LoginClient(loggedIn, setLoggedIn);

  return (
    <LayoutTemplate>
      <AppRoutes loginClient={loginClient} />
    </LayoutTemplate>
  );
}

export default App;
