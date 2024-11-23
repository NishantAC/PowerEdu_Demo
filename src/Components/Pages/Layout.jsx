import React from 'react'
import {Outlet} from 'react-router-dom'
import AdminSidebar from '../Sidebar/AdminSidebar'
import LayoutA from '../Sidebar/Layout'
const Layout = () => {
  return (
     <div className='w-screen h-screen'>
     <LayoutA/>
     </div>
  )
}

export default Layout