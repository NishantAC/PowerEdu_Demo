import React, { useEffect, useState } from 'react';
import './Academics.css';
import AcademicsTable from './AcademicsTable';
import ClassDropdown from './ClassDropdown';
import ExamTypeDropdown from './ExamTypeDropdown';
import SubjectDropdown from './SubjectDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamTypes } from '../../../../../slices/examtype';
import { getAllSubjectsBySchool } from '../../../../../slices/subject';

function AcademicsDetails({stud}) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user);
  const { examdetails } = useSelector(state => state.exam);
  const { examTypes } = useSelector((state) => state.examtype);
  const { subject: subjects } = useSelector((state) => state.subject);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [examTypeFilter, setExamTypeFilter] = useState('');
  const [filteredRows, setFilteredRows] = useState(examdetails);
  // const [examTypes, setExamTypes] = useState([]);
  // const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    dispatch(fetchExamTypes({ school_id: user?.school_id }));
    dispatch(getAllSubjectsBySchool({ school_id: user?.school_id }));
  }, [])

  // useEffect(() => {
  //   // Extract unique exam types from examdetails
  //   const uniqueExamTypes = [...new Set(examdetails.map(row => row.examtype))];
  //   setExamTypes(uniqueExamTypes);

  //   // Extract unique subjects from examdetails
  //   const uniqueSubjects = [...new Set(examdetails.map(row => row.subjectname))];
  //   setSubjects(uniqueSubjects);
  // }, [examdetails]);

  // Apply the filters and update the displayed rows
  const applyFilters = () => {
    
    const filteredData = examdetails.filter(row =>
      (subjectFilter === "" || row.subject === subjectFilter) && (examTypeFilter === "" || row.examtype === examTypeFilter)
    );
    setFilteredRows(filteredData);
  };

  // Clear the filters and display all rows
  const clearFilters = () => {
    setSubjectFilter('');
    setExamTypeFilter('');
    setFilteredRows(examdetails);
  };

  return (
    <div>
      <div className="academicsfilters">
        <h4 style={{ margin: 'auto 10px' }}>Filters:-</h4>
        {/* <ClassDropdown />
        <ExamTypeDropdown/>
        <SubjectDropdown/> */}
        <select
          style={{ borderRadius: '5px', fontSize: '17px', padding: '6px 10px', color: '#414141' }}
          value={subjectFilter}
          onChange={e => setSubjectFilter(e.target.value)}
        >
          <option value="">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.subjectname}>{subject.subjectname}</option>
          ))}
        </select>
        <select
          style={{ borderRadius: '5px', fontSize: '17px', padding: '6px 10px', color: '#414141' }}
          value={examTypeFilter}
          onChange={e => setExamTypeFilter(e.target.value)}
        >
          <option value="">All Examtypes</option>
          {examTypes.map(type => (
            <option key={type.id} value={type.title}>{type.title}</option>
          ))}
        </select>
        <button className="academicsapplybtn" onClick={applyFilters}>Apply</button>
        <a className='clearbtn' onClick={clearFilters}>clear</a>
      </div>
      <div style={{ margin: '10px' }}>
        <AcademicsTable stud={stud} examdetails={filteredRows?.filter(e => e.studentid === stud?.userid)} />
      </div>
    </div>
  );
}

export default AcademicsDetails;
