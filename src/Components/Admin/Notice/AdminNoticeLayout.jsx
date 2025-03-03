import React, { useState } from 'react';
import AdminNotice from './AdminNotice';
import ClassNotice from '../ClassNotice/ClassNotice';
import { useSelector } from 'react-redux';
import { selectThemeProperties } from '@/slices/theme';

const AdminNoticeLayout = () => {
     const themeProperties = useSelector(selectThemeProperties);
     const [showAdminNotice, setShowAdminNotice] = useState(true);

     const toggleNotice = () => {
          setShowAdminNotice(!showAdminNotice);
     };

     return (
          <div>
               <button onClick={toggleNotice}>
                    {showAdminNotice ? 'Show Class Notice' : 'Show Admin Notice'}
               </button>
               {showAdminNotice ? <AdminNotice /> : <ClassNotice />}
          </div>
     );
};

export default AdminNoticeLayout;