import React, { useEffect, useState, useContext, useRef } from "react";
import schoolService from '../../../services/school.service';
import styles from "./Nav.module.css";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import NotificationModal from "../Notification/NotificationModal";
import MailIcon from '@mui/icons-material/Mail';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Avatar from '@mui/material/Avatar';
import BurgerMenuIcon from '../../../icons/BurgerMenuIcon';
import { MenuContext } from '../../../context/Menu/MenuContext';
import { Link } from "react-router-dom";
import Logout from "../../Student/Sidebar/Logout";
import { Badge, Box, ClickAwayListener } from "@mui/material";
import { getImageUrl } from "../../../slices/image";
import { useDispatch, useSelector } from "react-redux";

function TeacherNav(props) {
  const [data, setData] = useState({});
  const [newMail, setNewMail] = useState(true);
  const [ring, setRing] = useState(true);
  const [bellColor, setBellColor] = useState("#6755D9");
  const [logo, setLogo] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const code = user?.schoolcode;
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image);

  useEffect(() => {
    if (user.image) {
      dispatch(getImageUrl({ path: user.image }));
    }
  }, []);

  const messages = [];
  useEffect(() => {
    schoolService.getSchoolData(code)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (messages.length < 1) {
      setRing(false);
      setBellColor("#6755D9");
    } else {
      setRing(true);
      setBellColor("red");
    }

    schoolService.getSchoolLogo(code)
      .then((result) => {
        const url = URL.createObjectURL(new Blob([result], { type: "image/jpeg" }));
        setLogo(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const mycontext = useContext(MenuContext);
  const [toggleMenu, setToggleMenu] = useState(false);
  const toggleNav = () => {
    setToggleMenu((toggleMenu) => !toggleMenu);
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
    setTimeout(() => {
      setToggleMenu(false);
    }, 1)
  };

  const toggleNavs = () => {
    mycontext.setIsMenuOpen(!mycontext.isMenuOpen);
  };

  //const initial = user?.firstname[0].toUpperCase();
  const initial = 'Test'
  // const ref = useRef();

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       console.warn("calling");
  //       setTimeout(() => {
  //         setToggleMenu(false);
  //       })
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);
  
  
  const schooldata = JSON.parse(localStorage.getItem('school'))



  return (
    <div className={styles.studentnav}>
      <button onClick={toggleNavs} className="sidebarbtn">
        <BurgerMenuIcon />
      </button>

      <div className={styles.stdnavDiv1}>
        <img className={styles.navimg} src={logo} alt="logo" />
      </div>

      <p className={styles.navp}>{schooldata?.school_name ?? "School Name"}</p>
      <div className={styles.stdnavDiv2}></div>
      <p className={styles.navp2}>Powered By PowerEdu</p>
      {(toggleMenu || screenWidth > 850) &&
        //modal
        (//handel outside click
          <ClickAwayListener onClickAway={handleonclick}>
            <div className={styles.collapsedNav}>
              <Logout />
              {/* {console.log(data)} */}
              {data.view_performance_button && (
                <> <hr className={styles.first_hr} />
                  <button className={styles.colNavbtn} onClick={toggleNav}>
                    View Performance Analytics
                  </button></>
              )}
              <hr />
              {screenWidth > 850 && (
                <>
                  <Link className={styles.msg} to="/teacher/mail" >
                    {newMail ? (
                      <Box >
                        <Badge color={"error"} variant={"dot"}>
                          <EmailRoundedIcon
                            fontSize="large"
                            width="28"
                            htmlColor={"#6755D9"}
                          />
                        </Badge>
                      </Box>) : (<EmailRoundedIcon
                        fontSize="large"
                        width="28"
                        htmlColor={"#6755D9"}
                      />)}
                  </Link>
                  <NotificationModal bellColor={bellColor} ring={ring} />
                </>
              )}

              <Link className={styles.link} to="/teacher/home/profile" onClick={toggleNav}>
                {image ? <Avatar alt={user?.firstname} src={image} style={{ backgroundColor: '#5647b2' }} />
                  : <p className={styles.linkp}>{initial}</p>}
              </Link>
            </div>
          </ClickAwayListener>
        )
      }

      {
        screenWidth <= 850 && (
          <div className={styles.navbarbtn_small_screen}>

            <Link to="/teacher/mail" className={styles.msg}>
              {newMail ? (
                <Box>
                  <Badge color="error" variant="dot">
                    <EmailRoundedIcon
                      fontSize="large"
                      width="28"
                      color={bellColor}
                      active={true}
                      animate={ring}
                      className={styles.notificationicon} />
                  </Badge>
                </Box>) :
                (<EmailRoundedIcon
                  fontSize="large"
                  width="28"
                  color={bellColor}
                  active={true}
                  animate={ring}
                  className={styles.notificationicon} />)}
            </Link>

            <div className={styles.notifydiv2}>
              <NotificationModal
                fontSize="large"
                width="28"
                color={bellColor}
                active={true}
                animate={ring}
                className={styles.notificationicon}
              />
              {/* <span className={styles.counter} /> */}
            </div>

            <button onClick={toggleNav} className={styles.navbarbtn}>
              {image ? <Avatar alt={user?.firstname} src={image} style={{ backgroundColor: '#5647b2' }} />
                : <p className={styles.linkp}>{initial}</p>}
            </button>
          </div>
        )
      }
    </div >
  );
}

export default TeacherNav;
