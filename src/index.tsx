import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './client/App';
import reportWebVitals from './client/reportWebVitals';
import LoginManager from './client/clients/LoginManager';
import NodeApi from './client/clients/NodeApi';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const loginManager = new LoginManager();
await loginManager.LoginUser();
const nodeApi = new NodeApi();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App loginManager={loginManager} nodeApi={nodeApi} />
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
