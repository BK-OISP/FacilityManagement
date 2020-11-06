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
        link: "/facility/status",
        role: [roles.FULLTIME],
      },
      {
        key: "addRequest",
        title: "Thêm đề xuất",
        link: "/facility/add",
        role: [roles.FULLTIME],
      },
      {
        key: "manageRequest",
        title: "Quản lý đề xuất",
        link: "/facility/manage",
        role: [roles.FM_DEPUTY_HEAD],
      },
    ],
  },
];

export default MENU;
