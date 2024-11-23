import React from 'react'

function Dropdown({data: { name, options, value, setValue }}) {
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div style={{margin:'10px 25px'}}>
            <select value={value} onChange={handleChange} style={{borderRadius:'5px', fontSize:'17px',padding:'6px 10px',color:'#414141'}}>
                <option value='' style={{ fontSize: '20px' }}>{name}</option>
                {options.length > 0 && <hr />}
                {
                    options.map((classItem, index) => (
                        
                        <React.Fragment key={index}>
                            <option value={classItem} style={{ fontSize: '20px' }}>{classItem}</option>
                            {index < options.length - 1 && <hr />}
                        </React.Fragment>
                    ))
                }
            </select>
        </div>
    )
}

export default Dropdown
