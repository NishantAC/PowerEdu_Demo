import React, { useContext, useRef } from "react";
import styles from './AdminNotice.module.css'
import { MenuContext } from "../../../context/Menu/MenuContext";
import Avatar from "@mui/material/Avatar";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import SubjectTeacherService from "../../../services/subjectteacher.service";
import ClassNoticeService from "../../../services/classnotice.service";
import schoolService from "../../../services/school.service";
import principalService from "../../../services/principal.service";
import Readmore from "../../Student/Home/Readmore";
import { FaDownload } from "react-icons/fa6";
import PrincipalDeleteNotice from "./PrincipalDeleteNotice";
import PrincipalAddNotice from "./PrincipalAddNotice";
import EditNotice from "./EditNotice";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NoticeDropDown from "../../teacher/Notice/NoticeDropDown";
import { Box } from "@mui/material";
import { getDropdownClasses } from "../../../slices/principal";
import AddPrincipalMsg from "./AddPrincipalMsg";

export default function AdminNotice() {
  const mycontext = useContext(MenuContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const code = user?.schoolcode;
  const [principalMsg, setPrincipalMsg] = useState({});
  // const allNotices = useRef([]);
  const [allNotices, setAllNotices] = useState()
  const [type, setType] = useState("");
  const [classIds, setClassIds] = useState([]);
  const [logo, setLogo] = useState();
  const [active, setActive] = useState(0);
  const { classes } = useSelector((state) => state.principal);
  const [filterClass, setFilterClass] = React.useState("");



  // console.table(allNotices)

  // useEffect(() => {

  // }, [principalMsg])

  useEffect(() => {
    dispatch(getDropdownClasses({ schoolcode: user?.schoolcode }));
  }, []);


  const classFunc = () => {
    setType("class_notices");
    setActive(0);
  }

  const schoolFunc = () => {
    setType("overall");
    setActive(1);
  }

  useEffect(() => {
    fetchAllNotices()
    fetchPrincipalMsg();
    getPhoto();
  }, []);

  //fetch class notice and overall
  const fetchClassNotices = (cls) => {
    const body = { school_code: user?.schoolcode, class_code: cls };
    ClassNoticeService.getClassNotices(body)
      .then((res) => {
        setAllNotices(res.data)
        classFunc()
      })
      .catch((err) => console.error(err));
  };

  const fetchAllNotices = () => {
    const body = { school_code: user?.schoolcode };
    ClassNoticeService.getAllNotices(body)
      .then((res) => {
        setAllNotices(res.data)
        schoolFunc()
      })
      .catch((err) => console.error(err));
  };

  //fetch principal msg
  const fetchPrincipalMsg = () => {
    principalService
      .getPrincipalMessage({ school_code: user?.schoolcode })
      .then((res) => {
        setPrincipalMsg(res);
      })
      .catch((err) =>
        console.log("Problem in TeacherNotice :: fetchPrincipalMsg() => ", err)
      );
  };

  const getPhoto = () => {
    principalService.getPrincipalPhoto({ "schoolcode": code })
      .then((result) => {
        const url = URL.createObjectURL(new Blob([result], { type: "image/jpeg" }))
        // console.log(url)
        setLogo(url);
        // console.log('successfully fetched image')
      }).catch((error) => {
        console.log(error)
      })
  }

  const handleDownloadButton = async (event, key) => {
    event.preventDefault()
    ClassNoticeService.getPdf({ key: key })
      .then(async (response) => {
        // console.log(response)
        const contentDisposition = response.headers['content-disposition'];
        const match = contentDisposition.match(/filename="(.+)"/);
        const fetchedFilename = match ? match[1] : 'file.pdf';
        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, fetchedFilename);
      }).catch((error) => {
        console.log({ error: error, message: "error in handleDownloadButton" })
      })
  }

  return (
    <div
      onClick={mycontext.offMenu}
      onScroll={mycontext.offMenu}
      className={styles.main}
    >
      <div style={{ display: "flex" }}>
        <p className={styles.heading}>
          Home &gt;
          <b>
            {" "}
            <u>Notice</u>
          </b>
        </p>
        {/* <Box sx={{ marginLeft: "auto", display: 'flex', flexDirection: { md: 'row', xs: 'column-reverse'} }}>
          <span>
            <PrincipalAddNotice
            classes={classes}
               user={user}
              classFunc={classFunc}
              schoolFunc={schoolFunc}
              fetchClassNotices={fetchClassNotices}
              fetchAllNotices={fetchAllNotices}
            />
          </span>
        </Box> */}
      </div>

      <div className={styles.noticediv}>

        <div className={styles.noticedivD1}>
          <div className={styles.clas}>
            <p className={styles.head}>Notice</p>
            <div className={styles.button}>
            {active == 0 && <NoticeDropDown
             user={user}
             fetchClassNotices={fetchClassNotices}
             classFunc={classFunc}
             setFilterClass={setFilterClass}
             filterClass={filterClass}
          />}
              <button autoFocus onClick={classFunc} className={`${styles.noticebtn} ${(active == 0) ? styles.noticebtnfocus : ''}`}>Class</button>
              <button onClick={fetchAllNotices} className={`${styles.noticebtn} ${(active == 1) ? styles.noticebtnfocus : ''}`}>School</button>
            </div>
          </div>

          <div className={styles.area}>
            {allNotices?.map((row) => (
              <div style={{ display: "flex", margin: "0", width: "100%" }} >
                <div style={{ width: '80%' }}>
                  <p>{row?.date?.split("-").reverse().join("-")}</p>
                  <p>{row.title}</p>
                  <p>  <Readmore quote={row.description} wordLength={150} underline={true} /></p>
                  {/* <NoticeDescription text={row.details} />*/}
                </div>
                {/* {console.table(row)} */}
                <div style={{ width: "20%", paddingLeft: "100px" }}>
                  {row?.file_url && <a onClick={event => handleDownloadButton(event, row.file_url)} href="your_download_link">
                    <FaDownload />
                  </a>
                  }
                  {/*if createdby and userid is same then permission to delete*/}
                  {row?.created_by == user?.id && <a  >
                    <PrincipalDeleteNotice
                      title={row.title} id={row.id}
                      type={type}
                      classIds={classIds}
                      fetchNotices={active == 0 ? fetchClassNotices : fetchAllNotices}
                      setType={setType}
                      filterClass={filterClass} />
                  </a>}
                  <p>{row?.class_code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*Principle*/}
        {/* <div className={styles.noticedivD2}>
          <div
            className={styles.principal}
          >
            <div>
              <p>
                Principal Message
              </p>
            </div>
            <div style={{display:"flex"}}>
              <AddPrincipalMsg fetchPrincipalMsg={fetchPrincipalMsg} getPhoto={getPhoto} user={user}/>
              <EditNotice fetchPrincipalMsg={fetchPrincipalMsg} getPhoto={getPhoto} initialData={principalMsg} schoolcode={code}/>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
