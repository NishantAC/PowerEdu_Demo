import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import MenuState from "./context/Menu/MenuState";
import Register from "./Components/Register/Register";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import "./App.css";
import ViewProfile from "./Components/Principal/Students/ViewProfile";
import Calendar from "./Components/Calendar/Calendar";
import MailComponent from "./Components/Mail/MailComponent";


// Importing Admin Layout Components
import Profiles from "./Components/Admin/Profiles/Profile/Profiles";
import EditProfile from "./Components/Admin/Profiles/EditProfile/EditProfile";
import Home from "./Components/Admin/Home/Home";
import FillUserInfo from "./Components/Admin/AddUser/FillUserInfo";
import Subjects from "./Components/Admin/Subjects/Subjects";
import Transport from "./Components/Admin/Transport/Transport";
import AdminNotice from "./Components/Admin/Notice/AdminNotice";
import FeeStructure from "./Components/Admin/Expense/FeeStructure/FeeStructure";
import FeePayment from "./Components/Admin/Expense/FeePayment/FeePayment";
import FeeDue from "./Components/Admin/Expense/FeeDue/FeeDue";
import School from "./Components/Admin/School/School";
 
// Importing Accounts Layout Components
import AccountsHome from "./Components/Accounts/Home/AccountsHome";

// Importing Student Layout Components
import StudentAssignment from "./Components/Student/Assignment/StudentAssignment";
import StudentExam from "./Components/Student/Exam/StudentExam";
import StudentFee from "./Components/Student/Fee/StudentFee";
import StudentHome from "./Components/Student/Home/StudentHome";
import StudentSubject from "./Components/Student/Subject/StudentSubject";
import StudentTeacher from "./Components/Student/Teacher/StudentTeacher";
import StudentNotice from "./Components/Student/Notice/StudentNotice";
import StudentProfile from "./Components/Student/StudentProfile/Profile";

// Importing Teacher Layout Components
// import TeacherAssignment from "./Components/Teacher/Assignment/TeacherAssignment";
import TeacherHomework from "./Components/Teacher/Homework/TeacherHomework";
import TeacherExam from "./Components/Teacher/Exam/TeacherExam";
import TeacherHome from "./Components/Teacher/Home/TeacherHome";
import TeacherSubject from "./Components/Teacher/Subjects/TeacherSubject";
import TeacherStudent from "./Components/Teacher/Student/TeacherStudent";
import TeacherNotice from "./Components/Teacher/Notice/TeacherNotice";
import ExamMarks from "./Components/Teacher/Exam/ExamMarks/ExamMarks";
import ClassTestMarks from "./Components/Teacher/Exam/ClassTestMarks/ClassTestMarks";
import StudentAttendance from "./Components/Teacher/Student/StudentAttendance/StudentAttendance";
import TeachersProfile from "./Components/Teacher/TeacherProfile/Profile";
import FolderTable from "./Components/Teacher/Exam/PaperFolder/FolderTable";

// Importing Principal Layout Components

import PrincipalHome from "./Components/Principal/Home/PrincipalHome";
import PrincipalStudents from "./Components/Principal/Students/PrincipalStudents";
import PrincipalTeachers from "./Components/Principal/Teachers/PrincipalTeacher";
import PrincipalExam from "./Components/Principal/Exam/PrincipalExam";
import PrincipalFees from "./Components/Principal/Fees/PrincipalFees";
import PrincipalNotice from "./Components/Principal/Notice/PrincipalNotice";
import TeachersAttendance from "./Components/Principal/Teachers/TeacherAttendance/TeachersAttendance";
import TeacherProfile from "./Components/Principal/Teachers/TeacherProfile/TeacherProfile";
import StudentTimetable from "./Components/Principal/Students/StudentTimetable/StudentTimetable";
import PrincipalProfile from "./Components/Principal/PrincipalProfile/Profile";
import StudentMarksTable from "./Components/Principal/Students/StudentProfile/Academics/StudentMarksTable";
import StudentProgress from "./Components/Principal/Exam/StudentsProgress/StudentProgress";
import PrincipalStudentsTabs from "./Components/Admin/Profiles/EditProfile/PrincipalStudentsTabs";
import MainLayout from "./MainLayout/MainLayout";
import { Toaster } from "@/Components/ui/sonner"
import Classes from "./Components/Admin/School/Classes/Classes";
import ClassNotice from "./Components/Admin/ClassNotice/ClassNotice";


