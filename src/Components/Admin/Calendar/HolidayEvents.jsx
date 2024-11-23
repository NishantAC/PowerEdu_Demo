import React from "react";
import Event from "./Event";


const HolidayEvents = ({setOpen,setHoliday,holidayEvents,setEditData,getEvents}) => {

    const handleOpen = ()=>{
        setOpen(true)
        setHoliday(true)
    }

    const handleEdit = (data)=>{
        setEditData(data)
        setOpen(true)
        setHoliday(true)
    }

return(
    <div style={{width:"100%"}}>
         <div style={{display:'flex',background:"#F9F9F9"}}>
                    <h3>Holidays&nbsp;&nbsp;<span style={{background:'#FA3CAD',color:'white',padding:'4px 8px',borderRadius:'5px',fontSize:'15px'}}>{holidayEvents.length}</span></h3>
                    <button className='addholidaybtn' onClick={handleOpen}>+</button>
                </div>
        <div>
        {holidayEvents.map((event, index) => (
                    <Event key={index} event={event} handleEdit={handleEdit} getEvents={getEvents}/>
                ))}
        </div>
    </div>
)
}

export default HolidayEvents;