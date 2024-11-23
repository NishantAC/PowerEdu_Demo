import React, { useEffect, useState } from 'react';
import './HomeworkAssign.css';
import AssignmentService from '../../../services/assignment.service';
import HomeWorkService from '../../../services/homework.service';
import { useSelector } from 'react-redux';
import HomeworkAssignmodel from './HomeworkAssignmodel';

function HomeworkAssign() {
  const userId = useSelector((state) => state.user.user.id);
  const [data, setData] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAssignmAndhw = async () => {
    try {
      const assignmentData = await AssignmentService.getSubjectTeacherAssignment({ userId });
      const homeworkData = await HomeWorkService.getInitialData({ userId });

      // Combine both assignment and homework data
      const combinedData = [...assignmentData, ...homeworkData];

      combinedData.sort((a, b) => {
        let dateA, dateB;

        if (a.duration && 'assigndate' in a.duration) {
          dateA = new Date(a.duration.assigndate);
        } else if (a.homework_date) {
          dateA = new Date(a.homework_date);
        }

        if (b.duration && 'assigndate' in b.duration) {
          dateB = new Date(b.duration.assigndate);
        } else if (b.homework_date) {
          dateB = new Date(b.homework_date);
        }

        return dateB - dateA;
      });


      setData(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getAssignmAndhw();
  }, []);


  return (
    <div className="homeworkassign">
      <div style={{ backgroundColor: "#F9F9F9", height: "50px", alignItems: "center", width: "100%", position: "sticky", top: 0, zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 10px", alignItems: "center" }}>
          <span style={{ width: 'fit-content', fontFamily: "sans-serif", fontStyle: "normal", fontWeight: "600", fontSize: "20px" }}>Homework/Assignments</span>
          <button onClick={handleOpen} className="modelbtn"><p style={{ margin: '0px' }}>+</p></button>
        </div>
      </div>
      <div className="homework-body" style={{ overflowY: 'auto' }}>
        <div style={{ padding: "10px 20px", alignItems: "center" }}>
          {data && data.map(item => (
            <div key={item.id}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>{item.duration && item.duration.assigndate ? item.duration.assigndate : item.homework_date}</h5>
                <h5>{item.class_code}</h5>
              </div>
              <h5>{item.subject.subject_name}</h5>
              <p>{item.description ? item.description : item.homework_desc}</p>
            </div>
          ))}
        </div>
      </div>
      <HomeworkAssignmodel open={open} handleClose={handleClose} />

    </div>
  );
}

export default HomeworkAssign;
