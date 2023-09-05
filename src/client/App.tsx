import './App.css';
import { ReactElement } from 'react';
import AppContent from './components/AppContent';
import LoginManager from './clients/LoginManager';
import NodeApi from './clients/NodeApi';
import Authentication from './pages/Authentication';

interface AppProps {
  loginManager:LoginManager;
  nodeApi: NodeApi;
}

function App({ loginManager, nodeApi }:AppProps): ReactElement {
  return (
    <Authentication loginManager={loginManager}>
      <AppContent loginManager={loginManager} nodeApi={nodeApi} />
    </Authentication>
  );
}

export default App;
