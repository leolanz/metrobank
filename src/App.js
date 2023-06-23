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
import theme from "./Theme/theme";

import "./Theme/global.scss";
import "./Theme/reset.scss";
import { RequireProvider } from "./Context";
/*Nuevas*/
import SuccessPage from "./Views/SuccessPage/SuccessPage";
import Home from "./Views/Home/home";
import Info from "./Views/Info/Info";
/* viejas */

import PepActivity from "./Views/PepActivity/PepActivity";
import OCR from "./Views/OCR/OCR";
/* Experimentales */
import Selfie2 from "./Views/Selfie/Selfie2";
import SelfiePrev from "./Views/SelfiePreview/SelfiePreview2";
import DocId2 from "./Views/DocId/DocId2";
import DocIdPreview2 from "./Views/DocIdPreview/DocIdPreview2";


function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ThemeProvider theme={theme}>
      <RequireProvider>
        <ToastContainer />
        <Router>
          <Switch>
          <Route path="/home" component={Home} />
            <Route exact path="/BEN/selfie" component={Selfie2} />
            <Route exact path="/BEN/selfie/preview" component={SelfiePrev} />
            <Route exact path="/BEN/docID" component={DocId2} />
            <Route exact path="/BEN/docID/preview" component={DocIdPreview2} />
            <Route path="/BEN/info" component={Info} />
            <Route path="/BEN/ocr" component={OCR} />
            <Route path="/BEN/activity" component={PepActivity} />
            <Route path="/BEN/success" component={SuccessPage} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </Router>
      </RequireProvider>
    </ThemeProvider>
  );
}

export default App;

{
  /*  <Route path="/BEN/selfie">
            <Steps channel="BEN" />
              <Landing channel="BEN" />
            </Route> */
}

{
  /* <Route path="/BEN/selfie">
              <Steps channel="BEN" />
              <Landing channel="BEN" />
            </Route> */
}

{
  /* <Route path="/BEN">
              <Landing channel="BEN" />
            </Route>

            <Route path="/selfie">
              <Steps />
            </Route> */
}
