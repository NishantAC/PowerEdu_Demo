import React, { useEffect, useState } from 'react';
import './Totalinfo.css';
import { useNavigate } from 'react-router-dom';  // Updated import for React Router v6
import { useSelector } from 'react-redux'; // Get user context from redux store
import SchoolUsersService from '../../../../services/schoolusers.service';

function Totalinfo() {
  const navigate = useNavigate();  // Use useNavigate for navigation
  const { user } = useSelector((state) => state.user);
  
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);

  // Static pending fees count
  const pendingFeesStudents = 820; // This is now a static value

  useEffect(() => {
    if (user?.schoolcode) {
      // Fetch total students
      SchoolUsersService.getTotalStudentsNumber(user.schoolcode).then((res) =>
        setTotalStudents(res.totalStudentsNumber)
      );

      // Fetch total teachers
      SchoolUsersService.getTotalTeachersNumber(user.schoolcode).then((res) =>
        setTotalTeachers(res.totalTeachersNumber)
      );

      // Fetch total staff
      SchoolUsersService.getTotalStaffNumber(user.schoolcode).then((res) =>
        setTotalStaff(res.totalStaffNumber)
      );
    }
  }, [user]);

  return (
    <div className="totalinfo">
      <div className="infod1">
        <span>Total Students</span>
        <hr style={{ margin: 0, marginTop: '3px' }} />
        <p>{totalStudents}</p>
      </div>
      <div className="infod2">
        <span>Total Teachers</span>
        <hr style={{ margin: 0, marginTop: '3px' }} />
        <p>{totalTeachers}</p>
      </div>
      <div className="infod3">
        <span>Total Staff</span>
        <hr style={{ margin: 0, marginTop: '3px' }} />
        <p>{totalStaff}</p>
      </div>
      <div className="infod4">
        <span>No. of students with pending fees</span>
        <hr style={{ margin: 0, marginTop: '3px' }} />
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginTop: '10px' }}>
          <p style={{ fontWeight: '700', color: 'rgba(0, 0, 0, 0.75)', fontSize: '18px' }}>
            {pendingFeesStudents}
          </p>
          <button type="button" onClick={() => navigate('/principal/fees')} style={{ cursor: 'pointer' }}>
            Click to view
          </button>
        </div>
      </div>
    </div>
  );
}

export default Totalinfo;
