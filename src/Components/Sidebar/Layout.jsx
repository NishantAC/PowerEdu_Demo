import React, { useEffect } from 'react';
import SideBar from './SideBar';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Layout(props) {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        return;
    }, [user]);

    return (
        <div>
            <div className=' flex gap-8 pb-0 m-0 px-2 max-md:px-2 max-h-screen'>
                <div className='z-50'>
                    <SideBar/>
                </div>
                <div className=' flex flex-col flex-1 overflow-x-hidden overflow-y-scroll'>
                    <div className='z-50 '>
                        <Nav />
                    </div>
                    <div className=" h pb-2 flex-1">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;


// ! Copyright (c) 2024 Aquaria Core Pvt. Ltd.