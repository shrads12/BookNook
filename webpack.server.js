const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/server/server.tsx",
  output: {
    filename: "server-bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs2",
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")],
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      build: path.resolve(__dirname, "dist"),
    },
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/,
      },
    ],
  },
};
