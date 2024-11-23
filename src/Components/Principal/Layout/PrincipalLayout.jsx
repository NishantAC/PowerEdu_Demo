import React,{useContext} from 'react';
import { MenuContext } from '../../../context/Menu/MenuContext';
import Routes from '../Sidebar/Routes'

function PrincipalLayout() {
    const mycontext = useContext(MenuContext);
    return (
        <div>
            <Routes/>
        </div>
    )
}

export default PrincipalLayout
