import "./App.css";
import React from "react";

import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Landing, Steps } from "./Views";
import theme from "./Theme/theme";

import "./Theme/global.scss";
import "./Theme/reset.scss";
import { RequireProvider } from "./Context";
import Selfie from "./Views/Selfie/selfie";
import SelfiePreview from "./Views/SelfiePreview/SelfiePreview";
import DocId from "./Views/DocId/DocId";
import DocIdPreview from "./Views/DocIdPreview/DocIdPreview";
import Info from "./Views/Info/Info";


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
          <Switch>
            <Route path="/BEN/selfie/take-photo" component={Selfie} />
            <Route exact path="/BEN/selfie/preview" component={SelfiePreview} />
            <Route path="/BEN/docID/take-photo" component={DocId} />
            <Route path="/BEN/docID/preview" component={DocIdPreview} />
            <Route path="/BEN/info" component={Info} />

            <Route path="/BEN/selfie">
              <Landing channel="BEN" />
            </Route>


            {/* <Route path="/BEN/selfie">
              <Steps channel="BEN" />
              <Landing channel="BEN" />
            </Route> */}

            {/* <Route path="/BEN">
              <Landing channel="BEN" />
            </Route>

            <Route path="/selfie">
              <Steps />
            </Route> */}

            <Route exact path="/">
              <Redirect to="/BEN/selfie" />
            </Route>
          </Switch>
        </Router>
        <ToastContainer />
      </RequireProvider>
    </ThemeProvider>
  );
}

export default App;
