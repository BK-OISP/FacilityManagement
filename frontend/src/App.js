import React, { useCallback, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./compoment/navbar/Navbar.jsx";
import Sidebar from "./compoment/sidebar/Sidebar.jsx";
import Dashboard from "./page/dashboard/Dashboard.jsx";
import Facility from "./page/facility/Facility.jsx";
import LoginPage from "./page/login/Login";

const App = () => {
  let routes;

  const [isSidebarOpen, SetIsSidebarOpen] = useState(true);
  const toggleSidebar = useCallback(() => {
    SetIsSidebarOpen((pre) => !pre);
  }, []);

  const MENU = [
    {
      key: "dashboard",
      title: "Dashboard",
      link: "/dashboard",
      icon: "dashboard",
    },
    {
      key: "facility",
      title: "Quản lý tài sản",
      icon: "dashboard",
      sub: [
        {
          key: "addRequest",
          title: "Thêm đề xuất",
          link: "/facility/addrequest",
        },
      ],
    },
  ];

  routes = (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/facility">
        <Facility />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );

  return (
    <BrowserRouter>
      <div
        className={`overlay-scrollbar ${
          isSidebarOpen ? "sidebar-expand" : "sidebar-close"
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar menu={MENU} />
        <div className="wrapper">{routes}</div>
      </div>
    </BrowserRouter>
  );
};

export default App;
