import React from "react";
import Event from "./Event";

const SchoolEvents = ({ setOpen, setHoliday, schoolEvents,setEditData,getEvents }) => {
    const handleOpen = () => {
        setOpen(true);
        setHoliday(false);
    };

   
    const handleEdit = (data)=>{
        setEditData(data)
        setOpen(true)
        setHoliday(false)
    }

    return (
        <div style={{ width: "100%" }}>
            <div style={{ display: 'flex', background: "#F9F9F9" }}>
                <h3>Events&nbsp;&nbsp;<span style={{ background: '#FA3CAD', color: 'white', padding: '4px 8px', borderRadius: '5px', fontSize: '15px' }}>{schoolEvents.length}</span></h3>
                <button className='addholidaybtn' onClick={handleOpen}>+</button>
            </div>
            <div>
                {/* Map through schoolEvents and render Event component for each event */}
                {schoolEvents.map((event, index) => (
                    <Event key={index} event={event} handleEdit={handleEdit} getEvents={getEvents}/>
                ))}
            </div>
        </div>
    );
};

export default SchoolEvents;