function App() {
  return (
    <>
      <Toaster />
      <MenuState>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            
            <Route path="/register" element={<Register />} />
            <Route path="/viewstudent" element={<ViewProfile />} />
            <Route path="*" element={<Navigate to="/" />} />

          {/* Admin layout */}

        <Route element={<MainLayout />}>
          <Route path="/admin/dashboard" element={<Home />} />
          <Route path="/admin/profile/students" element={<Profiles />} />
          <Route path="/admin/profile/teachers" element={<Profiles />} />
          <Route path="/admin/profile/principal" element={<Profiles />} />
          <Route path="/admin/profile/accountant" element={<Profiles />} />
          <Route path="/admin/profile/staff" element={<Profiles />} />
          <Route path="/admin/profile/:id" element={<EditProfile />} />
          <Route path="/admin/addUser" element={<FillUserInfo />} />
          <Route path="/admin/Subjects" element={<Subjects />} />
          <Route path="/admin/Transport" element={<Transport />} />
          <Route path="/admin/mail/:mode" element={<MailComponent />} />
          <Route path="/admin/calendar" element={<Calendar />} />
          <Route path="/admin/school-notice" element={<AdminNotice />} />
          <Route path="/admin/class-notice" element={<ClassNotice />} />
          <Route path="/admin/fee-structure" element={<FeeStructure />} />
          <Route path="/admin/fee-due" element={<FeeDue />} />
          <Route path="/admin/fee-payment" element={<FeePayment />} />
          <Route path="/admin/school" element={<School />} />
          <Route path="/admin/manage-classes" element={<Classes />} />


          {/*  Teacher layout  */}
          <Route path="/teacher/dashboard" element={<TeacherHome />} />
          <Route path="/teacher/subject" element={<TeacherSubject />} />
          {/* <Route path="/teacher/add-assignment" element={<TeacherAssignment />} /> */}
          <Route path="/teacher/add-homework" element={<TeacherHomework />} />
          <Route path="/teacher/student/attendance" element={<StudentAttendance />} />
          <Route path="/teacher/student/profile" element={<TeacherStudent />} />
          <Route path="/teacher/mail/:mode" element={<MailComponent />} />
          <Route path="/teacher/notice" element={<TeacherNotice />} />
          <Route path="/teacher/exam-marks" element={<ExamMarks />} />
          <Route path="/teacher/class-test-marks" element={<ClassTestMarks />} />
          <Route path="/teacher/upload-paper" element={<TeacherExam />} />
          <Route path="/teacher/question-paper" element={<FolderTable />} />
          <Route path="/teacher/dashboard/profile" element={<TeachersProfile />} />

            {/*  Student layout  */}

          <Route path="/student/dashboard" element={<StudentHome />} />
          <Route path="/student/subject" element={<StudentSubject />} />
          <Route path="/student/assignment" element={<StudentAssignment />} />
          <Route path="/student/teacher" element={<StudentTeacher />} />
          <Route path="/student/fee" element={<StudentFee />} />
          <Route path="/student/exam" element={<StudentExam />} />
          <Route path="/student/notice" element={<StudentNotice />} />
          <Route path="/student/dashboard/profile" element={<StudentProfile />} />



            {/*  Principal layout  */}
            <Route path="/principal/dashboard" element={<PrincipalHome />} />
            <Route path="/principal/student/profile" element={<PrincipalStudents />} />
            <Route path="/principal/student/timetable" element={<StudentTimetable />} />
            <Route path="/principal/student/marks" element={<StudentMarksTable />} />
            <Route path="/principal/teacher/:name" element={<PrincipalTeachers />} />
            <Route path="/principal/teacher/attendance" element={<TeachersAttendance />} />
            <Route path="/principal/teacher/profile" element={<TeacherProfile />} />
            <Route path="/principal/exam" element={<PrincipalExam />} />
            <Route path="/principal/student/progress" element={<StudentProgress />} />
            <Route path="/principal/calendar" element={<Calendar />} />
            <Route path="/principal/fees" element={<PrincipalFees />} />
            <Route path="/principal/mail/:mode" element={<MailComponent />} />
            <Route path="/principal/notice" element={<PrincipalNotice />} />
            <Route path="/Principal/dashboard/profile" element={<PrincipalProfile />} />
            <Route path="/principal/view-profile" element={<PrincipalStudentsTabs />} />

            {/*  Accounts layout  */}

            <Route path="/accounts" element={<AccountsHome />} />
            </Route>

          </Routes>
        </Router>
      </MenuState>
    </>
  );
}

export default App;
