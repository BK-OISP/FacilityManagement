import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddRequest from "./add/AddRequest";
import ViewAll from "./viewPersonRequest/ViewAll";

const Facility = (props) => {
  let routes;
  const match = useRouteMatch();

  console.log(match);

  routes = (
    <Switch>
      <Route path={`${match.path}/manage`}>
        <ViewAll />
      </Route>
      <Route path={`${match.path}/add`}>
        <AddRequest />
      </Route>
    </Switch>
  );

  return <div>{routes}</div>;
};

export default Facility;
