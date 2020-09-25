import React from "react";

const UserMenu = (props) => {
  const { id, index, icon, active, tabIndex, toggleRightMenu } = props;

  const USER_MENU = [
    {
      key: "profile",
      icon: "person",
      text: "Profile",
      link: "#",
    },
    { key: "settings", icon: "settings", text: "Settings", link: "#" },
    { key: "clear", icon: "clear", text: "Log out", link: "#" },
  ];
  return (
    <li className="nv--item owdropdown avt-wrapper">
      <div className="avt" id={id}>
        <span
          className="material-icons "
          tabIndex={tabIndex}
          onClick={() => {
            toggleRightMenu(index);
          }}
          onBlur={() => toggleRightMenu(index)}
        >
          {icon}
        </span>

        <ul className={`owdropdown-menu ${active ? "owdropdown-expand" : ""}`}>
          {USER_MENU.map((item) => {
            return (
              <li key={item.key} className="owdropdown-menu--item">
                <a href={item.link} className="owdropdown-menu--link">
                  <div>
                    <span className="material-icons">{item.icon}</span>
                  </div>
                  <span className="owdropdown-menu--text">{item.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default UserMenu;
