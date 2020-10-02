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
        key: "viewRequest",
        title: "Theo dõi đề xuất",
        link: "/facility/manage",
      },
      {
        key: "addRequest",
        title: "Thêm đề xuất",
        link: "/facility/add",
      },
    ],
  },
];

export default MENU;
