import React, { useState, useEffect} from 'react';
import './AcademicsDetails.css'
import AcademicsTable from './AcademicsTable';
import Dropdown from './Dropdown';
// import ExamTypeDropdown from './AcademicYearDropdown';
import { useDispatch, useSelector } from "react-redux";
import { getStudentAcademics } from "../../../../slices/student"

function AcademicsDetails({userId}) {
    const { academics } = useSelector((state) => state.student);
    const dispatch = useDispatch();
    const [ filteredData, setFilteredData] = useState(academics);
    const [ filterClass, setFilterClass] = useState('');
    const [ filterSubject, setFilterSubject] = useState('');
    const [ filterExamType, setFilterExamType] = useState('');

    useEffect(() => {
        dispatch(getStudentAcademics({user_id: userId}))
    },[])

    useEffect(() => {
        setFilteredData(academics)
    },[academics])

    const classes = academics.reduce((acc, academic) =>{
        if(!acc.includes(academic.class)){
            acc.push(academic.class)
        }
        return acc
    }, [])

    const subjects = academics.reduce((acc, academic) =>{
        if(!acc.includes(academic.subject)){
            acc.push(academic.subject)
        }
        return acc
    }, [])

    const examTypes = academics.reduce((acc, academic) =>{
        if(!acc.includes(academic.examType)){
            acc.push(academic.examType)
        }
        return acc
    }, [])

    const handleApplyFilter = () => {
        const filteredResult = academics.filter(academic => {
            const matchClass = !filterClass || academic.class === filterClass;
            const matchSubject = !filterSubject || academic.subject === filterSubject;
            const matchExamType = !filterExamType || academic.examType === filterExamType;
    
            return matchClass && matchSubject && matchExamType;
        });
        setFilteredData(filteredResult);
    }

    return (
        <div>
            <div className="academicsfilters">
                <h4 style={{margin:'auto 10px'}}>Filters:-</h4>
                <Dropdown data={{name: 'Class', options: classes, value: filterClass, setValue: setFilterClass}}/>
                <Dropdown data={{name: 'Subject', options: subjects, value: filterSubject, setValue: setFilterSubject}}/> 
                <Dropdown data={{name: 'Exam Type', options: examTypes, value: filterExamType, setValue: setFilterExamType}}/>  
                <button onClick={handleApplyFilter} className="academicsbtn">Apply</button>
            </div>
            <div style={{width:'95%',margin:'10px'}}>
                <AcademicsTable data={filteredData}/>
            </div>
        </div>
    )
}

export default AcademicsDetails;
