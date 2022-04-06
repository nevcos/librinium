import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom";;

import { store } from "./store/store";
import { App } from "./ui/App";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
