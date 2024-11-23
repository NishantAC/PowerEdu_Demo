import React, { useEffect, useState } from 'react';
import './Nav.css'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function AccountNav(props) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const toggleNav = () => {
    setToggleMenu(!toggleMenu);

  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  window.addEventListener("scroll", (event) => {
    if (toggleMenu) {
      setToggleMenu(false);
    }
  });
  const handleonclick = () => {
    setToggleMenu(false)
  };
  return (
    <div className="accountsnav">
      <div style={{ height: 'auto', width: 'auto', overflow: 'hidden', padding: '18px' }}>
        <img style={{ maxHeight: '100%', width: '91px', overflow: 'hidden', margin: 'auto', marginRight: '10px' }} src="https://i.ibb.co/6mNnF3y/preview.jpg" alt="logo" />
      </div>
      <p style={{ marginLeft: '43px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '500', fontSize: '25px', lineHeight: '37px', color: '#000000' }}>Name</p>
      <div style={{ height: '40px', marginLeft: '25px', borderRight: '1px solid #000000' }}></div>
      <p style={{ marginLeft: '21px', marginRight: '20px', fontFamily: 'Roboto', fontStyle: 'italic', fontWeight: '300', fontSize: '18px', lineHeight: '21px', color: '#000000' }}>Powered By Company</p>
      {(toggleMenu || screenWidth > 850) && (
        <div className="collapsed-nav">
          <NotificationsRoundedIcon className="notificationicon" style={{ fontSize: '32px' }} />
          <hr />
          <p>A</p>
        </div>
      )}
      <button onClick={toggleNav} className="navbarbtn" >
        <AccountCircleIcon className="navicon" style={{ fontSize: '34px', verticalAlign: "top", color: "grey" }} />
      </button>
    </div>
  );
}

export default AccountNav;