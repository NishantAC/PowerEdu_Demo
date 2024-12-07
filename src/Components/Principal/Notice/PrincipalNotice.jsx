import React, { useContext, useState, useEffect } from "react";
import styles from "./PrincipleNotice.module.css";
import { MenuContext } from "../../../context/Menu/MenuContext";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import ClassNoticeService from "../../../services/classnotice.service";
import principalService from "../../../services/principal.service";
import Readmore from "../../Student/Home/Readmore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEdit } from "@fortawesome/free-solid-svg-icons";
import PrincipalDeleteNotice from "./PrincipalDeleteNotice";
import PrincipalAddNotice from "./PrincipalAddNotice";
import { Box } from "@mui/material";
import { getDropdownClasses } from "../../../slices/principal";
import { saveAs } from "file-saver"; // Importing the FileSaver.js library
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { styled } from "@mui/material/styles";
import { API_BASE_URL } from "@/common/constant";

export default function PrincipalNotice() {
  const CustomAvatar = styled(Avatar)({
    width: '50px',
    height: '132px',
    userSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
  });
  const mycontext = useContext(MenuContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user)
  const code = user?.schoolcode;
  const [principalMsgs, setPrincipalMsgs] = useState([]); // Multiple messages
  const [allNotices, setAllNotices] = useState([]);
  const [type, setType] = useState("");
  const [logo, setLogo] = useState(); // To store principal's image
  console.log("logostae", logo);
  const [active, setActive] = useState(0);
  const { classes } = useSelector((state) => state.principal);
  const [selectedMessageId, setSelectedMessageId] = useState(null); // Track selected message ID for editing
  const [title, setTitle] = useState(""); // Track title input
  const [description, setDescription] = useState(""); // Track description input
  const [editing, setEditing] = useState(false); // For tracking edit mode

  useEffect(() => {
    dispatch(getDropdownClasses({ schoolcode: user?.schoolcode }));
    fetchAllNotices();
    fetchPrincipalMsgs(); // Fetch all messages
    getPhoto(); // Fetch principal's image
  }, []);

  const classFunc = () => {
    setType("class_notices");
    setActive(0);
  };

  const schoolFunc = () => {
    setType("overall");
    setActive(1);
  };

  // Fetch all notices
  const fetchAllNotices = () => {
    const body = { school_code: user?.schoolcode };
    ClassNoticeService.getAllNotices(body)
      .then((res) => {
        setAllNotices(res.data);
        schoolFunc();
      })
      .catch((err) => console.error(err));
  };

  // Fetch all principal messages (multiple)
  const fetchPrincipalMsgs = () => {
    principalService
      .getPrincipalMessage({ user_id: user?.id })
      .then((res) => {
        if (res) {
          setPrincipalMsgs([res]); // Wrap response in array if needed
        } else {
          console.log("No principal message found");
        }
      })
      .catch((err) => {
        console.log("Problem in fetchPrincipalMsgs:", err);
      });
  };

  // Fetch principal photo
  const getPhoto = () => {
    const userId = user.id; // Assuming `user.id` is available in your state
    principalService
      .getPrincipalPhoto({ user_id: userId }) // Pass user_id in the request body
      .then((result) => {
        const imageUrl = result.imageUrl; // Assuming your API response has imageUrl
        if (imageUrl) {
          setLogo(imageUrl); // Set the image URL in the logo state
        } else {
          console.log("Image URL not found in API response");
        }
      })
      .catch((error) => {
        console.log("Error fetching principal photo:", error);
      });
  };

  // Handle PDF download
  const handleDownloadButton = async (event, key) => {
    event.preventDefault();
    try {
      const response = await ClassNoticeService.getPdf({ key: key });
      const { url } = response.data;
      const fileResponse = await fetch(url);
      const blob = await fileResponse.blob();
      const contentDisposition = fileResponse.headers.get(
        "content-disposition"
      );
      const match = contentDisposition?.match(/filename="(.+)"/);
      const fetchedFilename = match ? match[1] : "file.pdf";
      saveAs(blob, fetchedFilename);
    } catch (error) {
      console.log({ error: error, message: "Error in handleDownloadButton" });
    }
  };

  // Select message for editing
  const handleEditClick = (messageId, messageTitle, messageContent) => {
    setSelectedMessageId(messageId); // Set the selected message ID
    setTitle(messageTitle); // Set the selected title
    setDescription(messageContent); // Set the selected content
    setEditing(true); // Enable editing mode
  };

  // Save edited message
  const handleSaveEdit = async () => {
    try {
      const updatedMessage = {
        title: title,
        description: description,
      };

      // Call your API to update the message
      await fetch(
        `${API_BASE_URL}principals/editprincipalmessage/${selectedMessageId}/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMessage),
        }
      );

      // Refetch principal messages to update the UI
      fetchPrincipalMsgs();

      // Close editor and clear the state
      setEditing(false);
      setDescription("");
      setTitle("");
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

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
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: { md: "row", xs: "column-reverse" },
          }}
        >
          <span>
            <PrincipalAddNotice
              classes={classes}
              user={user}
              classFunc={classFunc}
              schoolFunc={schoolFunc}
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
              <button
                autoFocus
                onClick={classFunc}
                className={`${styles.noticebtn} ${
                  active === 0 ? styles.noticebtnfocus : ""
                }`}
              >
                Class
              </button>
              <button
                onClick={fetchAllNotices}
                className={`${styles.noticebtn} ${
                  active === 1 ? styles.noticebtnfocus : ""
                }`}
              >
                School
              </button>
            </div>
          </div>

          <div className={styles.area}>
            {allNotices?.map((row) => (
              <div
                style={{ display: "flex", margin: "0", width: "100%" }}
                key={row.id}
              >
                <div style={{ width: "80%" }}>
                  <p>{row?.date?.split("-").reverse().join("-")}</p>
                  <p>{row.title}</p>
                  <p>
                    <Readmore
                      quote={row.description}
                      wordLength={150}
                      underline={true}
                    />
                  </p>
                </div>
                <div style={{ width: "20%", paddingLeft: "100px" }}>
                  {row?.file_url && (
                    <a
                      onClick={(event) =>
                        handleDownloadButton(event, row.file_url)
                      }
                      href="#"
                    >
                      <FontAwesomeIcon
                        icon={faDownload}
                        style={{ color: "#6755D9" }}
                      />
                    </a>
                  )}
                  {row?.created_by === user?.id && (
                    <PrincipalDeleteNotice
                      title={row.title}
                      id={row.id}
                      type={type}
                      fetchAllNotices={fetchAllNotices}
                    />
                  )}
                  <p>{row?.class_code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.noticedivD2}>
          <div className={styles.principal}>
            {/* Title and Edit button in a single row */}
            <div className={styles.principalHeader}>
              <p>Principal Message</p>
              <FontAwesomeIcon
                icon={faEdit}
                style={{
                  color: "#1bbf9c",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
                onClick={() =>
                  handleEditClick(
                    principalMsgs[0].id,
                    principalMsgs[0].title,
                    principalMsgs[0].description
                  )
                } // Handle edit
              />
            </div>

            {/* Edit and Save functionality for Principal Message */}
            {editing ? (
              <div
                style={{
                  display: "grid",
                  justifyContent: "flex-start",
                  gap: 20,
                  width: "100%",
                  height: "480px",
                }}
              >
               <CustomAvatar alt="Principal" src={logo} />

                <div
                  style={{
                    display: "grid",
                    flexDirection: "column",
                    gap: 10,
                    width: "100%",
                  }}
                >
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Edit Title"
                  />

                  {/* ReactQuill editor for rich text editing */}
                  {/* <ReactQuill
                    value={description} 
                    onChange={(value) => setDescription(value)} 
                    placeholder="Edit Message"
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      height: "150px",
                    }}
                  /> */}
                </div>
                <button onClick={handleSaveEdit}>Save</button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 20,
                  width: "100%",
                  height: "480px",
                  
                }}
              >
                <Avatar
                  alt="Principal"
                  src={logo}
                  sx={{ width: 132, height: 132 }}
                />
                {principalMsgs.length > 0 ? (
                  principalMsgs.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        marginBottom: "20px",
                        height: "480px",
                        overflow: "scroll",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p>
                          <b>{msg.title || "No title available"}</b>
                        </p>
                        {/* Rendering message with HTML content */}
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              msg.description || "No description available",
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No principal message available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}