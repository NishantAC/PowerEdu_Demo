import React, { useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';


const NoticeDropDown = ({ user, fetchClassNotices,filterClass, setFilterClass}) => {
    const dispatch = useDispatch();
    const noticeDropdownclasses = useSelector(state => state.classnotice.noticeDropdownclasses);



    const handleDropdownChange = (event) => {
        setFilterClass(event.target.value)
        fetchClassNotices(event.target.value);
        
    };

    useEffect(() => {
        
    }, [filterClass]);

    return (
        <FormControl sx={{  minWidth: 120, marginTop: {xs:"10px",md:"0"}, marginRight: "8px", scrollBehavior: "smooth" }} size="small">
            <InputLabel id="class" style={{
                marginTop: "-2px",
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "20px",
                color: "#214DF9",
                background: "#fff",
                padding: "0px 4px"
            }}>Class
            </InputLabel>
            <Select
                labelId="class"
                id="Classid"
                name="Classid"
                value={filterClass}
                onChange={handleDropdownChange}
            >
                {noticeDropdownclasses?.map((c, index) => {
                    return (<MenuItem key={index} value={c} >
                        <Typography variant="body1" style={{
                            fontFamily: "Roboto",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: '16px'
                        }}>{c}</Typography></MenuItem>)
                })}
            </Select>
        </FormControl>
    )
}

export default NoticeDropDown

