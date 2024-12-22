import React, { useEffect } from 'react';
import SideBar from './SideBar';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectThemeProperties } from '@/slices/theme';
function Layout(props) {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [isOnMail, setIsOnMail] = React.useState(false);
    const themeProperties = useSelector(selectThemeProperties);
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
            <div className=' flex gap-2 pb-0 m-0 px-2 max-md:px-2 max-h-screen'>
                <div className='z-[10] h-screen py-2'>
                    <SideBar/>
                </div>
                <div className=' flex flex-col flex-1 overflow-x-hidden gap-3 my-2 z-[0] rounded-[20px]'
                style={{ backgroundColor: themeProperties.backgroundRight  , color: themeProperties.textColor }}
                >
                    <div className='z-50 h-[10vh] '>
                        <Nav />
                    </div>
                    <div className="flex-1 overflow-y-scroll">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;


// ! Copyright (c) 2024 Aquaria Core Pvt. Ltd.