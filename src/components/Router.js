import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Document from "./Document";

export default class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/page/:title/:revision" component={Document} />
      </Switch>
    );
  }
}
