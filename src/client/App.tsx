import './App.css';
import { ReactElement } from 'react';
import AppContent from './components/AppContent';
import Authentication from './pages/Authentication';

function App(): ReactElement {
  return (
    <Authentication>
      {(user) => (<AppContent user={user} />)}
    </Authentication>
  );
}

export default App;
