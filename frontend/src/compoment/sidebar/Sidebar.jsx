import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = (props) => {
  const { menu } = props;

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleDropdown = () => {
    setToggleDropdown((pre) => !pre);
  };

  return (
    <div className="sidebar overlay-scrollbar">
      <ul className="sidebar-nav">
        {menu.map((item) => {
          if (!item.sub) {
            return (
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
            );
          } else {
            return (
              <li className="sidebar-nav--item" key={item.key}>
                <div className="sidebar-nav--link sidebar-nav--dropdown">
                  <Link to="#" onClick={handleDropdown}>
                    <div>
                      <i className="material-icons">dashboard</i>
                    </div>
                    <span>{item.title}</span>
                  </Link>
                  <ul className={`${toggleDropdown ? "appear" : "hide"}`}>
                    {item.sub.map((sub) => {
                      return (
                        <li key={sub.key}>
                          <NavLink to={sub.link}>{sub.title}</NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
