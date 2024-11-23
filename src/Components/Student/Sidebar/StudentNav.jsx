import React, { useEffect, useState, useContext } from "react";
import "./Nav.css";
import WebFont from "webfontloader";
import { useSelector, useDispatch } from "react-redux";
import { schooldata } from "../../../slices/school";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { MenuContext } from "../../../context/Menu/MenuContext";
import BurgerMenuIcon from "../../../icons/BurgerMenuIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import NotificationModal from "../Notification/NotificationModal";
import schoolService from "../../../services/school.service";
import Logout from "./Logout";
import { Avatar, ClickAwayListener } from "@mui/material";
import { getImageUrl } from "../../../slices/image";
import checkUserType from "@/common/checkUserType";

function StudentNav() {
  const mycontext = useContext(MenuContext);
  //toggle menu
  const [toggleMenu, setToggleMenu] = useState(false);
  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  //rest of state
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { user: currentUser } = useSelector((state) => state.user);
  const initial = currentUser?.firstname[0].toUpperCase();
  const code = currentUser.school_code;
  const [named, setNamed] = useState(currentUser.firstname);
  const [ring, setRing] = useState(true);
  const [bellColor, setBellColor] = useState("#6755D9");
  const [logo, setLogo] = useState();
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image);

  const { schooldetail: userSchool } = useSelector(
    (state) => state.schooldetail
  );




  //Get image
  useEffect(() => {
    if (currentUser.image) {
      dispatch(getImageUrl({ path: currentUser.image }));
    }
  }, []);

  const messages = [];

  useEffect(() => {
    if (code) {
      dispatch(schooldata({ code }))
        .unwrap()
        .then((res) => {
          setNamed(res.schoolname);

        })
        .catch(() => {});
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
          console.log(url);
          setLogo(url);
          console.log("successfully fetched image");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [code]);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Rubik", "Poppins"],
      },
    });
  }, []);

  window.addEventListener("scroll", (event) => {
    if (toggleMenu) {
      setToggleMenu(false);
    }
  });

  const toggleNavs = () => {
    mycontext.setIsMenuOpen(!mycontext.isMenuOpen);
  };

  const handleonclick = () => {
    setTimeout(() => {
      setToggleMenu(false);
    }, 1);
  };



  return (
    <div className={styles.studentnav}>
      <button onClick={toggleNavs} className="sidebarbtn">
        <BurgerMenuIcon />
      </button>

      <div className={styles.stdnavDiv1}>
        <img className={styles.navimg} src={logo} alt="logo" />
      </div>

      <p className={styles.navp}>{schooldata.school_name}</p>
      <div className={styles.stdnavDiv2}></div>
      <p className={styles.navp2}>Powered By PowerEdu</p>
      {(toggleMenu || screenWidth > 850) && (
        //modal
        <ClickAwayListener onClickAway={handleonclick}>
          <div className={styles.collapsedNav}>
            <Logout />
            {userSchool.view_performance_button && (
              <>
                <hr className={styles.first_hr} />
                <button className={styles.colNavbtn} onClick={toggleNav}>
                  View Performance Analytics
                </button>
              </>
            )}
            <hr />
            {screenWidth > 850 && (
              <NotificationModal bellColor={bellColor} ring={ring} />
            )}
            <div className={styles.link}>
              <Link to="/student/home/profile" onClick={toggleNav}>
                {/* {console.log(image)} */}
                {image ? (
                  <Avatar
                    alt={currentUser?.firstname.toUpperCase()}
                    src={image}
                  />
                ) : (
                  <p className={styles.linkp}>{initial}</p>
                )}
              </Link>
            </div>
          </div>
        </ClickAwayListener>
      )}

      {screenWidth <= 850 && (
        <div className={styles.navbarbtn_small_screen}>
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
            {image ? (
              <Avatar alt={currentUser?.firstname.toUpperCase()} src={image} />
            ) : (
              <p className={styles.linkp}>{initial}</p>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentNav;
