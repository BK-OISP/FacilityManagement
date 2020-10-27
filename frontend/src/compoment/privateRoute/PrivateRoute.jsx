import React from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import localStorageService from "../../helper/localStorage/localStorageService";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const isAuthenticate = auth.acToken ? true : false;

  const checkAuthorization = useCallback(
    (appRoles) => {
      const userRole = localStorageService.getRole();
      if (roles) {
        return (
          appRoles.role &&
          appRoles.role.reduce((isAuthor, role) => {
            return isAuthor && userRole.includes(role);
          }, true)
        );
      } else return true;
    },
    [roles]
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticate && checkAuthorization(roles)) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
