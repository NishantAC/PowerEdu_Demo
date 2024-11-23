import React, { useEffect, useState, useContext } from "react";
import "./TeacherSidebar.css";
import styled from "styled-components";
import SidebarItems from "./SidebarItems";
import { Link } from "react-router-dom";
import schoolService from '../../../services/school.service'
// import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
// import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
// import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
// import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
// import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
// import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
// import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuContext } from "../../../context/Menu/MenuContext";
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import LogoutIcon from "../../../icons/LogoutIcon";
import HomeIcon from "../../../icons/HomeIcon";
import SubjectsIcon from "../../../icons/SubjectsIcon";
import AssignmentIcon from "../../../icons/AssignmentIcon";
import TeachersIcon from "../../../icons/TeachersIcon";
import MailIcon from "../../../icons/MailIcon";
import ExamIcon from "../../../icons/ExamIcon";
import NoticesIcon from "../../../icons/NoticesIcon";

function TeacherSidebar(props, { defaultActive }) {
  const mycontext = useContext(MenuContext);
  const location = props.history.location;
  const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
  const lastActiveIndex = Number(lastActiveIndexString);
  const [activeIndex, setActiveIndex] = useState(
    lastActiveIndex || defaultActive
  );
  const [logo, setLogo] = useState();


  const user = JSON.parse(localStorage.getItem('user'))
  const code = user?.schoolcode

  useEffect(() => {
    schoolService.getSchoolLogo(code)
    .then((result) => {
      const url = URL.createObjectURL(new Blob([result], {type: "image/jpeg"}))
      console.log(url)
      setLogo(url);
      console.log('successfully fetched image')
    }).catch((error) => {
      console.log(error)
    })
  },[])

  // const icons = [
  //   DashboardRoundedIcon,
  //   PeopleAltTwoToneIcon,
  //   EventNoteRoundedIcon,
  //   FeedOutlinedIcon,
  //   MenuBookRoundedIcon,
  //   EmailRoundedIcon,
  //   NotificationsRoundedIcon,
  // ];
  const icons = [
    HomeIcon,
    TeachersIcon,
    AssignmentIcon,  
    ExamIcon,
    SubjectsIcon,
    MailIcon,  
    NoticesIcon,
];
  function changeActiveIndex(newIndex) {
    localStorage.setItem("lastActiveIndex", newIndex);
    setActiveIndex(newIndex);
  }

  function getPath(path) {
    if (path.charAt(0) !== "/") {
      return "/" + path;
    }
    return path;
  }

  useEffect(() => {
    const activeItem = SidebarItems.findIndex(
      (item) => getPath(item.route) === getPath(location.pathname)
    );
    changeActiveIndex(activeItem);
  }, [location]);

  const toggleNav = () => {
    mycontext.setMenu(true);
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

  const offMenu = () => {
    mycontext.setIsMenuOpen(false);
  };
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false);
  const handleOpen =() => {value && !open ? setOpen(true) : setOpen(true) || handleClose()}
  const handleClose = () => setOpen(false);

 
  return (
    <div className="sidebar">
      {(mycontext.Menu || screenWidth > 720) && (
        <>
          <SidebarParent className="sbp">
            <div className="sidebardiv">
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    margin: "auto",
                    height: "auto",
                    width: "auto",
                    overflow: "hidden",
                    paddingTop: "29px",
                    textAlign: "center",
                  }}
                >
                  <img
                    style={{
                      maxHeight: "100%",
                      width: "70px",
                      overflow: "hidden",
                      margin: "auto",
                      // borderRadius: "50%",
                    }}
                    src={logo}
                    alt="logo"
                  />
                </div>
                <br />
                <p
                  style={{
                    fontFamily: "Rubik",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: "#FFFFFF",
                  }}
                >
                  Company
                </p>
              </div>
              <div style={{ overflowY: "auto", height: "70%" }}>
              {SidebarItems.map((item, index) => {
                const Icon = icons[index];
                return (
                  <Link to={item.route} key={item.name}>
                    <SidebarItem
                      key={item.name}
                      active={index === activeIndex}
                      onClick={offMenu}
                      className={item.child.length != 0 && item.name === value && open ? "styleexam" : "sidebaritem"}
                    >
                       <p style={{ margin: "auto 0px auto 12px" }}>
                          <Icon style={{ transform: 'scaleY(1.3) scaleX(1.2)' }} />
                        </p>
                      &nbsp;
                      {item.child.length === 0 ? <p style={{ margin: "auto auto auto 2px" }} onClick={handleClose}>{item.name}</p> :
                      <div>
                        <p style={{ margin: "auto auto auto 2px" }} onClick={() => (setValue(item.name) & handleOpen())}>{item.name}</p>
                      {open ? 
                        <div open={open} onClose={handleClose} style={{height:'80%', position:'absolute',left:'0px',background:'linear-gradient(205.44deg, #30313C 16.12%, rgba(37, 38, 52, 0.86) 83.88%)'}}>
                          {item.name === value ? item.child.map((childItem, jdx)=>(
                          <Link to={childItem.route} key={jdx}>
                            <div key={jdx} style={{paddingLeft:'12px',paddingTop:'0',marginTop:'-22px', borderBottom:'1px solid white',color:'white',fontSize:'16px'}}>
                              <span key={childItem.name} >{childItem.name}</span>
                            </div>
                          </Link>
                        )) : ""}
                        </div> 
                        
                      : ""}
                      </div>
              }

                    </SidebarItem>
                  </Link>
                );
              })}
              </div>
            </div>
            
            <div
            className="logoutbtn"
              style={{
                backgroundColor: "#FF2934",
                height: "55px",
                width: "140px",
                display: "flex",
                alignItems: "center",
                position: "fixed",
                bottom: 0,
              }}
            >
              <p style={{ color: "white", margin: "auto" }}>
                {/* <LogoutRoundedIcon /> */}
                 <LogoutIcon />
              </p>
              <a href="#" style={{ color: "white", fontFamily: "Rubik", fontStyle: "normal", fontWeight: "normal", fontSize: "14px", marginRight: "25px" }}>Logout</a>
              
            </div>
          </SidebarParent>
        </>
      )}
      {/* {!mycontext.Menu ? (
        <button onClick={toggleNav} className="sidebarbtn">
          <MenuIcon style={{ verticalAlign: "middle", color: "#035473" }} />
        </button>
      ) : (
        ""
      )} */}
    </div>
  );
}

