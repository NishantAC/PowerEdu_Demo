import React from 'react';
import './Layout.css'
import PrincipalSidebar from "./PrincipalSidebar";
import Nav from "./PrincipalNav";

function Layout(props) {
    return (
        <div>
            <div className="mainpage">
                <div className='layout__leftSide'>
                    <PrincipalSidebar history={props.history} />
                </div>
                <div className="Principallayout">
                    <Nav />
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Layout;