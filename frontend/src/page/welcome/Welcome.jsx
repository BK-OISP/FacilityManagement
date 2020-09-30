import React, { useCallback, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Navbar from "../../compoment/navbar/Navbar";
import Sidebar from "../../compoment/sidebar/Sidebar";
import Dashboard from "../dashboard/Dashboard";
import Facility from "../facility/Facility";
import MENU from "../MENU";

const Welcome = () => {
  let routes;
  const [isSidebarOpen, SetIsSidebarOpen] = useState(true);
  const toggleSidebar = useCallback(() => {
    SetIsSidebarOpen((pre) => !pre);
  }, []);

  routes = (
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/facility">
        <Facility />
      </Route>
      {/* <Redirect to="/dashboard" /> */}
    </Switch>
  );

  return (
    <div
      className={`overlay-scrollbar ${
        isSidebarOpen ? "sidebar-expand" : "sidebar-close"
      }`}
    >
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar menu={MENU} />
      <div className="wrapper">{routes}</div>
    </div>
  );
};

export default Welcome;
