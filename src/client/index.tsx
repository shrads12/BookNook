import React, { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureAppStore } from "../shared/redux/store";
import { App } from "./App";

const store = configureAppStore(window.__PRELOADED_STATE__);

hydrateRoot(
  document.getElementById("root"),
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
