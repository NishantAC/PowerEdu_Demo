import { Button, IconButton } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SendIcon from "@mui/icons-material/Send";
import { useMemo, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import ForwardMessage from "./ForwardMessage";
import { toast } from "react-toastify";
import {
  getThread,
  replyToMail,
} from "../../../../services/mail.service";
import ImageModal from "../ComposeMail/ImageModal";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";
import { LuForward, LuReply } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

function ReplyForwardMail({ email, setFltMails, setValue }) {
  const user = useSelector((state) => state.auth.user);
  const [err, setErr] = useState(false);
  const [mailType, setMailType] = useState("reply");
  const [attachments, setAttachments] = useState([]);
  const [reply, setReply] = useState(false);
  const [forward, setForward] = useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const themeProperties = useSelector(selectThemeProperties);
  const [loading, setLoading] = useState(false);
  const onSetEditorState = (newState) => {
    setEditorState(newState);
  };

  const handleReplyClick = () => setReply(!reply);
  const handleForwardClick = () => setForward(!forward);

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

  const handleAttachmentRemove = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const submitReply = async () => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    if (text == "") {
      setErr(true);
      return;
    }
    console.log(email.threadId, "email[0].threadId");

    const recipient = email?.from;
    const res = await replyToMail({
      recipient,
      threadId: email.threadId,
      body: text,
    });
    const thread = await getThread({ pageToken: email.nextPageToken, id: email.threadId });
    console.log(thread.response.data, "thread.response.data");
    setValue(thread.response.data);

    if (res.status === 200) {
      toast.success(res.data.message, { autoClose: 500 });
      setEditorState(EditorState.createEmpty());
    } else {
      toast.error(res.data.message, { autoClose: 500 });
    }
  };

  return (
    <div className="flex justify-start pl-20 gap-6 mb-10"
      style={{
        background: themeProperties?.background,
        color: themeProperties?.textColorAlt,
      }}
    >
      <Dialog>
        <DialogTrigger className=" rounded-[20px]">
          <div
            className="px-4 py-2 flex items-center gap-4 rounded-[20px] border-2 transition-all duration-300 ease-in-out"
            style={{
              borderColor: themeProperties.normal1,
              "--hover-bg": themeProperties?.normal1,
            }}
            onClick={handleReplyClick}
          >
            <style>
              {`
                button:hover {
                  background-color: ${themeProperties?.normal1};
                  color: ${themeProperties?.textColor};
                }
              `}
            </style>
            <LuReply className="" size={20} />
            Reply
          </div>
        </DialogTrigger>
        <DialogContent
  style={{
    backgroundColor: themeProperties?.boxBackground,
    color: themeProperties?.textColorAlt,
    borderRadius: "16px",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
    padding: "24px",
    transition: "all 0.3s ease-in-out",
  }}
>
  <div className="w-full space-y-6">
    {/* Attachments Section */}
    <div className="flex flex-wrap gap-3">
      {attachments.map((file, index) => (
        <div
          className="flex items-center p-3 border rounded-lg cursor-pointer bg-white shadow-md transition-transform hover:scale-105"
          key={index}
        >
          {file.type.startsWith("image/") ? (
            <ImageModal file={file} index={index} />
          ) : (
            <span className="text-sm font-medium">{file.name}</span>
          )}
          <ClearIcon
            onClick={(event) => {
              event.stopPropagation();
              handleAttachmentRemove(index);
            }}
            className="text-red-500 h-6 w-6 ml-2 cursor-pointer transition-transform hover:scale-110"
          />
        </div>
      ))}
    </div>

    {/* Rich Text Editor */}
    <Editor
      editorState={editorState}
      onEditorStateChange={onSetEditorState}
      wrapperClassName="border border-gray-300 rounded-lg p-4 transition-shadow focus-within:shadow-lg"
      editorClassName="min-h-[200px] p-3 bg-white rounded-md"
      toolbarClassName="bg-gray-100 rounded-md border border-gray-200"
      placeholder="Write your message..."
      toolbar={{
        options: ["inline", "blockType", "fontSize", "textAlign", "link"],
        inline: {
          options: ["bold", "italic", "underline"],
        },
        fontSize: {
          options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30],
        },
      }}
    />

    {/* Error Message */}
    {err && <p className="text-red-500 text-sm text-center mt-2">Message cannot be empty</p>}

    {/* Action Buttons */}
    <div className="flex items-center gap-4 mt-6">
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        className="transition-transform hover:scale-110"
      >
        <input hidden type="file" onChange={handleFileChange} />
        <AttachFileIcon />
      </IconButton>

      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        className="transition-transform hover:scale-110"
      >
        <input hidden accept="image/*" type="file" onChange={handleFileChange} />
        <ImageOutlinedIcon />
      </IconButton>

      <button
        className="px-6 py-2 flex items-center gap-2 rounded-full border-2 transition-transform hover:scale-105 shadow-md"
        onClick={submitReply}
        style={{
          background: themeProperties.normal1,
          color: themeProperties.textColor,
        }}
        disabled={loading }
      >
         Send
        <SendIcon />
      </button>
    </div>
  </div>
</DialogContent>

      </Dialog>

      <button
        className="px-4 py-2 flex items-center gap-4 rounded-[20px] border-2 transition-all duration-300 ease-in-out"
        style={{
          borderColor: themeProperties.normal1,
          "--hover-bg": themeProperties?.normal1,
        }}
        onClick={handleForwardClick}
      >
        <style>
          {`
            button:hover {
              background-color: ${themeProperties?.normal1};
              color: ${themeProperties?.textColor};
            }
          `}
        </style>
        Forward
        <LuForward size={20} />
      </button>

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