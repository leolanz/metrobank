import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
// "start": "set HTTPS=true&&set SSL_CRT_FILE=cert.pem&&set SSL_KEY_FILE=key.pem&& react-scripts start",

ReactDOM.render(
    <Provider store={store}>
      <App></App>
    </Provider>,
  document.getElementById("root")
);
