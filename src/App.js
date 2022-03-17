import './App.css';
import React from 'react';

import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Landing, Steps } from './Views';
import theme from './Theme/theme';

import './Theme/global.scss';
import './Theme/reset.scss';
import { RequireProvider } from './Context';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ThemeProvider theme={theme}>
      <RequireProvider>
        <ToastContainer
          limit={1}
          position="top-right"
          // autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          arrastrable
          pauseOnHover
        />
        <Router>
          {/*
              A <Switch> looks through all its children <Route>
              elements and renders the first one whose path
              matches the current URL. Use a <Switch> any time
              you have multiple routes, but you want only one
              of them to render at a time
            */}
          <Switch>
            <Route path="/BEN/selfie">
              <Steps channel="BEN" />
            </Route>
            <Route path="/BEN">
              <Landing channel="BEN" />
            </Route>

            <Route path="/selfie">
              <Steps />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </Router>
        <ToastContainer />
      </RequireProvider>
    </ThemeProvider>
  );
}

export default App;
