import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={App} />
        </Switch>
      </Router>
    );
  }
}
