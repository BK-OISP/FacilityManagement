import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import AddRequest from "./add/AddRequest";
import ViewAll from "./viewPersonRequest/ViewAll";

const Facility = (props) => {
  let routes;
  const match = useRouteMatch();

  routes = (
    <Switch>
      <Route path={`${match.path}/manage`} exact>
        <ViewAll />
      </Route>
      <Route path={`${match.path}/add`} exact>
        <AddRequest />
      </Route>
      <Redirect to="/error" />
    </Switch>
  );

  return <div>{routes}</div>;
};

export default Facility;
