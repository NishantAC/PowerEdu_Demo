import React, { useContext, useRef } from "react";
import styles from "./TeacherNotice.module.css";
import { MenuContext } from "../../../context/Menu/MenuContext";
import Avatar from "@mui/material/Avatar";
import AddNoticeModal from "./AddNoticeModal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import SubjectTeacherService from "../../../services/subjectteacher.service";
import ClassNoticeService from "../../../services/classnotice.service";
// import { principaldata } from "../../../slices/principal";
import schoolService from "../../../services/school.service";
import principalService from "../../../services/principal.service";
import Readmore from "../../Student/Home/Readmore";
import NoticeDescription from "../../Student/Notice/noticeDescription";
import { FaTrash } from "react-icons/fa6";

import DeleteNoticeModal from "./DeleteNoticeModel";
import NoticeDropDown from "./NoticeDropDown";
import { Box } from "@mui/material";

export default function TeacherNotice() {
  const mycontext = useContext(MenuContext);
  const user = useSelector((state) => state.auth.user);
  const [principalMsg, setPrincipalMsg] = useState({});
  const [allNotices, setAllNotices] = useState();
  const [active, setActive] = useState(0);

  console.log('=>' ,user)

  const classFunc = () => {
    setActive(0);
  }

  const schoolFunc = () => {
    setActive(1);
  }


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

  useEffect(()=>{
    fetchPrincipalMsg()
    fetchAllNotices()
  },[])

  const handleDownloadButton = async (event, key) => {
    event.preventDefault()
    ClassNoticeService.getPdf({ key: key })
      .then(async (response) => {
        console.log(response)
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
        <Box sx={{ marginLeft: "auto", display: 'flex', flexDirection: { md: 'row', xs: 'column-reverse'} }}>
          <NoticeDropDown
            user={user}
            fetchClassNotices={fetchClassNotices}
            fetchAllNotices={fetchAllNotices}
            classFunc={classFunc}
          />
          <span >
            <AddNoticeModal
              user={user}
              classFunc={classFunc}
              schoolFunc={schoolFunc}
              fetchClassNotices={fetchClassNotices}
              fetchAllNotices={fetchAllNotices}
            />
          </span>
        </Box>
      </div>

      <div className={styles.noticediv}>

        <div className={styles.noticedivD1}>
          <div className={styles.clas}>
            <p className={styles.head}>Notice</p>
            <div className={styles.button}>
              <button autoFocus onClick={classFunc} className={`${styles.noticebtn} ${(active == 0) ? styles.noticebtnfocus : ''}`}>Class</button>
              <button onClick={schoolFunc} className={`${styles.noticebtn} ${(active == 1) ? styles.noticebtnfocus : ''}`}>Overall</button>
            </div>
          </div>

          <div className={styles.area}>
            {allNotices?.map((notice) => (
              <div key={notice.id} style={{ display: "flex" }} >
                <div style={{ width: '95%', margin: "0" }}>
                  <p>{notice?.date?.split("-").reverse().join("-")}</p>
                  <p>{notice.title}</p>
                  <p>  <Readmore quote={notice.description} wordLength={150} underline={true} /></p>
                </div>
                <div >
                  {notice?.file_url && <a onClick={event => handleDownloadButton(event, row.savedFileName)} href="your_download_link">
                    <FaDownload />
                  </a>
                  }
                  {/*if createdby and userid is same then permission to delete*/}
                  {notice?.created_by == user?.id && <a  >
                    <DeleteNoticeModal
                      title={notice.title} id={notice.id}
/*                       type={type}
 */                      //classIds={classIds}
                      fetchNotices={fetchClassNotices}
                      classFunc={classFunc}
                      schoolFunc={schoolFunc} />
                  </a>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.noticedivD2}>
          <div
            className={styles.principal}>
            <p className={styles.clas}>
              Principal Message
            </p>
          </div>
          <div className={styles.msg}>
            <div>
              <Avatar
                alt={principalMsg?.name}
                src={principalMsg?.img}
                sx={{ width: 75, height: 75 }}
                className={styles.avatar}
              />
            </div>
            <div className={styles.messagepara} >
              <br />
              <p >
                <b>{principalMsg?.title}</b>
                <br />
                <br />
                <p>{principalMsg?.description}</p>
                <br />
                <br />
                <b>{principalMsg?.name}</b>
                <br />
                <br />
                <b>Principal</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}