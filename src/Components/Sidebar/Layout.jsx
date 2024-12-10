import React, { useEffect } from 'react';
import SideBar from './SideBar';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Layout(props) {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [isOnMail, setIsOnMail] = React.useState(false);
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        return;
    }, [user]);

    useEffect(() => {
        if (window.location.pathname.includes('mail')) {
            setIsOnMail(true);
        } else {
            setIsOnMail(false);
        }
    }, [window.location.pathname]);




    return (
        <div>
            <div className=' flex gap-7 pb-0 m-0 px-2 max-md:px-2 max-h-screen'>
                <div className='z-50'>
                    <SideBar/>
                </div>
                <div className=' flex flex-col flex-1 overflow-x-hidden overflow-y- gap-4 py-2'>
                    <div className='z-50 h-[10vh] '>
                        <Nav />
                    </div>
                    <div className="h-[90vh] overflow-y-scroll">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;


// ! Copyright (c) 2024 Aquaria Core Pvt. Ltd.