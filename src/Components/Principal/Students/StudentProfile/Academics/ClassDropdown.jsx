import React from 'react'

function ClassDropdown() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div style={{margin:'10px 25px'}}>
            <select value={age} onChange={handleChange} style={{borderRadius:'5px', fontSize:'17px',padding:'6px 10px',color:'#414141'}}>
                <option value="" hidden>Class</option>
                <option value={10} style={{fontSize:'20px'}}>Date 1</option><hr/>
                <option value={20} style={{fontSize:'20px'}}>Date 2</option><hr/>
                <option value={30} style={{fontSize:'20px'}}>Date 3</option><hr/>
                <option value={40} style={{fontSize:'20px'}}>Date 4</option>
            </select>
        </div>
    )
}

export default ClassDropdown
