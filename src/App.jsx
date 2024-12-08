import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import MenuState from "./context/Menu/MenuState";
import Register from "./components/Register/Register";
import RegisterSchool from "./components/Register/RegisterSchool";
import RegisterPrincipal from "./components/Register/RegisterPrincipal";
import RegisterClassNotice from "./components/Register/RegisterClassNotice";
import RegisterSchoolNotice from "./components/Register/RegisterSchoolNotice";
import RegisterClassTest from "./components/Register/RegisterClassTest";
import RegisterHYExam from "./components/Register/RegisterHYExam";
import RegisterHYExamMark from "./components/Register/RegisterHYExamMarks";
import RegisterYExam from "./components/Register/RegisterYExam";
import RegisterYExamMark from "./components/Register/RegisterYExamMarks";
import RegisterClassTestMark from "./components/Register/RegisterClassTestMarks";
import RegisterSubjectTeachers from "./components/Register/RegisterSubjectTeachers";
import RegisterFeedbackStatus from "./components/Register/RegisterFeedbackStatus";
import RegisterAcademicFee from "./components/Register/RegisterAcademicFee";
import RegisterAcademicFeePaid from "./components/Register/RegisterAcademicFeePaid";
import RegisterAssignment from "./components/Register/RegisterAssignment";
import RegisterAssignmentStatus from "./components/Register/RegisterAssignmentStatus";
import RegisterSubject from "./components/Register/RegisterSubject";
import RegisterSyllabus from "./components/Register/RegisterSyllabus";
import RegisterNote from "./components/Register/RegisterNote";
import RegisterLink from "./components/Register/RegisterLink";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import "./App.css";
import ViewProfile from "./components/Principal/Students/ViewProfile";
// Importing Admin Layout Components

import Profiles from "./components/Admin/Profiles/Profile/Profiles";
import EditProfile from "./components/Admin/Profiles/EditProfile/EditProfile";
import Home from "./components/Admin/Home/Home";
import FillUserInfo from "./components/Admin/AddUser/FillUserInfo";
import Subjects from "./components/Admin/Subjects/Subjects";
import Transport from "./components/Admin/Transport/Transport";
import AdminTeacherMail from "./components/Teacher/Mail/TeacherMail";
import AdminCalendar from "./components/Admin/Calendar/AdminCalendar";
import AdminNotice from "./components/Admin/Notice/AdminNotice";
import AcademicFees from "./components/Admin/Expense/AcademicFees/AcademicFees";
import ExtracurricularFees from "./components/Admin/Expense/ExtracurricularFees/ExtracurricularFees";
import TransportFees from "./components/Admin/Expense/TransportFees/TransportFees";
import School from "./components/Admin/School/School";
 
// Importing Accounts Layout Components
import AccountsHome from "./components/Accounts/Home/AccountsHome";

// Importing Student Layout Components
import StudentAssignment from "./components/Student/Assignment/StudentAssignment";
import StudentExam from "./components/Student/Exam/StudentExam";
import StudentFee from "./components/Student/Fee/StudentFee";
import StudentHome from "./components/Student/Home/StudentHome";
import StudentSubject from "./components/Student/Subject/StudentSubject";
import StudentTeacher from "./components/Student/Teacher/StudentTeacher";
import StudentNotice from "./components/Student/Notice/StudentNotice";
import StudentProfile from "./components/Student/StudentProfile/Profile";

// Importing Teacher Layout Components
import TeacherAssignment from "./components/Teacher/Assignment/TeacherAssignment";
import TeacherHomework from "./components/Teacher/Homework/TeacherHomework";
import TeacherExam from "./components/Teacher/Exam/TeacherExam";
import TeacherHome from "./components/Teacher/Home/TeacherHome";
import TeacherSubject from "./components/teacher/Subjects/TeacherSubject";
import TeacherStudent from "./components/Teacher/Student/TeacherStudent";
import TeacherNotice from "./components/Teacher/Notice/TeacherNotice";
import ExamMarks from "./components/Teacher/Exam/ExamMarks/ExamMarks";
import ClassTestMarks from "./components/Teacher/Exam/ClassTestMarks/ClassTestMarks";
import StudentAttendance from "./components/Teacher/Student/StudentAttendance/StudentAttendance";
import TeachersProfile from "./components/Teacher/TeacherProfile/Profile";
import FolderTable from "./components/Teacher/Exam/PaperFolder/FolderTable";
import TeacherMail from "./components/Teacher/Mail/TeacherMail";

// Importing Principal Layout Components

import PrincipalHome from "./components/Principal/Home/PrincipalHome";
import PrincipalStudents from "./components/Principal/Students/PrincipalStudents";
import PrincipalTeachers from "./components/Principal/Teachers/PrincipalTeacher";
import PrincipalExam from "./components/Principal/Exam/PrincipalExam";
import PrincipalCalendar from "./components/Principal/Calendar/PrincipalCalendar";
import PrincipalFees from "./components/Principal/Fees/PrincipalFees";
import PrincipalMail from "./components/Principal/Mail/PrincipalMail";
import PrincipalNotice from "./components/Principal/Notice/PrincipalNotice";
import TeachersAttendance from "./components/Principal/Teachers/TeacherAttendance/TeachersAttendance";
import TeacherProfile from "./components/Principal/Teachers/TeacherProfile/TeacherProfile";
import StudentTimetable from "./components/Principal/Students/StudentTimetable/StudentTimetable";
import PrincipalProfile from "./components/Principal/PrincipalProfile/Profile";
import StudentMarksTable from "./components/Principal/Students/StudentProfile/Academics/StudentMarksTable";
import StudentProgress from "./components/Principal/Exam/StudentsProgress/StudentProgress";
import PrincipalStudentsTabs from "./components/Admin/Profiles/EditProfile/PrincipalStudentsTabs";
import MainLayout from "./MainLayout/MainLayout";
import { Toaster } from "@/components/ui/sonner"


