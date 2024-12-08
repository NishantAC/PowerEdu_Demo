import { DeleteOutline } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {
  fetchAllUsername,
  forwardMail,
} from "../../../../services/mail.service";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosAttach } from "react-icons/io";
import { FaRegFileImage, FaRegFilePdf } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import IframeContent from "../IframeContent";
import DOMPurify from 'dompurify';


const validationSchema = Yup.object().shape({
  recipient: Yup.string().required("Recipient is required"),
});

function ForwardMessage({ email, attachments, setAttachments, themeProperties , setValue}) {
  const user = useSelector((state) => state.auth.user);
  const [mailType, setMailType] = useState("forward");
  const [showPopup, setShowPopup] = useState(false);
  const [userNames, setUserNames] = useState([]);
  const [selectedId, setSelectedId] = useState({});
  const [recipient, setRecipient] = useState("");
  const handleSelectUser = (popuser, setFieldValue) => {
    setFieldValue("recipient", popuser.firstname + " " + popuser.lastname);
    setSelectedId(popuser.id);
    setShowPopup(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (recipient.length > 0) {
        const data = await fetchAllUsername({
          name: recipient.split(" ")[0],
          schoolcode: user?.schoolcode,
        });
        if (data) {
          setUserNames(data);
          setShowPopup(true);
        } else {
          setUserNames([]);
          toast.error("no user found");
        }
      } else {
        setUserNames([]);
        setShowPopup(false);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [recipient]);

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

  const submitForward = async (values) => {
    const res = await forwardMail({ threadId: email[0].threadId, recipient: values.recipient });
    if (res.response.status === 200) {
      toast.success(res.response.data.data, { autoClose: 500 });
    } else {
      toast.error(res.response.data.data, { autoClose: 500 });
    }
  };

  return (
    <div
      style={{
        backgroundColor: themeProperties?.boxBackground,
        color: themeProperties?.textColorAlt,
        borderRadius: "16px",
        boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
        padding: "",
        transition: "all 0.3s ease-in-out",
        minHeight: "400px",
      }}
      className="min-w-[700px] overflow-hidden"
    >
      <div className="flex items-center gap-2 p-[20px]" 
        style={{ backgroundColor: themeProperties?.normal1 }}
      >
        <h1 className="text-[16px] font-normal underline-offset-2"
          style={{ color: themeProperties?.textColor }}
        >
          Forward Message
        </h1>
      </div>
      <div className="hidden"> </div>
      <div className=" p-4" style={{ width: "95%" }}>
        <Formik
          initialValues={{ recipient: "" }}
          validationSchema={validationSchema}
          onSubmit={submitForward}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="my-8">
                <div className="relative">
                  <Field
                    type="text"
                    id="recipient"
                    name="recipient"
                    className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-[#FFF] peer"
                  />
                  <label
                    htmlFor="recipient"
                    className={`absolute left-3 top-3 transition-all duration-200 transform ${
                      values.recipient ? '-translate-y-8 -translate-x-2 text-sm text-[#000]' : 'peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-black peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[16px] text-gray-500'
                    }`}
                  >
                    Recipient Email
                  </label>
                  <ErrorMessage name="recipient" component="div" className="text-red-500 text-sm mt-1 absolute" />
                </div>
              </div>
              {showPopup && (
                <ul className="bg-white shadow-lg rounded-lg p-4">
                  {userNames.length > 0 &&
                    userNames.map((user) => (
                      <li key={user.id} onClick={() => handleSelectUser(user, setFieldValue)} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100">
                        <Avatar alt={user.firstname} src={user.image_url} />
                        <div>
                          <p>{user.firstname + " " + user.lastname}</p>
                          <span className="text-gray-500 text-sm">{user.id}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
              <br />
              <div className=" max-h-[300px] overflow-scroll shadow-sm scroller">
              <IframeContent
              content={DOMPurify.sanitize(email.body)}
              messageData={email}
              setValue={setValue}
              showReplyForward={false}
            />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {attachments.map((file, index) => (
                  <div
                    className="flex items-center py-2 px-2 border rounded-lg cursor-pointer"
                    key={index}
                  >
                    {file.type.endsWith("pdf") ? (
                      <div className="flex items-center gap-2">
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
                      className="ml-2 h-4 w-4 text-red-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div
                  className="transition-transform hover:scale-110 py-2 cursor-pointer"
                  onClick={() => document.querySelector("input[type='file']").click()}
                >
                  <input hidden type="file" onChange={handleFileChange} />
                  <IoIosAttach className="text-gray-500 h-6 w-6" />
                </div>
                <div
                  className="transition-transform hover:scale-110 px-2 py-2 cursor-pointer"
                  onClick={() => document.querySelector("input[type='file']").click()}
                >
                  <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                  <FaRegFileImage className="text-gray-500 h-6 w-6" />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Send
                  <SendIcon className="ml-2" />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ForwardMessage;