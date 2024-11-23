import React, { useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getNoticeDropdownClasses } from '../../../slices/classnotice';


const NoticeDropDown = ({ user, fetchClassNotices,filterClass, setFilterClass}) => {
    const dispatch = useDispatch();
    const noticeDropdownclasses = useSelector(state => state.classnotice.noticeDropdownclasses);

useEffect(()=>{
dispatch(getNoticeDropdownClasses({school_code:user?.schoolcode})).then((result) => {
setFilterClass(result.payload.data.class_codes[0])
fetchClassNotices(result.payload.data.class_codes[0])
})
},[])

    const handleDropdownChange = (event) => {
        setFilterClass(event.target.value)
        fetchClassNotices(event.target.value);
        console.log(event.target.value);
    };

    useEffect(() => {
        console.log('filterClass changed:', filterClass);
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

