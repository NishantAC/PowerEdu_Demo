import React, { useEffect, useState } from 'react';
import './TopStudents.css';
import TopstudentsTable from './TopStudentsTable';
import UnderPerformingTable from './UnderPerformingTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentsWithMarks } from '../../../../slices/student';
import { getDropdownClasses } from '../../../../slices/principal';

function TopStudents() {
    const [value, setValue] = useState(true);
    const [classFilter, setClassFilter] = useState('1A');
    const { classes } = useSelector(state => state.principal)
    const { user: currentUser } = useSelector((state) => state.user);
    const { studentsWithMarks } = useSelector((state) => state.student);
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getDropdownClasses({ schoolcode: currentUser.schoolcode }))
        dispatch(fetchStudentsWithMarks({ school_code: currentUser.schoolcode, class_code: classFilter, performance: value }))


    }, [value, classFilter])

    return (
        <div className="topstudents-container">
            <div className="topstudents-header">
                <span style={{ fontFamily: "sans-serif", fontStyle: "normal", fontWeight: "600", fontSize: "20px", marginRight: '5px' }}>Top Students</span>
                <div style={{ marginRight: '0px', marginLeft: 'auto', alignItems: "center", display: "inline-flex" }}>
                    <select value={classFilter}
                        onChange={e => setClassFilter(e.target.value)} style={{ cursor: 'pointer', border: '1px solid #204DF9', color: '#204DF9', padding: '5px 15px', fontSize: '15px', borderRadius: '5px' }}>
                        <option value="" hidden>Class</option>
                        {classes?.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select
                        value={value}
                        onChange={e => setValue(e.target.value === 'true')} // Convert string to boolean
                        style={{
                            cursor: 'pointer',
                            border: '1px solid #204DF9',
                            color: '#204DF9',
                            padding: '5px 15px',
                            fontSize: '15px',
                            borderRadius: '5px'
                        }}
                    >
                        <option value="true">Performing</option> {/* Use string values */}
                        <option value="false">Underperforming</option> {/* Use string values */}
                    </select>

                </div>
            </div>
            <div className="topstudents-body">
                <TopstudentsTable students={studentsWithMarks} schoolClass={classFilter} />
            </div>
        </div>
    );
}

export default TopStudents;
