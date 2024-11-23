import '../InboxMail/PrncplInboxMsg.css';
import React, { useState, useEffect, useMemo } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "../../../teacher/Mail/Inbox/InboxMessage.module.css"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';;
import ClearIcon from '@mui/icons-material/Clear';
import ImageModal from '../../../teacher/Mail/ComposeMail/ImageModal';
import { fetchAllUsername, sendMail, getDraftMails } from '../../../../services/mail.service';
import { toast } from 'react-toastify';
import { getCurrentTime } from '../../../../common/Time';
import { Avatar } from '@mui/material';


function PrncplComposeMsg({ messageData, setFltMails }) {

  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), [])
  const [time, setTime] = useState(getCurrentTime());

  //form state
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [err, setErr] = useState(false);
  const [attachments, setAttachments] = useState([]);

  //suggest state
  const [showPopup, setShowPopup] = useState(false);
  const [userNames, setUserNames] = useState([]);
  const [selectedId, setSelectedId] = useState({});


  useEffect(() => {
    setRecipient(messageData?.name)
    setSelectedId(messageData?.id)
  }, [messageData])

  //update time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  /**
   * * File
  */
  const handleFileChange = (event) => {
    //convert to array
    const files = Array.from(event.target.files);
    //check file size
    const validFiles = files.filter((file) => {
      if (file.type.startsWith('image/') && file.size > 3 * 1024 * 1024) {
        alert('Image files must be less than 3MB');
        return false;
      } else if (file.size > 15 * 1024 * 1024) {
        alert('Files must be less than 15MB');
        return false;
      }
      return true;
    });

    setAttachments([...attachments, ...validFiles]);
  };

  //remove file from attachements
  const handleAttachmentRemove = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  //handel attached files
  const handleAttachmentClick = (file) => {
    // Open PDF in a new tab
    if (file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } else {
      // Alert not supported format
      alert("File format not supported");
    }
  };

  /**
   * selected user - acc to text
  */
  const handleSelectUser = (user) => {
    setRecipient(user.firstname + " " + user.lastname);
    setSelectedId(user.id);
    setShowPopup(false);
  };

  //on user typing action get names
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (recipient?.length > 0) {
        const data = await fetchAllUsername({
          name: recipient.split(" ")[0], schoolcode: user?.schoolcode
        });
        if (data) {
          setUserNames(data);
          setShowPopup(true);
        } else {
          setUserNames([]);
          toast.error("no user found")
        }
      } else {
        setUserNames([]);
        setShowPopup(false);
      }
    }, 1000)
    return () => clearTimeout(timeoutId);
  }, [recipient]);

  /**
   * submit
  */

  //get input
  // const handelInput = (e) => {
  //     setData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  // }

  //perform action
  const onSubmit = async (event) => {
    event.preventDefault();
    if (recipient == "") {
      setErr(true);
      return;
    }
    //get text
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const formData = new FormData();
    formData.append("sender_id", user.id);
    formData.append("schlcode", user?.schoolcode);
    formData.append("receiver_id", selectedId);
    formData.append('body', text);
    formData.append('subject', subject);
    attachments.forEach(file => {
      formData.append('files', file);
    });

    const res = await sendMail(formData);
    console.table(res.data.data[0]);
    if (res.status === 200) {
      setFltMails(prevData => [...prevData, res.data.data[0]]);
      toast.success(res.data.message, { autoClose: 500 });
    } else {
      toast.error(res.data.message, { autoClose: 500 });
    }
  };


  /**
   * Draft
  */

  const MakeDraft = async (event) => {
    event.preventDefault();
    if (recipient == "") {
      setErr(true);
      return;
    }
    //get text
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const formData = new FormData();
    formData.append("sender_id", user.id);
    formData.append("schlcode", user?.schoolcode);
    formData.append("receiver_id", selectedId);
    formData.append('body', text);
    formData.append('subject', subject);
    // attachments.forEach(file => {
    //     formData.append('files', file);
    // });

    const res = await getDraftMails(formData);

    if (res.status === 200) {
      console.table(res.data.data[0]);
      setFltMails(prevData => [...prevData, res.data.data[0]]);
      toast.success(res.data.message, { autoClose: 500 });
    } else {
      toast.error(res.data.message, { autoClose: 500 });
    }
  }

  return (
    <>
      <div className={styles.MessageHead}>
        <p className={styles.Div1P}>{time}</p>
        <button onClick={MakeDraft} className={styles.Mailsendbtn}>Draft Mail</button>
      </div>

      <form onSubmit={onSubmit} className={styles.Messagediv2} autocomplete="off">

        <div className={styles.Div2P}>
          <p>To:-</p>
          <input className={styles.Input2} type="text" value={recipient} id="to" onChange={event => setRecipient(event.target.value)} />
        </div>
        {err && <p style={{ color: "red", margin: 0 }}>Enter the Name</p>}

        {showPopup && (
          <ul className={styles.ContactSuggestion}>
            {userNames.length > 0 && userNames.map(user => (
              <li key={user.id} onClick={() => handleSelectUser(user)}>
                <Avatar
                  alt={user.firstname}
                  src={user.image_url}
                />
                <div>
                  <p>{user.firstname + " " + user.lastname}</p>
                  <span>{user.id}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.Div2P}>
          <p >Subject:-</p>
          <input className={styles.Input2} type="text" id="subject" value={subject} onChange={event => setSubject(event.target.value)} />
        </div>

        <br />

        <>
          <ul className={styles.attachments}>
            {attachments.map((file, index) => (
              <div className={styles.attachchild} title='Tap to view'>
                {file.type.startsWith("image/") ? <ImageModal file={file} index={index} /> :
                  <li key={index} onClick={() => handleAttachmentClick(file)} >
                    {file.name}
                  </li>}
                <ClearIcon onClick={(event) => {
                  event.stopPropagation();
                  handleAttachmentRemove(index);
                }} sx={{ color: "red", height: "20px", width: "20px", cursor: "pointer" }} />
              </div>
            ))}
          </ul>

          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'textAlign'],
              inline: {
                options: ['bold', 'italic', 'underline'],
                bold: { className: 'demo-option-custom' },
                italic: { className: 'demo-option-custom' },
                underline: { className: 'demo-option-custom' },
              },
              blockType: {
                className: 'demo-option-custom-wide',
                dropdownClassName: 'demo-dropdown-custom'
              },
              fontSize: {
                className: 'demo-option-custom-medium'
              }
            }}
          />
          <br />

          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              type="file"
              onChange={handleFileChange}
            />
            <AttachFileIcon className={styles.AtFile} />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
            <ImageOutlinedIcon className={styles.ImgIcon} />
          </IconButton>
        </>

        <button type="submit" className={styles.Mailsendbtn}>Send<SendIcon className={styles.SendIcon} /></button>

      </form >
    </>
  );
}

export default PrncplComposeMsg;
