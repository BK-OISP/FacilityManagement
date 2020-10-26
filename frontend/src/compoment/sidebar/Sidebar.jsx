import React, { useState } from "react";
import { useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import localStorageService from "../../helper/localStorage/localStorageService";

const Sidebar = (props) => {
  const { menu } = props;

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleDropdown = () => {
    setToggleDropdown((pre) => !pre);
  };

  const checkAuthorization = useCallback((appRoles) => {
    const userRole = localStorageService.getRole();

    return (
      appRoles.role &&
      appRoles.role.reduce((isAuthor, role) => {
        return isAuthor && userRole.includes(role);
      }, true)
    );
  }, []);

  return (
    <div className="sidebar overlay-scrollbar">
      <ul className="sidebar-nav">
        {menu.map((item) => {
          if (!item.sub) {
            return (
              checkAuthorization(item) && (
                <li className="sidebar-nav--item" key={item.key}>
                  <div className="sidebar-nav--link">
                    <NavLink to={item.link}>
                      <div>
                        <i className="material-icons">{item.icon}</i>
                      </div>
                      <span>{item.title}</span>
                    </NavLink>
                  </div>
                </li>
              )
            );
          } else {
            return (
              checkAuthorization(item) && (
                <li className="sidebar-nav--item" key={item.key}>
                  <div className="sidebar-nav--link sidebar-nav--dropdown">
                    <Link to="#" onClick={handleDropdown}>
                      <div>
                        <i className="material-icons">dashboard</i>
                      </div>
                      <span>{item.title}</span>
                      <span
                        style={{
                          color: "#727475",
                          fontSize: "15px",
                          paddingLeft: "5px",
                        }}
                        className="material-icons"
                      >
                        keyboard_arrow_down
                      </span>
                    </Link>
                    {checkAuthorization(item) && (
                      <ul className={`${toggleDropdown ? "appear" : "hide"}`}>
                        {item.sub.map((sub) => {
                          return (
                            <li key={sub.key}>
                              <NavLink to={sub.link}>{sub.title}</NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </li>
              )
            );
          }
        })}
      </ul>
    </div>
  );
};

export default React.memo(Sidebar);
