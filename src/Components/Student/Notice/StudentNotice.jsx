import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import styles from "./StudentNotice.module.css";
import { MenuContext } from "../../../context/Menu/MenuContext";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import ClassNoticeService from "../../../services/classnotice.service";
import principalService from "../../../services/principal.service";
import { FaDownload } from "react-icons/fa";

import NoticeDescription from "./noticeDescription";
import Readmore from "../Home/Readmore";

export default function StudentNotice() {
  const mycontext = useContext(MenuContext);
  const { user: currentUser } =
    useSelector((state) => state.user);
  const code = currentUser.schoolcode;

  const [principalMsg, setPrincipalMsg] = useState({});

  const [cnr, setCnr] = useState(true);

  const [notices, setNotices] = useState([]);

  const [type, setType] = useState("");
  const [active, setActive] = useState(0);
  const [logo, setLogo] = useState();

  const classFunc = () => {
    setCnr(true);
    setType("class_notices");
    setActive(0);
  };

  const schoolFunc = () => {
    setCnr(false);
    setType("overall");
    setActive(1);
  };

  useEffect(() => {
    fetchAllNotices();
    fetchPrincipalMsg();
    getPhoto();
  }, []);

  const fetchClassNotices = (cls) => {
    const body = {
      school_code: currentUser.schoolcode,
      class_code: currentUser.classname,
    };
    ClassNoticeService.getClassNotices(body)
      .then((res) => {
        setNotices(res.data);
        classFunc();
      })
      .catch((err) => console.error(err));
  };

  const fetchAllNotices = () => {
    const body = { school_code: currentUser.schoolcode };
    ClassNoticeService.getAllNotices(body)
      .then((res) => {
        setNotices(res.data);
        schoolFunc();
      })
      .catch((err) => console.error(err));
  };
  //fetch principal msg
  //fetch principal msg
  const fetchPrincipalMsg = () => {
    principalService
      .getPrincipalMessage({ user_id: currentUser.user_id })
      .then((res) => {
        setPrincipalMsg(res);
      })
      .catch((err) =>
        console.log("Problem in TeacherNotice :: fetchPrincipalMsg() => ", err)
      );
  };
  

  const getPhoto = () => {
    principalService
      .getPrincipalPhoto({ schoolcode: code })
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
  };

  const handleDownloadButton = async (event, key) => {
    event.preventDefault();
    ClassNoticeService.getPdf({ key: key })
      .then(async (response) => {
        console.log(response);
        const contentDisposition = response.headers["content-disposition"];
        const match = contentDisposition.match(/filename="(.+)"/);
        const fetchedFilename = match ? match[1] : "file.pdf";
        const blob = new Blob([response.data], { type: "application/pdf" });
        saveAs(blob, fetchedFilename);
      })
      .catch((error) => {
        console.log({ error: error, message: "error in handleDownloadButton" });
      });
  };
  return (
    <div
      onClick={mycontext.offMenu}
      onScroll={mycontext.offMenu}
      className={styles.main}
    >
      <p className={styles.heading}>
        Home <span className={styles.gtr}>&gt;</span>
        <b>
          {" "}
          <u>Notice</u>
        </b>
      </p>
      <div className={styles.noticediv}>
        <div className={styles.noticedivD1}>
          <div className={styles.clas}>
            <p className={styles.head}>Notice</p>
            <div className={styles.button}>
              <button
                autoFocus
                onClick={fetchClassNotices}
                className={`${styles.noticebtn} ${
                  active == 0 ? styles.noticebtnfocus : ""
                }`}
              >
                Class
              </button>
              <button
                onClick={fetchAllNotices}
                className={`${styles.noticebtn} ${
                  active == 1 ? styles.noticebtnfocus : ""
                }`}
              >
                Overall
              </button>
            </div>
          </div>

          <div className={styles.area}>
            {notices?.map((row) => (
              <div>
                <div style={{ width: "80%" }}>
                  <p>{row?.date?.split("-").reverse().join("-")}</p>
                  <p>{row.title}</p>
                  <p>
                    {" "}
                    <Readmore
                      quote={row.description}
                      wordLength={150}
                      underline={true}
                    />
                  </p>
                  {/* <NoticeDescription text={row.details} />*/}
                </div>
                {row?.file_url && (
                  <a
                    style={{ width: "20%" }}
                    onClick={(event) =>
                      handleDownloadButton(event, row?.file_url)
                    }
                    href="your_download_link"
                  >
                    <FaDownload />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.noticedivD2}>
          <div className={styles.principal}>
            <p>Principal Message</p>
          </div>
          <div className={styles.msg}>
            <div>
              <Avatar
                alt={principalMsg?.name}
                // src={principalMsg?.profileimage}
                src={logo}
                sx={{ width: 75, height: 75 }}
                className={styles.avatar}
              />
            </div>
            <div className={styles.messagepara}>
              <br />
              <p>
                <b>{principalMsg?.title}</b>
                <br />
                <br />
                {/* <Readmore quote={principalMsg?.msg_desc} wordLength={150} underline={true} /> */}
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
