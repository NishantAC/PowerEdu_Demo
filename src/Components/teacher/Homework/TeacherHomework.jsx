import React, { useEffect, useState } from 'react';
import './TeacherHomework.css';
import HomeworkTable from './HomeworkTable/HomeworkTable';
import UploadHomework from './UploadHomework/UploadHomework'
import HomeWorkService from '../../../services/homework.service';
import { useSelector } from 'react-redux';

function TeacherHomework() {

    const userId = useSelector((state) => state.user.user.id);
    const [subjects, setSubjects] = useState([]);
    const [ddwnClass, setddwnClass] = useState([]);
    const [allData, setAllData] = useState([]);
    const [fltData, setFltData] = useState([]);
    const [subValue, setSubValue] = useState("");
    const [clsValue, setClsValue] = useState("");

    useEffect(() => {
        try {
            const data = async () => {
                await initialData();
            };
            data();
        } catch (err) {
            console.error("Problem in TeachHomework :: useEffect() => ", err);
        }
    }, []);


    /**
    * intial data of assignment
   */
    const initialData = async () => {
        try {
            const data = await HomeWorkService.getInitialData({ userId: userId });
            setAllData(data);
            setFltData(data);
            const clname = Array.from(new Set(data.map(row => row.class_code)));
            const subname = Array.from(new Set(data.map(row => row.subject.subject_name)));
            setddwnClass(clname);
            setSubjects(subname);
        } catch (err) {
            console.error("Problem in teacher homework :: useEffect() => ", err);
        }
    }

    // to reset subject data after reset
    const resetSubjectData = () => {
        const subname = Array.from(new Set(allData.map(row => row.subject.subject_name)));
        setSubjects(subname);
    }

    /**
     * handel class on change 
     */
    const onClassChange = (e) => {
        const { value } = e.target;
        setClsValue(value);
        if (value) {
            const res = allData.filter(d => String(d.class_code) === String(value))
            const subname = Array.from(new Set(res.map(row => row.subject.subject_name)));
            setFltData(res);
            setSubjects(subname);
        } else if (value === "") {
            resetSubjectData(); // reset subject dropdown data after clicking on class option in class dropdown
        }else {
            setFltData(allData);
            setSubValue("");
        }
    }

    /**
     * handel subject on change 
     */
    const onSubjectChange = (e) => {
        const { value } = e.target;
        setSubValue(value);
        if (value) {
            const res = allData.filter(d => String(d.subject.subject_name) === String(value));
            setFltData(res);
        } else {
            setFltData(allData);
            setClsValue("");
        }
    }

    /**
     * clear All filters 
    */
    const clearFilter = () => {
        setFltData(allData);
        setSubValue("");
        setClsValue("");
        resetSubjectData(); // reset subject dropdown data
    }

    return (
        <div className="Tassigndiv">
            <p className="Tpara">
                Home{" "}&gt;
                <b>
                    {" "}
                    <u>Homework</u>
                </b>
            </p>

            <div className='Thead'>
                Homework
            </div>

            <div className="Tdiv1">
                <div className="Tdiv2">
                    <div >
                        <p className="Tpara2">
                            Filters:-
                        </p>
                    </div>

                    <div className="Tfilt">
                        <div>
                            <select onChange={onClassChange} className="Tddwn" value={clsValue}>
                                <option value="">Class</option>
                                {
                                    ddwnClass?.map((d) => <option key={d} value={d} className='Tdopt'>{d}</option>)
                                }
                            </select>
                        </div>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <div>
                            <select onChange={onSubjectChange} className="Tddwn" value={subValue}>
                                <option value="">Subject</option>
                                {
                                    subjects?.map((s) => <option key={s} value={s} className='Tdopt'>{s}</option>)
                                }
                            </select>
                        </div>
                        <a className='Tanchor' onClick={clearFilter}>Clear Filters</a>
                    </div>

                    <div className='newassignment'>
                        <UploadHomework initialData={initialData} />
                    </div>
                </div>
            </div>
            <HomeworkTable data={fltData} initialData={initialData} />
        </div >
    )
}

export default TeacherHomework
