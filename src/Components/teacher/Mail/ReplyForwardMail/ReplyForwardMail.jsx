import { Button, IconButton } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SendIcon from "@mui/icons-material/Send";
import { useMemo, useState } from "react";
import styles from "../Inbox/InboxMessage.module.css";
import { DeleteOutline, ReplyOutlined } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import ForwardMessage from "./ForwardMessage";
import { toast } from "react-toastify";
import {
  getThread,
  replyToMail,
  sendMail,
} from "../../../../services/mail.service";
import ImageModal from "../ComposeMail/ImageModal";
import { useSelector } from "react-redux";

function ReplyForwardMail({ email, setFltMails, setValue }) {
  const user = useSelector((state) => state.auth.user);
  const [err, setErr] = useState(false);
  const [mailType, setMailType] = useState("reply");
  const [attachments, setAttachments] = useState([]);
  const [reply, setReply] = useState(false);
  const [forward, setForward] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onSetEditorState = (newState) => {
    setEditorState(newState);
  };

  const handleReplyClick = () => {
    setReply(!reply);
    // const subject = `Re: ${email.subject}`;
    // const body = `\n\nOn ${email.date}, ${email.sender} wrote:\n${email.body}`;
    // const newEmail = { to: email.sender, subject, body };
  };

  const handleReplyAllClick = () => {
    setReply(!reply);
    // const subject = `Re: ${email.subject}`;
    // const body = `\n\nOn ${email.date}, ${email.sender} wrote:\n${email.body}`;
    // const recipients = email.recipients.filter((recipient) => recipient !== currentUser.email);
    // const newEmail = { to: recipients.join(','), subject, body };
  };

  const handleForwardClick = () => {
    setForward(!forward);
    // const subject = `Fwd: ${email.subject}`;
    // const body = `\n\n---------- Forwarded message ----------\nFrom: ${email.sender}\nDate: ${email.date}\nSubject: ${email.subject}\n\n${email.body}`;
    // const newEmail = { subject, body };
  };

  /**
   * * File
   */
  const handleFileChange = (event) => {
    //convert to array
    const files = Array.from(event.target.files);
    //check file size
    const validFiles = files.filter((file) => {
      if (file.type.startsWith("image/") && file.size > 3 * 1024 * 1024) {
        toast.error("Image files must be less than 3MB");
        return false;
      } else if (file.size > 15 * 1024 * 1024) {
        toast.error("Files must be less than 15MB");
        return false;
      }
      return true;
    });

    setAttachments([...attachments, ...validFiles]);
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

  //remove file from attachements
  const handleAttachmentRemove = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  function extractEmailFromString(emailString) {
    const regex = /<([^>]+)>/; // Regular expression to extract text inside '<' and '>'
    const match = emailString.match(regex);

    if (match && match[1]) {
      return match[1];
    }

    return null; // Return null if no match or extracted email is not found
  }

  const submitReply = async () => {
    //get text
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    console.log("Text content:", text);

    //body is empty return
    if (text == "") {
      setErr(true);
      return;
    }
    console.log(email, "this is email");
    // const recipient = extractEmailFromString(email[0].from);
    const recipient = email[0]?.from;
    console.log(recipient, "this is recipient");

    const res = await replyToMail({
      recipient,
      threadId: email[0].threadId,
      body: text,
    });
    const thread = await getThread({
      pageToken: email[0].nextPageToken ? email[0].nextPageToken : null,
      id: email[0].threadId,
    }); // get all thread for the email
    setValue(thread.response.data);
    // console.table(res.data.data[0]);
    if (res.status === 200) {
      /*            setFltMails(prevData => [...prevData, res.data.data[0]]); */
      toast.success(res.data.message, { autoClose: 500 });
      setEditorState(EditorState.createEmpty());
    } else {
      toast.error(res.data.message, { autoClose: 500 });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {!reply && !forward && (
        <>
          <Button onClick={() => handleReplyClick(email)}>
            <ReplyOutlined />
            Reply
          </Button>
          {/* <Button onClick={() => handleReplyAllClick(email)}><ReplyAllOutlined />Reply All</Button> */}
          <Button onClick={() => handleForwardClick(email)}>
            Forward
            <ReplyOutlined style={{ transform: "rotateY(180deg)" }} />
          </Button>
        </>
      )}

      {reply && (
        <div style={{ width: "95%" }}>
          <ul className={styles.attachments}>
            {attachments.map((file, index) => (
              <div className={styles.attachchild} title="Tap to view">
                {file.type.startsWith("image/") ? (
                  <ImageModal file={file} index={index} />
                ) : (
                  <li key={index} onClick={() => handleAttachmentClick(file)}>
                    {file.name}
                  </li>
                )}
                <ClearIcon
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAttachmentRemove(index);
                  }}
                  sx={{
                    color: "red",
                    height: "20px",
                    width: "20px",
                    cursor: "pointer",
                  }}
                />
              </div>
            ))}
          </ul>
          <Editor
            editorState={editorState}
            onEditorStateChange={onSetEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            placeholder="Write your message....."
            toolbar={{
              options: ["inline", "blockType", "fontSize", "textAlign"],
              inline: {
                options: ["bold", "italic", "underline"],
                bold: { className: "demo-option-custom" },
                italic: { className: "demo-option-custom" },
                underline: { className: "demo-option-custom" },
              },
              blockType: {
                className: "demo-option-custom-wide",
                dropdownClassName: "demo-dropdown-custom",
              },
              fontSize: {
                options: [
                  8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
                ],
                className: "demo-option-custom-medium",
              },
            }}
          />
          {err && (
            <p style={{ color: "red", margin: 0 }}>Body can not be empty</p>
          )}
          <div className={styles.Div3}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden type="file" onChange={handleFileChange} />
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
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <DeleteOutline
                className={styles.ImgIcon}
                onClick={() => setReply(!reply)}
              />
            </IconButton>

            <button className={styles.Mailsendbtn} onClick={submitReply}>
              Send
              <SendIcon className={styles.SendIcon} />
            </button>
          </div>
        </div>
      )}

      {forward && (
        <ForwardMessage
          email={email}
          setForward={setForward}
          forward={forward}
          setFltMails={setFltMails}
          attachments={attachments}
        />
      )}
    </div>
  );
}

export default ReplyForwardMail;
