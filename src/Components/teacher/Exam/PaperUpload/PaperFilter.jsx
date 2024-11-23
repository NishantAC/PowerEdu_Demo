import React, { useEffect, useState } from 'react';
import './UploadPaper.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamDetails } from '../../../../slices/hyexam';
import { fetchExamTypes } from '../../../../slices/examtype';
import { getCurrentTeacherData } from '../../../../slices/subjectteacher';
import { getAllSubjectsBySchool } from '../../../../slices/subject';


function PaperFilter({ papers, setFilteredPapers }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { examTypes } = useSelector((state) => state.examtype);
  const { subject } = useSelector((state) => state.subject);
  const { currentteacher } = useSelector((state) => state.subjectteacher);
  // console.log(examTypes);
  useEffect(() => {
    dispatch(fetchExamTypes({ schoolcode: user?.schoolcode }));
    dispatch(getCurrentTeacherData({ userId: user?.id }));
    dispatch(getAllSubjectsBySchool({ schoolcode: user?.schoolcode }));
  }, []);

  const [classid, setClassid] = useState("");
  const [examtype, setExamtype] = useState("");
  const [academicyear, setAcademicyear] = useState("");

  const handleFilter = () => {
    const filterData = papers.filter((row) => {
      return (
        (academicyear === "" || row.academicyear === academicyear) &&
        (classid === "" || row.classid === classid) &&
        (examtype === "" || row.examtype === examtype)
      );
    });
    setFilteredPapers(filterData)
  }

  const clearFilters = () => {
    setClassid("")
    setExamtype("")
    setAcademicyear("")
    setFilteredPapers(papers)
  }


  return (
    <div className='paperfilter'>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          rowGap: "8px",
          columnGap: "22px",
          marginTop: "10px",
        }}
      >
        <p
          style={{
            fontFamily: "Rubik",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "20px",
            color: "#000000",
            marginBottom: "auto",
          }}
        >
          Filters:-
        </p>
        <select
          style={{
            borderRadius: "5px",
            fontSize: "17px",
            padding: "4px 10px",
            color: "#414141",
          }}
          value={academicyear} onChange={(e) => setAcademicyear(e.target.value)}
        >
          <option value="" >
            Academic Year
          </option>
          <option value={'2021-2022'} >{'2021-2022'}</option>
          <option value={'2022-2023'} >{'2022-2023'}</option>
        </select>
        <select
          style={{
            borderRadius: "5px",
            fontSize: "17px",
            padding: "4px 10px",
            color: "#414141",
          }}
          value={examtype} onChange={(e) => setExamtype(e.target.value)}
        >
          <option value="">
            Exam Type
          </option>
          {examTypes.map(term => <option key={term.title} value={term.title}>{term.title}</option>)}
        </select>
        <select
          style={{
            borderRadius: "5px",
            fontSize: "17px",
            padding: "4px 10px",
            color: "#414141",
          }}
          value={classid} onChange={(e) => setClassid(e.target.value)}
        >
          <option value="">
            Class
          </option>
          {currentteacher?.classes?.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button
          style={{
            borderRadius: "5px",
            background: "#214DF9",
            padding: "4px 24px",
            color: "#FFFFFF",
            border: "none",
          }}
          onClick={handleFilter}
        >
          Apply
        </button>
        <button onClick={clearFilters} style={{ border: 'none', background: 'none' }}>
          <a style={{ color: '#FF7575', fontSize: '15px', fontWeight: '500', textDecoration: 'underline' }}>
            Clear Filters
          </a>
        </button>
      </div>
    </div>

  )
}

export default PaperFilter
