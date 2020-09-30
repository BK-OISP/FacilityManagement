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

export default MENU;
