import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { store } from "../shared/redux/store";
import { StaticRouter } from "react-router-dom/server";
import { App } from "../client/App";
import path from "path";
import fs from "fs";

const app = express();

app.use(express.static("dist/public"));

app.get("/", (req, res) => {
  const context = {};

  const appMarkup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );
  const indexFile = path.resolve("dist/index.html");
  fs.readFile(indexFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("An error occured");
    }

    const response = data.replace(
      '<div id="root"></div>',
      `<div id="root">${appMarkup}</div>`
    );
    return res.send(response);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
