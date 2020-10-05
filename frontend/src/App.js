import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./compoment/privateRoute/PrivateRoute";
import localStorageService from "./helper/localStorage/localStorageService";

import LoginPage from "./page/login/Login";
import Welcome from "./page/welcome/Welcome.jsx";
import * as actionCreator from "./store/action/index";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorageService.getAccessToken === undefined) {
      localStorageService.clearAll();
    }
    dispatch(actionCreator.onTryAutoLogin());
  }, [dispatch]);

  const routes = (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <PrivateRoute path="/" component={Welcome} />
    </Switch>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default App;
