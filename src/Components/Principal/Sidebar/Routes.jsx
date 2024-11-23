import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Layout from './Layout';
import PrincipalHome from '../Home/PrincipalHome';
import PrincipalStudents from '../Students/PrincipalStudents';
import PrincipalTeachers from '../Teachers/PrincipalTeacher';
import PrincipalExam from '../Exam/PrincipalExam';
import PrincipalCalendar from '../Calendar/PrincipalCalendar';
import PrincipalFees from '../Fees/PrincipalFees';
import PrincipalMail from '../Mail/PrincipalMail';
import PrincipalNotice from '../Notice/PrincipalNotice';
import TeachersAttendance from '../Teachers/TeacherAttendance/TeachersAttendance';
import TeacherProfile from '../Teachers/TeacherProfile/TeacherProfile';
import StudentTimetable from '../Students/StudentTimetable/StudentTimetable';
import Profile from "../PrincipalProfile/Profile";
import StudentMarksTable from '../Students/StudentProfile/Academics/StudentMarksTable';
import TeacherMail from '../../teacher/Mail/TeacherMail';
import StudentProgress from '../Exam/StudentsProgress/StudentProgress';
import ViewProfile from '../Students/ViewProfile';
import EditProfile from '../../Admin/Profiles/EditProfile/EditProfile';
import EditProfile1 from '../../Admin/Profiles/EditProfile/EditProfile1';
import PrincipalStudentsTabs from '../../Admin/Profiles/EditProfile/PrincipalStudentsTabs';

function AppRoutes() {
    return (
        <Router>
            <Layout>
                <Routes>

                    <Route path="*" element={<Navigate to="/principal/home" />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default AppRoutes;