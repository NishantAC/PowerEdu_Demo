import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import { IoIosAttach, IoMdSend } from "react-icons/io";
import { FaRegFileImage } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import ForwardMessage from "./ForwardMessage";
import { getThread, replyToMail } from "../../../../services/mail.service";
import ImageModal from "../ComposeMail/ImageModal";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";
import { LuForward, LuReply } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner"
import { FaRegFilePdf } from "react-icons/fa";


const validationSchema = Yup.object().shape({
  content: Yup.string().trim().required("Message should not be empty"),
});

function ReplyForwardMail({ email, setFltMails, setValue }) {
  const user = useSelector((state) => state.auth.user);
  const [mailType, setMailType] = useState("reply");
  const [attachments, setAttachments] = useState([]);
  const [reply, setReply] = useState(false);
  const [forward, setForward] = useState(false);
  const themeProperties = useSelector(selectThemeProperties);
  const [loading, setLoading] = useState(false);

  const handleReplyClick = () => setReply(!reply);
  const handleForwardClick = () => setForward(!forward);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      if (file.type.startsWith("image/") && file.size > 3 * 1024 * 1024) {
        toast("Images must be less than 3MB", {
          description: "Please upload a smaller image",
        });
        return false;
      } else if (file.size > 15 * 1024 * 1024) {
        toast("File size must be less than 15MB", { description: "Please upload a smaller file" });
        return false;
      }
      return true;
    });
    setAttachments([...attachments, ...validFiles]);
  };

  const handleAttachmentRemove = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const submitReply = async (values, { setSubmitting }) => {
    console.log (values);
    if (!values.content && attachments.length === 0) {

      toast("Message should not be empty", { description: "Please write a message" });
      setSubmitting(false);
      return;
    }

    setLoading(true);

    const recipient = email?.from;
    const res = await replyToMail({
      recipient,
      threadId: email.threadId,
      body: values.content,
    });

    if (res.status === 200) {
      toast.success("Mail sent successfully", { description: "Your reply has been sent successfully" });
      values.content = "";
      setAttachments([]); 
      setReply(false);
      
    } else {
      toast.error("Mail not sent", { description: "There was an error sending the mail" });
    }
    setLoading(false);
    setSubmitting(false);
  };


  const extractNameAndEmail = (from) => {
    if (!from) {
      return { name: "", email: "" };
    }
    const match = from.match(/(.*) <(.*)>/);
    if (match) {
      return { name: match[1], emailFrom: match[2] };
    }
    return { name: from, emailFrom: "" };
  };

  const { name, emailFrom } = extractNameAndEmail(email?.from);

  return (
    <div
      className="flex justify-start pl-20 gap-6 mb-10"
      style={{
        background: themeProperties?.background,
        color: themeProperties?.textColorAlt,
      }}
    >
      <Dialog className="rounded-[20px]">
        <DialogTrigger className=" rounded-[20px]"
        >
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
            color: themeProperties?.textColor,
            borderRadius: "16px",
            boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
            padding: "0px",
            transition: "all 0.3s ease-in-out",
            minHeight : "400px",
          }}
          className = "min-w-[700px] overflow-hidden "
        >

          <DialogTitle className ="flex items-center gap-2 p-[20px]" 
          style={{ backgroundColor: themeProperties?.normal1 }}
          >
            <h1 className="text-[16px] font-normal  underline-offset-2 "
              style={{ color: themeProperties?.textColor }}
            >Reply to {name}</h1>
            <h2
                className="text-[14px] font-light "
                style={{
                  color: themeProperties?.textColor,
                }}
              >
                {"( " + emailFrom + " )"}
              </h2>

          </DialogTitle>

          <DialogDescription className ="hidden"> </DialogDescription>

          <Formik
            initialValues={{ content: "" }}
            validationSchema={validationSchema}
            onSubmit={submitReply}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="w-full space-y-6 px-[20px]"
              style={{
                color:themeProperties.textColorAlt
              } }
              >
                {/* Attachments Section */}
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div
                      className="flex items-center py-2 px-2 border rounded-lg cursor-pointer"
                      key={index}
                    >
                      {file.type.endsWith("pdf") ? (
                        <div className=" flex items-center gap-2">
                        <FaRegFilePdf className="text-red-500 h-6 w-6" />
                        <span className="text-[12px] font-light">{file.name}</span>
                        </div>
                        
                      ) : (
                        <span className="text-[12px] font-light">{file.name}</span>
                      )}
                      <MdDelete
                        onClick={(event) => {
                          event.stopPropagation();
                          handleAttachmentRemove(index);
                        }}
                        className="ml-2 h-4 w-4"
                        style = {{color : themeProperties?.textColorLight}}
                      />
                    </div>
                  ))}
                </div>

                <Field name="content">
                  {({ field }) => (
                    <ReactQuill
                      value={field.value}
                      onChange={(value) => setFieldValue("content", value)}
                      className="rounded-lg h-48 "
                      placeholder="Write your message..."
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="content"
                  component="p"
                  className="text-red-500 text-sm text-center mt-2 absolute translate-x-0 translate-y-6 "
                />
                <DialogFooter>
                {/* Action Buttons */}
                <div className="flex items-center justify-center pt-10 pb-3">
                  <div
                    className="transition-transform hover:scale-110  py-2 cursor-pointer absolute left-5"
                    onClick={() => document.querySelector("input[type='file']").click()}
                  >
                    <input hidden type="file" onChange={handleFileChange} />
                    < IoIosAttach 
                    color={themeProperties.textColorAlt}
                    />
                  </div>

                  <div
                    className="transition-transform hover:scale-110 px-2 py-2  cursor-pointer absolute left-10"
                    
                    onClick={() => document.querySelector("input[type='file']").click()}
                  >
                    <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                    <FaRegFileImage 
                    color={themeProperties.textColorAlt}
                    />
                  </div>

                  <button
                    className="px-6 py-2 flex items-center gap-2 rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 "
                    type="submit"
                    style={{
                      background: themeProperties.normal3,
                      color: themeProperties.textColor,
                      opacity: isSubmitting || loading ? 0.5 : 1,
                    }}
                    disabled={isSubmitting || loading}
                  >
                    Send
                    <IoMdSend size ={20} />
                  </button>
                </div>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Dialog className="rounded-[20px]">
        <DialogTrigger className="rounded-[20px]">
          <button
            className="px-4 reply py-2 flex items-center gap-4 rounded-[20px] border-2 transition-all duration-300 ease-in-out"
            style={{
              borderColor: themeProperties.normal1,
              "--hover-bg": themeProperties?.normal1,
            }}
            onClick={handleForwardClick}
          >
            <style>
              {`
                .reply:hover {
                  background-color: ${themeProperties?.normal1};
                  color: ${themeProperties?.textColor};
                }
              `}
            </style>
            Forward
            <LuForward size={20} />
          </button>
        </DialogTrigger>
        <DialogContent
          style={{
            backgroundColor: themeProperties?.boxBackground,
            color: themeProperties?.textColor,
            borderRadius: "16px",
            boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
            padding: "0px",
            transition: "all 0.3s ease-in-out",
            minHeight: "400px",
          }}
          className="min-w-[700px] overflow-hidden"
        >
          <ForwardMessage
            email={email}
            themeProperties={themeProperties}
            setFltMails={setFltMails}
            attachments={attachments}
            setValue={setValue}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ReplyForwardMail;