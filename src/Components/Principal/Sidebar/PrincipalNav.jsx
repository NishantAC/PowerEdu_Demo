import React, { useEffect, useState, useContext } from "react";
import "./Nav.css";
import styles from "./Nav.module.css";
import NotificationModal from "../Notification/NotificationModal";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import Avatar from "@mui/material/Avatar";
import { MenuContext } from "../../../context/Menu/MenuContext";
import schoolService from "../../../services/school.service";
import { Link } from "react-router-dom";
import BurgerMenuIcon from "../../../icons/BurgerMenuIcon";
import Logout from "../../Student/Sidebar/Logout";
import { Badge, Box, ClickAwayListener } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../../../slices/image";

function PrincipalNav(props) {
  const [data, setData] = useState({});
  const [ring, setRing] = useState(true);
  const [bellColor, setBellColor] = useState("#6755D9");
  const [logo, setLogo] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const code = user?.schoolcode;
  const [newMail, setNewMail] = useState(true);

  const dispatch = useDispatch();
  const image = useSelector((state) => state.image);

  useEffect(() => {
    if (user?.image) {
      dispatch(getImageUrl({ path: user.image }));
    }
  }, [dispatch, user]);

  const messages = [];
  useEffect(() => {
    schoolService
      .getSchoolData(code)
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

    schoolService
      .getSchoolLogo(code)
      .then((result) => {
        const url = URL.createObjectURL(
          new Blob([result], { type: "image/jpeg" })
        );
        setLogo(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [code]);

  const mycontext = useContext(MenuContext);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleAvatarClick = () => {
    setShowModal(!showModal); // Toggle modal visibility
  };

  const handleSchoolClick = () => {
    setShowModal(false);
    // Navigate to school section
    console.log("Navigating to school section...");
  };

  const handleLogoutClick = () => {
    setShowModal(false);
    console.log('Logout Clicked');
    // Add logout logic here
  };

  const handleOutsideClick = () => {
    setShowModal(false);
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

  const initial = user?.firstname[0].toUpperCase();

  const schooldata = JSON.parse(localStorage.getItem("school"));

  return (
    <div className={styles.studentnav}>
      <button onClick={() => mycontext.setIsMenuOpen(!mycontext.isMenuOpen)} className="sidebarbtn">
        <BurgerMenuIcon />
      </button>

      <div className={styles.stdnavDiv1}>
        <img className={styles.navimg} src={logo} alt="logi" />
      </div>

      <p className={styles.navp}>{schooldata?.school_name ?? "School Name"}</p>

      <div className={styles.stdnavDiv2}></div>
      <p className={styles.navp2}>Powered By PowerEdu</p>

      {(toggleMenu || screenWidth > 850) && (
        // Modal for profile actions
        <ClickAwayListener onClickAway={handleOutsideClick}>
          <div className={styles.collapsedNav}>
            <Logout />
            {data.view_performance_button && (
              <>
                <hr className={styles.first_hr} />
                <button className={styles.colNavbtn} onClick={toggleNav}>
                  View Performance Analytics
                </button>
              </>
            )}
            <hr />
            {screenWidth > 850 && (
              <>
                <Link to="/principal/mail" className={styles.msg}>
                  {newMail ? (
                    <Box>
                      <Badge color={"error"} variant={"dot"}>
                        <EmailRoundedIcon fontSize="large" width="28" htmlColor={"#6755D9"} />
                      </Badge>
                    </Box>
                  ) : (
                    <EmailRoundedIcon fontSize="large" width="28" htmlColor={"#6755D9"} />
                  )}
                </Link>
                <NotificationModal bellColor={bellColor} ring={ring} />
              </>
            )}

            {/* Profile Section */}
            <div className={styles.link} onClick={handleAvatarClick}>
              {image ? (
                <Avatar alt={user?.firstname} src={image} style={{ backgroundColor: '#5647b2' }} />
              ) : (
                <p className={styles.linkp}>{initial}</p>
              )}
            </div>

            {showModal && (
              <div className={styles.modal}>
                <div className={styles.modalOption} onClick={handleSchoolClick}>
                  School
                </div>
                <div className={styles.modalOption} onClick={handleLogoutClick}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </ClickAwayListener>
      )}

      {screenWidth <= 850 && (
        <div className={styles.navbarbtn_small_screen}>
          <Link to="/principal/mail" className={styles.msg}>
            {newMail ? (
              <Box>
                <Badge color="error" variant="dot">
                  <EmailRoundedIcon fontSize="large" width="28" color={bellColor} />
                </Badge>
              </Box>
            ) : (
              <EmailRoundedIcon fontSize="large" width="28" color={bellColor} />
            )}
          </Link>

          <div className={styles.notifydiv2}>
            <NotificationModal fontSize="large" width="28" color={bellColor} active={ring} />
          </div>
          <button onClick={handleAvatarClick} className={styles.navbarbtn}>
            {image ? (
              <Avatar alt={user?.firstname} src={image} style={{ backgroundColor: '#5647b2' }} />
            ) : (
              <p className={styles.linkp}>{initial}</p>
            )}
          </button>

          {showModal && (
            <div className={styles.modalSmallScreen}>
              {/* <div className={styles.modalOption} onClick={handleSchoolClick}>
                School
              </div> */}
              <div className={styles.modalOption} onClick={handleLogoutClick}>
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PrincipalNav;
