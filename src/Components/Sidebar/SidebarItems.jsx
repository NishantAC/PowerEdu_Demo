import { FaSignOutAlt, FaUser, FaEnvelope, FaBook, FaBus, FaSchool, FaMoneyBill, FaBell, FaCalendarAlt , FaAngleDown,} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdAssignment } from "react-icons/md"; 

const getLastMailPath = () => {
  const mailPath = localStorage.getItem("mailPath");
  if (!mailPath) {
    localStorage.setItem("mailPath", "/mail/inbox");
  }
  return mailPath;
}


 const sidebarItems = {
  Admin: [
    { name: "Dashboard", route: "/admin/dashboard", icon: MdDashboard, child: [] },
    {
      name: "Profiles",
      icon: FaUser,
      child: [
        { name: "Students", route: "/admin/profile/students" },
        { name: "Teachers", route: "/admin/profile/teachers" },
        { name: "Principal", route: "/admin/profile/principal" },
        { name: "Accountant", route: "/admin/profile/accountant" },
        { name: "Staff", route: "/admin/profile/staff" },
      ],
    },
    { name: "Calendar", route: "/admin/calendar", icon: FaCalendarAlt, child: [] },
    { name: "Mail", route: `/admin${getLastMailPath()}`, icon: FaEnvelope, child: [] },
    { name: "Subjects", route: "/admin/subjects", icon: FaBook, child: [] },
    { name: "Transport", route: "/admin/transport", icon: FaBus, child: [] },
    {
      name: "Expenses",
      icon: FaMoneyBill,
      route: "/admin/fee-structure",
      child:[]
    },
    { name: "School", route: "/admin/school", icon: FaSchool, child: [] },
    { name: "Notice", route: "/admin/school-notice", icon: FaBell, child: [
      
    ] },
  ],
  Principal: [
    { name: "Dashboard", route: "/principal/dashboard", icon: MdDashboard, child: [] },
    {
      name: "Students",
      icon: FaUser,
      child: [
        { name: "Student", route: "/principal/student/profile" },
        { name: "Student Timetable", route: "/principal/student/timetable" },
      ],
    },
    { name: "Teachers", route: "/principal/teacher/attendance", icon: FaUser, child: [] },
    {
      name: "Exam",
      icon: FaBook,
      child: [
        { name: "Exam Schedule", route: "/principal/exam" },
        { name: "Student's Progress", route: "/principal/student/progress" },
      ],
    },
    { name: "Calendar", route: "/principal/calendar", icon: FaCalendarAlt, child: [] },
    { name: "Fees", route: "/principal/fees", icon: FaMoneyBill, child: [] },
    { name: "Mail", route: "/principal/mail/inbox", icon: FaEnvelope, child: [] },
    { name: "Notice", route: "/principal/notice", icon: FaBell, child: [] },
  ],
  Teacher: [
    { name: "Dashboard", route: "/teacher/dashboard", icon: MdDashboard, child: [] },
    {
      name: "Students",
      icon: FaUser,
      child: [
        { name: "Student Attendance", route: "/teacher/student/attendance" },
        { name: "Student Profile", route: "/teacher/student/profile" },
        { name: "Extra Class", route: "/teacher" },
      ],
    },
    {
      name: "Assignments",
      icon: MdAssignment,
      child: [
        { name: "Add Assignment", route: "/teacher/add-assignment" },
        { name: "Add Homework", route: "/teacher/add-homework" },
      ],
    },
    {
      name: "Exam",
      icon: FaBook,
      child: [
        { name: "Exam Marks", route: "/teacher/exam/marks" },
        { name: "Class Test Marks", route: "/teacher/class-test-marks" },
        { name: "Upload Question Paper", route: "/teacher/upload-paper" },
      ],
    },
    { name: "Subjects", route: "/teacher/subject", icon: FaBook, child: [] },
    { name: "Mail", route: "/teacher/mail/inbox", icon: FaEnvelope, child: [] },
    { name: "Notice", route: "/teacher/notice", icon: FaBell, child: [] },
  ],
  Student: [
    { name: "Dashboard", route: "/student/dashboard", icon: MdDashboard, child: [] },
    { name: "Subjects", route: "/student/subject", icon: FaBook, child: [] },
    { name: "Assignments", route: "/student/assignment", icon: FaBook, child: [] },
    { name: "Teachers", route: "/student/teacher", icon: FaUser, child: [] },
    { name: "Fees", route: "/student/fee", icon: FaMoneyBill, child: [] },
    { name: "Exam", route: "/student/exam", icon: FaBook, child: [] },
    { name: "Notice", route: "/student/notice", icon: FaBell, child: [] },
  ],
};


export default sidebarItems;