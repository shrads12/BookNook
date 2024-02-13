import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { configureAppStore, RootState } from "../shared/redux/store";
import { StaticRouter } from "react-router-dom/server";
import { App } from "../client/App";
import path from "path";
import fs from "fs";
import { fetchBooks } from "../shared/redux/bookSlice";

// const scriptUrl =
//   process.env.NODE_ENV === "production"
//     ? "https://shraddha-booknook.web.app/bundle.js"
//     : "/static/bundle.js";

const server = express();

server.use("/static", express.static("hosting/public"));

server.get("/", async (req, res) => {
  const store = configureAppStore();
  await store.dispatch(fetchBooks());

  const appMarkup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );
  res.send(renderFullPage(appMarkup, store.getState()));
});

function renderFullPage(html: string, preloadedState: RootState) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Redux Universal Example</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
          /</g,
          "\\u003c"
        )}
      </script>
      <script type="text/javascript" src="https://shraddha-booknook.web.app/bundle.js"></script>
    </body>
  </html>
  `;
}
// Uncomment this when testing locally
// const port = process.env.PORT || 3000;
// server.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

export { server };
