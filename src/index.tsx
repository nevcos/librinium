import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom";

import { store } from "./store/store";
import { App } from "./ui/App";

// Import all plugins
// @ts-ignore
const _plugins = import.meta.globEager("./contentType/plugins/**/index.ts");

window.addEventListener("error", event => console.error(event.message, event.filename, event.lineno));
window.addEventListener("unhandledrejection", event => console.error("Unhandled Promise Error", event["reason"]));

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
