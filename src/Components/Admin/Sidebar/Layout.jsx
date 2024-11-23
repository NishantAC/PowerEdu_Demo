import React, { useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import Nav from '@/components/teacher/Sidebar/TeacherNav';
import { useNavigate } from 'react-router-dom';

function Layout(props) {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        return;
    }, [user]);

    return (
        <div>
            <div className='layout__main'>
                <div className='layout__leftSide'>
                    <AdminSidebar history={props.history} location = {props.location}/>
                </div>
                <div className="layout__rightSide">
                    <Nav />
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Layout;