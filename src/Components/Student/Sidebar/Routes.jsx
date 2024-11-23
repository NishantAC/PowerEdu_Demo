import { Routes, Route, Navigate } from "react-router-dom";
import StudentAssignment from "../Assignment/StudentAssignment";
import StudentExam from "../Exam/StudentExam";
import StudentFee from "../Fee/StudentFee";
import StudentHome from "../Home/StudentHome";
import StudentSubject from "../Subject/StudentSubject";
import StudentTeacher from "../Teacher/StudentTeacher";
import StudentNotice from "../Notice/StudentNotice";
import Layout from "./Layout";
import Profile from "../StudentProfile/Profile";

function RoutesComponent() {
  return (
    <Routes>
      {/* Use Layout as a wrapper for routes */}
      <Route path="/" element={<Layout />}>

        
        {/* Redirect to /student/home if no other route matches */}
        <Route path="*" element={<Navigate to="/student/home" replace />} />
      </Route>
    </Routes>
  );
}

export default RoutesComponent;