const SidebarItems = [
  {
    name: "Home",
    route: "/admin/home",
    child: [],
  },
  {
    name: "Profiles",
    child: [
      {
        name: "Students",
        route: "/admin/profile/students",
      },
      {
        name: "Teachers",
        route: "/admin/profile/teachers",
      },
      {
        name: "Principal",
        route: "/admin/profile/principal",
      },
      {
        name: "Accountant",
        route: "/admin/profile/accountant",
      },
      {
        name: "Staff",
        route: "/admin/profile/staff",
      },
    ],
  },
  {
    name: "Calendar",
    route: "/admin/calendar",
    child: [],
  },
  {
    name: "Mail",
    route: "/admin/mail",
    child: [],
  },
  {
    name: "Subjects",
    route: "/admin/subjects",
    child: [],
  },
  {
    name: "Transport",
    route: "/admin/transport",
    child: [],
  },
  {
    name: "Expenses",
    child: [
      {
        name: "Academic Fees",
        route: "/admin/academic-fees",
      },
      {
        name: "Transport Fees",
        route: "/admin/transport-fees",
      },
      {
        name: "Extracurricular",
        route: "/admin/extracurricular",
      },
    ],
  },
  {
    name: "School",
    route: "/admin/school",
    child: [],
  },
  {
    name: "Notice",
    route: "/admin/notice",
    child: [],
  },
];

export default SidebarItems;
