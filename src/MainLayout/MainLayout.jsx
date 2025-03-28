import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../Components/Sidebar/Layout';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <Layout navigate={navigate} location={location}>
        <Outlet />
      </Layout>
    </div>
  );
};

export default MainLayout;