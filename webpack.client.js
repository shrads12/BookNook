const path = require("path");

module.exports = {
  entry: "./src/client/index.tsx",
  output: {
    path: path.resolve(__dirname, "hosting", "public"),
    filename: "bundle.js",
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")],
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
