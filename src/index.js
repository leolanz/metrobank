import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

// "start": "set HTTPS=true&&set SSL_CRT_FILE=cert.pem&&set SSL_KEY_FILE=key.pem&& react-scripts start",

ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
