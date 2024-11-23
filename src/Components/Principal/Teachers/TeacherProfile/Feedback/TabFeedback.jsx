import React from 'react';
import './TabFeedback.css';
import OverallPerformance from './OverallPerformance';
import SkillsRating from './SkillsRating'
import AverageRating from './AverageRating';
import OverallGrade from './OverallGrade'

function TabFeedback() {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {setAge(event.target.value);};
    return (
        <div>
            <div className="prncpltchrfeedbackfilters">
                <h4 style={{margin:'auto 10px auto 0px'}}>Filters:-</h4>
                <select value={age} onChange={handleChange} style={{borderRadius:'5px', fontSize:'17px',padding:'6px 10px',color:'#414141',width:'120px'}}>
                    <option value="" hidden>Class</option>
                    <option value={10} style={{fontSize:'20px'}}>5A</option><hr/>
                    <option value={20} style={{fontSize:'20px'}}>6B</option><hr/>
                    <option value={30} style={{fontSize:'20px'}}>7C</option><hr/>
                    <option value={40} style={{fontSize:'20px'}}>8D</option>
                </select>
                <select value={age} onChange={handleChange} style={{borderRadius:'5px', fontSize:'17px',padding:'6px 10px',color:'#414141',width:'120px'}}>
                    <option value="" hidden>Year</option>
                    <option value={10} style={{fontSize:'20px'}}>2018</option><hr/>
                    <option value={20} style={{fontSize:'20px'}}>2019</option><hr/>
                    <option value={30} style={{fontSize:'20px'}}>2020</option><hr/>
                    <option value={40} style={{fontSize:'20px'}}>2021</option>
                </select>
                <button className="academicsapplybtn">Apply</button>
            </div>
            <div style={{display:'flex',height:'250px'}}>
                <OverallPerformance/>
                <SkillsRating/>
            </div>
            <div style={{display:'flex',height:'250px',marginTop:'20px'}}>
                <AverageRating/>
                <OverallGrade/>
            </div>
        </div>
    )
}

export default TabFeedback