export default TeacherSidebar;

const SidebarParent = styled.div`
  background: linear-gradient(
    179.21deg,
    rgba(4, 5, 19, 0.85) 6.55%,
    rgba(4, 5, 19, 0.8) 35.17%,
    rgba(4, 5, 19, 0.77) 64.84%,
    rgba(4, 5, 19, 0.85) 99.32%
  );
  
   
  height:100%;
  width: 140px;
  z-index: 4;
  position:fixed;
  a {
    text-decoration: none;
    font-family: Roboto;
    font-style: normal;
    font-weight:400;
    font-size: 16px;
    line-height: 28px;
    color: #000000;
    padding-left: 10px;
  }
  & > div {
    width: 145px;
    height:134vh;
  }
`;

const SidebarItem = styled.div`
transition: all 0.4s ease-in-out;
 
background: ${(props) =>
  props.active
    ? "linear-gradient(180deg, #585961 0%, rgba(88, 89, 97, 0.37) 100%); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.33);"
    : ""};
height: 32px;
width: 140px;
display: flex;
align-items: center;
p {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  font-weight:400;
  line-height: 21px;
  color: #ffffff;
  display: inline-block;
}

&:hover {
  cursor: pointer;
}

&:hover:not(:first-child) {
  background: linear-gradient(
    180deg,
    #585961 0%,
    rgba(88, 89, 97, 0.37) 100%
  );
}
`;
