import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import localStorageService from "./helper/localStorage/localStorageService";
import LoginPage from "./page/login/Login";
import Welcome from "./page/welcome/Welcome.jsx";
import * as actionCreator from "./store/action/index";

const App = () => {
  let routes;

  const auth = useSelector((state) => state.auth);

  let isAuthenticate =
    auth.acToken || localStorageService.getAccessToken() ? true : false;

  useEffect(() => {
    actionCreator.onTryAutoLogin();
  });

  if (isAuthenticate) {
    routes = (
      <Switch>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default App;
