import React, { useEffect, useState } from 'react';
import './ClassTestMarks.css';
import ClassTestMarksTable from './table/ClassTestMarksTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassTestsByTeacher } from "../../../../slices/classtest";

function ClassTestMarks() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { classtests } = useSelector((state) => state.classtest);
  const [testSubject, setTestSubject] = useState("");

  useEffect(() => {
    dispatch(
      fetchClassTestsByTeacher({ user_id: user.id, school_code: user?.school_id, classes: user.classes })
    );
  }, []);
    return (
        <div className="classtestmarks">
            <div style={{ display: 'flex', marginTop: '20px' }}>
                <p className='classtestheader'>
                    Home{" "}&gt;
                    <b>
                        {" "}
                        <u>Class Test Marks</u>
                    </b>
                </p>
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
                <h3 style={{ fontFamily: "Poppins",fontWeight:600, marginTop: '30px', fontSize: '25px' }}>Class Test Marks</h3>
                {testSubject && (
          <h3
            style={{
              fontFamily: "Poppins",
              fontWeight: 400,
              marginTop: "30px",
              fontSize: "25px",
            }}
          >
            {" "}
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              style={{width: "22px"}}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>{" "}
            {`${testSubject}`}{" "}
          </h3>
        )}
            </div>
            <br />
            <div style={{ marginTop: '10px' }}>
              <ClassTestMarksTable setTestSubject={setTestSubject} classtests={classtests}/>
            </div>
        </div>
    )
}

export default ClassTestMarks