function App() {
  return (
    <>
      <ToastContainer />
      <Toaster />
      <MenuState>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            
            <Route path="/register" element={<Register />} />
            <Route path="/register/school" element={<RegisterSchool />} />
            <Route path="/register/principal" element={<RegisterPrincipal />} />
            <Route path="/register/classnotice" element={<RegisterClassNotice />} />
            <Route path="/register/classtest" element={<RegisterClassTest />} />
            <Route path="/register/classtestmark" element={<RegisterClassTestMark />} />
            <Route path="/register/hyexam" element={<RegisterHYExam />} />
            <Route path="/register/hyexammark" element={<RegisterHYExamMark />} />
            <Route path="/register/yexam" element={<RegisterYExam />} />
            <Route path="/register/yexammark" element={<RegisterYExamMark />} />
            <Route path="/register/schoolnotice" element={<RegisterSchoolNotice />} />
            <Route path="/register/subjectteacher" element={<RegisterSubjectTeachers />} />
            <Route path="/register/feedbackstatus" element={<RegisterFeedbackStatus />} />

            <Route path="/register/academicfee" element={<RegisterAcademicFee />} />
            <Route path="/register/academicfeepaid" element={<RegisterAcademicFeePaid />} />
            <Route path="/register/assignment" element={<RegisterAssignment />} />
            <Route path="/register/assignmentstatus" element={<RegisterAssignmentStatus />} />
            <Route path="/register/subject" element={<RegisterSubject />} />
            <Route path="/register/syllabus" element={<RegisterSyllabus />} />
            <Route path="/register/note" element={<RegisterNote />} />
            <Route path="/register/link" element={<RegisterLink />} />
            <Route path="/viewstudent" element={<ViewProfile />} />
            <Route path="*" element={<Navigate to="/" />} />

          {/* Admin layout */}

        <Route element={<MainLayout />}>
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/profile/students" element={<Profiles />} />
          <Route path="/admin/profile/teachers" element={<Profiles />} />
          <Route path="/admin/profile/principal" element={<Profiles />} />
          <Route path="/admin/profile/accountant" element={<Profiles />} />
          <Route path="/admin/profile/staff" element={<Profiles />} />
          <Route path="/admin/edit-profile" element={<EditProfile />} />
          <Route path="/admin/addUser" element={<FillUserInfo />} />
          <Route path="/admin/Subjects" element={<Subjects />} />
          <Route path="/admin/Transport" element={<Transport />} />
          <Route path="/admin/mail/:mode" element={<AdminTeacherMail />} />
          <Route path="/admin/calendar" element={<AdminCalendar />} />
          <Route path="/admin/notice" element={<AdminNotice />} />
          <Route path="/admin/academic-fees" element={<AcademicFees />} />
          <Route path="/admin/extracurricular" element={<ExtracurricularFees />} />
          <Route path="/admin/transport-fees" element={<TransportFees />} />
          <Route path="/admin/school" element={<School />} />


          {/*  Teacher layout  */}
          <Route path="/teacher/home" element={<TeacherHome />} />
          <Route path="/teacher/subject" element={<TeacherSubject />} />
          <Route path="/teacher/add-assignment" element={<TeacherAssignment />} />
          <Route path="/teacher/add-homework" element={<TeacherHomework />} />
          <Route path="/teacher/student/attendance" element={<StudentAttendance />} />
          <Route path="/teacher/student/profile" element={<TeacherStudent />} />
          <Route path="/teacher/mail/:mode" element={<TeacherMail />} />
          <Route path="/teacher/notice" element={<TeacherNotice />} />
          <Route path="/teacher/exam-marks" element={<ExamMarks />} />
          <Route path="/teacher/class-test-marks" element={<ClassTestMarks />} />
          <Route path="/teacher/upload-paper" element={<TeacherExam />} />
          <Route path="/teacher/question-paper" element={<FolderTable />} />
          <Route path="/teacher/home/profile" element={<TeachersProfile />} />

            {/*  Student layout  */}

          <Route path="/student/home" element={<StudentHome />} />
          <Route path="/student/subject" element={<StudentSubject />} />
          <Route path="/student/assignment" element={<StudentAssignment />} />
          <Route path="/student/teacher" element={<StudentTeacher />} />
          <Route path="/student/fee" element={<StudentFee />} />
          <Route path="/student/exam" element={<StudentExam />} />
          <Route path="/student/notice" element={<StudentNotice />} />
          <Route path="/student/home/profile" element={<StudentProfile />} />



            {/*  Principal layout  */}
            <Route path="/principal/home" element={<PrincipalHome />} />
            <Route path="/principal/student/profile" element={<PrincipalStudents />} />
            <Route path="/principal/student/timetable" element={<StudentTimetable />} />
            <Route path="/principal/student/marks" element={<StudentMarksTable />} />
            <Route path="/principal/teachers" element={<PrincipalTeachers />} />
            <Route path="/principal/teacher/attendance" element={<TeachersAttendance />} />
            <Route path="/principal/teacher/profile" element={<TeacherProfile />} />
            <Route path="/principal/exam" element={<PrincipalExam />} />
            <Route path="/principal/student/progress" element={<StudentProgress />} />
            <Route path="/principal/calendar" element={<PrincipalCalendar />} />
            <Route path="/principal/fees" element={<PrincipalFees />} />
            <Route path="/principal/mail/:mode" element={<TeacherMail />} />
            <Route path="/principal/notice" element={<PrincipalNotice />} />
            <Route path="/Principal/home/profile" element={<PrincipalProfile />} />
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
