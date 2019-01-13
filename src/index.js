import React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import Router from "./components/Router";
import "./styles/common.css";
import "./styles/document.css";
import "./styles/error.css";
import "./styles/header.css";

render(
  <HashRouter>
    <Router />
  </HashRouter>,
  document.getElementById("index")
);
