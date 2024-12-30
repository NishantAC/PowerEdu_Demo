import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from "../teacher.module.css";
import { Avatar } from '@mui/material';


const TeacherProfileCard = () => {
    const { subjectteachers: teachers } = useSelector((state) => state.subjectteacher);
    
    return (
        <div className={style.teacherdiv}>
            {teachers?.map((row) => {
                return (
                    <div key={row.id} className={style.teacherdiv1}>
                        <div className={style.teacherdiv2}>
                            <Avatar
                                alt={row?.details?.firstname.toUpperCase()}
                                src={row?.profile_image}
                                sx={{ width: 80, height: 80 }}
                                className={style.teacherdiv2style}
                            />
                        </div>
                        <br />
                        <p className={style.para2}>
                            {row.details.firstname} {row.details.lastname}
                        </p>
                        <br />

                        <Link
                            to={{
                                pathname: '/principal/teachers',
                                overall: true,
                                tab: 0,
                                userId: row.user_id
                            }}
                            defaultValue={2}
                        >
                            <button type="submit" className="entermarksbtn">View Profile</button>
                        </Link>
                        <Link
                            to={{
                                pathname: '/principal/teachers',
                                overall: true,
                                tab: 1,
                                userId: row.user_id
                            }}
                            defaultValue={2}
                        >
                            <button type="submit" style={{ background: '#03fc49' }} className="entermarksbtn">View Attendance</button>
                        </Link>
                        <Link
                            to={{
                                pathname: '/principal/teachers',
                                overall: true,
                                tab: 2,
                                userId: row.user_id
                            }}
                            defaultValue={2}
                        >
                            <button type="submit" style={{ background: '#ed1cc3' }} className="entermarksbtn">Feedback</button>
                        </Link>
                    </div>
                );
            })}
        </div>
    )
}

export default TeacherProfileCard
