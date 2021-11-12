import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import LoginScreen from "./screens/login/LoginScreen";

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/login" exact component={LoginScreen} />
        </Switch>
      </Router>
    );
  }
}
