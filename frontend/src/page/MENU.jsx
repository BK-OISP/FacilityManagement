import roles from "../helper/config/Roles";

const MENU = [
  {
    key: "dashboard",
    title: "Dashboard",
    link: "/dashboard",
    icon: "dashboard",
    role: [roles.FULLTIME],
  },
  {
    key: "facility",
    title: "Quản lý tài sản",
    icon: "dashboard",
    role: [roles.FULLTIME],
    sub: [
      {
        key: "viewRequest",
        title: "Theo dõi đề xuất",
        link: "/facility/manage",
        role: [roles.FULLTIME],
      },
      {
        key: "addRequest",
        title: "Thêm đề xuất",
        link: "/facility/add",
        role: [roles.FULLTIME],
      },
    ],
  },
];

export default MENU;
