import React, { useEffect } from 'react'

function AcademicYearDropdown({data: {academicYears, filterAcademicYear, setFilterAcademicYear}}) {

    const handleChange = (event) => {
        setFilterAcademicYear(event.target.value);
    };
    return (
        <div style={{margin:'10px 25px'}}>
            <select value={filterAcademicYear} onChange={handleChange} style={{borderRadius:'5px', fontSize:'17px',padding:'6px 10px',color:'#414141'}}>
                {
                    academicYears.map((academicYear, index) => (
                        <React.Fragment key={index}>
                            <option value={academicYear} style={{ fontSize: '20px' }}>{`${academicYear}-${academicYear%100 + 1}`}</option>
                            {index < academicYears.length - 1 && <hr />}
                        </React.Fragment>
                    ))
                }
            </select>
        </div>
    )
}

export default AcademicYearDropdown
