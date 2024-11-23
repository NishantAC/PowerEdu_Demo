import React from 'react';
import './Layout.css';
import TeacherSidebar from './TeacherSidebar';
import Nav from './TeacherNav';

function Layout(props) {
    return (
        <div>
            <div className='layout__main'>
                <div className='layout__leftSide'>
                    <TeacherSidebar history={props.history} />
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