import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./page/Dashboard/Dashboard";
import LoginPage from "./page/Login/Login";

const App = () => {
  let routes;
  routes = (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default App;
