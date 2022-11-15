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
import PepActivity from "./Views/PepActivity/PepActivity";
import SuccessPage from "./Views/SuccessPage/SuccessPage";



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
            <Route exact path="/BEN/selfie" component={Selfie} />
            <Route exact path="/BEN/selfie/preview" component={SelfiePreview} />
            <Route exact path="/BEN/docID" component={DocId} />
            <Route exact path="/BEN/docID/preview" component={DocIdPreview} />
            <Route path="/BEN/info" component={Info} />
            <Route path="/BEN/activity" component={PepActivity} />
            <Route path="/BEN/success" component={SuccessPage} />




            <Route path="/BEN/selfie">
            <Steps channel="BEN" />
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
