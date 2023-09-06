import './App.css';
import { ReactElement } from 'react';
import AppContent from './components/AppContent';
import AuthenticationApi from './clients/AuthenticationApi';
import NodeApi from './clients/NodeApi';
import Authentication from './pages/Authentication';

interface AppProps {
  authenticationApi:AuthenticationApi;
  nodeApi: NodeApi;
}

function App({ authenticationApi, nodeApi }:AppProps): ReactElement {
  return (
    <Authentication authenticationApi={authenticationApi}>
      {(user) => (<AppContent user={user} nodeApi={nodeApi} />)}
    </Authentication>
  );
}

export default App;
