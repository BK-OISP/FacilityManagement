import React from "react";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../../compoment/privateRoute/PrivateRoute";
import Roles from "../../helper/config/Roles";
import AddRequest from "./add/AddRequest";
import ViewAll from "./viewPersonRequest/ViewAll";

const Facility = (props) => {
  let routes;
  const match = useRouteMatch();

  routes = (
    <Switch>
      <PrivateRoute
        path={`${match.path}/manage`}
        roles={[Roles.FULLTIME]}
        component={ViewAll}
      />

      <PrivateRoute
        path={`${match.path}/add`}
        roles={[Roles.FULLTIME]}
        component={AddRequest}
      />

      <Redirect to="/error" />
    </Switch>
  );

  return <div>{routes}</div>;
};

export default Facility;
