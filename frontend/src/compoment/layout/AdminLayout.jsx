import React, { useCallback, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const AdminLayout = (props) => {
  const [isOpenSidebar, SetIsOpenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    SetIsOpenSidebar((pre) => !pre);
  }, []);
  return (
    <>
      <div
        className={`overlay-scrollbar ${
          isOpenSidebar ? "sidebar-expand" : "sidebar-close"
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar />
        <div className="wrapper">{props.children}</div>
      </div>
    </>
  );
};
export default AdminLayout;
