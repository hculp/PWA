const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// Webpack configuration for service worker and manifest file 
module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        title: "JATE",
      }),
      new InjectManifest({
        swSrc: "./src/js/sw.js",
        swDest: "sw.js",
      }),
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "JATE",
        description:
          "JATE is a simple note taking app that allows you to create, edit, and delete notes.",
        background_color: "#272822",
        theme_color: "#ffffff",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/assets/icons/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }
        }
      ],
    },
  };
};
