import React, { useCallback, useState } from "react";
import { Redirect, Switch } from "react-router-dom";

import Navbar from "../../compoment/navbar/Navbar";
import PrivateRoute from "../../compoment/privateRoute/PrivateRoute";
import Sidebar from "../../compoment/sidebar/Sidebar";
import Dashboard from "../dashboard/Dashboard";
import Facility from "../facility/Facility";
import MENU from "../MENU";

const Welcome = () => {
  let routes;
  const [isSidebarOpen, SetIsSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => {
    SetIsSidebarOpen((pre) => !pre);
  }, []);

  routes = (
    <Switch>
      <PrivateRoute path="/dashboard">
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute path="/facility">
        <Facility />
      </PrivateRoute>
      <Redirect to="/dashboard" />
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
