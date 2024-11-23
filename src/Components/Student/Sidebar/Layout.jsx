import React from 'react';
import './Layout.css'
import Sidebar from "./Sidebar";
import Nav from "./StudentNav";

function Layout(props) {
    return (
        <div>
            <div className='layout__main'>
                <div className='layout__leftSide'>
                    <Sidebar history={props.history} />
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