import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router";
import DetectDevice from "./detectdevice.js";
import history from "./helpers/history"; //created single instance of history object

module.exports = ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={DetectDevice} />
  </Router>,
  document.getElementById("app")
);
