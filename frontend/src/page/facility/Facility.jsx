import React from "react";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";

import PrivateRoute from "../../compoment/privateRoute/PrivateRoute";
import Roles from "../../helper/config/Roles";
import AddRequest from "./add/AddRequest";
import ViewStatusRequest from "./viewStatusRequest/ViewStatusRequest";

const Facility = (props) => {
  let routes;
  const match = useRouteMatch();

  routes = (
    <Switch>
      <PrivateRoute
        path={`${match.path}/manage`}
        roles={[Roles.FULLTIME]}
        component={ViewStatusRequest}
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
