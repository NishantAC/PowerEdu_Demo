import { Button, IconButton } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SendIcon from "@mui/icons-material/Send";
import { useMemo, useState } from "react";
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
  };

  const handleReplyAllClick = () => {
    setReply(!reply);
  };

  const handleForwardClick = () => {
    setForward(!forward);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
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

  const handleAttachmentClick = (file) => {
    if (file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } else {
      alert("File format not supported");
    }
  };

  const handleAttachmentRemove = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  function extractEmailFromString(emailString) {
    const regex = /<([^>]+)>/;
    const match = emailString.match(regex);

    if (match && match[1]) {
      return match[1];
    }

    return null;
  }

  const submitReply = async () => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();

    if (text == "") {
      setErr(true);
      return;
    }

    const recipient = email[0]?.from;

    const res = await replyToMail({
      recipient,
      threadId: email[0].threadId,
      body: text,
    });
    const thread = await getThread({
      pageToken: email[0].nextPageToken ? email[0].nextPageToken : null,
      id: email[0].threadId,
    });
    setValue(thread.response.data);

    if (res.status === 200) {
      toast.success(res.data.message, { autoClose: 500 });
      setEditorState(EditorState.createEmpty());
    } else {
      toast.error(res.data.message, { autoClose: 500 });
    }
  };

  return (
    <div className="flex justify-center">
      {!reply && !forward && (
        <>
          <button onClick={() => handleReplyClick(email)}>
            <ReplyOutlined />
            Reply
          </button>
          <button onClick={() => handleForwardClick(email)}>
            Forward
            <ReplyOutlined style={{ transform: "rotateY(180deg)" }} />
          </button>
        </>
      )}

      {reply && (
        <div className="w-11/12">
          <ul className="flex flex-wrap">
            {attachments.map((file, index) => (
              <div
                className="flex items-center m-2 p-2 border rounded cursor-pointer"
                title="Tap to view"
                key={index}
              >
                {file.type.startsWith("image/") ? (
                  <ImageModal file={file} index={index} />
                ) : (
                  <li onClick={() => handleAttachmentClick(file)}>
                    {file.name}
                  </li>
                )}
                <ClearIcon
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAttachmentRemove(index);
                  }}
                  className="text-red-500 h-5 w-5 cursor-pointer"
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
            <p className="text-red-500 m-0">Body can not be empty</p>
          )}
          <div className="flex items-center mt-4">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden type="file" onChange={handleFileChange} />
              <AttachFileIcon />
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
              <ImageOutlinedIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <DeleteOutline
                onClick={() => setReply(!reply)}
              />
            </IconButton>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded ml-4 flex items-center"
              onClick={submitReply}
            >
              Send
              <SendIcon className="ml-2" />
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