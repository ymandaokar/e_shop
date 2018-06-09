var webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  path = require("path"),
  LodashModuleReplacementPlugin = require("lodash-webpack-plugin"),
  PreloadWebpackPlugin = require("preload-webpack-plugin"),
  devtool =
    process.env.NODE_ENV == "production" ? "hidden-source-map" : "source-map",
  // BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  //   .BundleAnalyzerPlugin,
  plugins = [
    new webpack.IgnorePlugin(/^\.\/locale$/),
    //new LodashModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([
      {
        from: "src/extern",
        to: "extern"
      },
      {
        from: "src/images",
        to: "images"
      }
    ]),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeAttributeQuotes: true,
        minifyCSS: true
      }
    }),
    new ExtractTextPlugin({
      filename: "styles.min.css",
      allChunks: true
    }),
    new webpack.DefinePlugin({
      REMOVE_LOGS: JSON.stringify(false)
    })
  ];

module.exports = {
  entry: {
    javascript: "./src/js/index.js"
  },
  mode: process.env.NODE_ENV || "development",
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [path.resolve(__dirname, "src")],
        query: {
          presets: [["es2015", { modules: false }], "react"],
          plugins: [
            "recharts",
            "lodash",
            "transform-class-properties",
            "syntax-dynamic-import"
          ]
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "file-loader",
            query: {
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
        query: {
          name: "./images/[name].[ext]"
        }
      }
    ]
  },
  plugins: plugins,
  devServer: {
    proxy: {
      "/user": {
        target: process.env.surveySource || "http://localhost:8080",
        secure: false
      },
      "/categories": {
        target: process.env.surveySource || "http://localhost:8080",
        secure: false
      },
      "/productitems": {
        target: process.env.surveySource || "http://localhost:8080",
        secure: false
      },
      "/invoice": {
        target: process.env.surveySource || "http://localhost:8080",
        secure: false
      },
      "/auth": {
        target: process.env.surveySource || "http://localhost:8080",
        secure: false
      },
      "/db": {
        target: process.env.surveySource || "http://localhost:8080",
        secure: false
      },
      "/healthz": {
        target: process.env.surveySource || "http://localhost:8080",
        secure: false
      }
    },
    contentBase: path.join(__dirname, "build"),
    port: process.env.surveyPort || 8081,
    historyApiFallback: true,
    host: process.env.surveyHost || "localhost"
  },
  output: {
    filename: "bundle.[hash].js",
    chunkFilename: "[name].bundle.[hash].js", // names generation for chunks created by commomChunkPlugin
    path: path.join(__dirname, "build"),
    // makes webpack throw on missing imports
    strictModuleExceptionHandling: true
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, "../../node_modules", "react")
    }
  },
  devtool: devtool
};
