const SidebarItems = [
  {
    name: "Home",
    route: "/principal/home",
    child: [],
  },
  {
    name: "Students",
    route: "/principal/students",
    child: [
      {
        name: "Student",
        route: "/principal/student-profile",
      },
      // {
      //   name: "Teachers",
      //   route: "/admin/teachers-profile",
      // },
      // {
      //   name: "Principal",
      //   route: "/admin/principal-profile",
      // },
      // {
      //   name: "Accountant",
      //   route: "/admin/accountant-profile",
      // },
      // {
      //   name: "Staff",
      //   route: "/admin/staff-profile",
      // },
      {
        name: "Student Timetable",
        route: "/principal/student-timetable",
      },
    ],
  },
  {
    name: "Teachers",
    // route: "/principal/teachers",
    route: "/principal/teacher-attendance",
    child: [
      /* {
                name:"Teacher Attendance",
                route:"/principal/teacher-attendance"
            },
            {
                name:"Teacher Profile",
                route:"/principal/teacher-profile"
            } */
    ],
  },
  {
    name: "Exam",
    route: "/principal/exam",
    child: [
      {
        name: "Exam Schedule",
        route: "/principal/exam",
      },
      {
        name: "Student's Progress",
        route: "/principal/student-progress",
      },
    ],
  },
  {
    name: "Calendar",
    route: "/principal/calendar",
    child: [],
  },
  {
    name: "Fees",
    route: "/principal/fees",
    child: [],
  },
  {
    name: "Mail",
    route: "/principal/mail",
    child: [],
  },
  {
    name: "Notice",
    route: "/principal/notice",
    child: [],
  },
];

export default SidebarItems;
