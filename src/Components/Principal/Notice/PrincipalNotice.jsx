// filepath: /C:/Users/nisha/OneDrive/Documents/WorkGit/Rekor_redefined/Frontend/src/Components/Principal/Notice/PrincipalNotice.jsx
import React, { useContext, useState, useEffect } from "react";
import { MenuContext } from "../../../context/Menu/MenuContext";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import ClassNoticeService from "../../../services/classnotice.service";
import principalService from "../../../services/principal.service";
import Readmore from "../../Student/Home/Readmore";
import { FaDownload } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import PrincipalDeleteNotice from "./PrincipalDeleteNotice";
import PrincipalAddNotice from "./PrincipalAddNotice";
import { Box } from "@mui/material";
import { getDropdownClasses } from "../../../slices/principal";
import { saveAs } from "file-saver";
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
  const [principalMsgs, setPrincipalMsgs] = useState([]);
  const [allNotices, setAllNotices] = useState([]);
  const [type, setType] = useState("");
  const [logo, setLogo] = useState();
  const [active, setActive] = useState(0);
  const { classes } = useSelector((state) => state.principal);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(getDropdownClasses({ schoolcode: user?.schoolcode }));
    fetchAllNotices();
    fetchPrincipalMsgs();
    getPhoto();
  }, []);

  const classFunc = () => {
    setType("class_notices");
    setActive(0);
  };

  const schoolFunc = () => {
    setType("overall");
    setActive(1);
  };

  const fetchAllNotices = () => {
    const body = { school_code: user?.schoolcode };
    ClassNoticeService.getAllNotices(body)
      .then((res) => {
        setAllNotices(res.data);
        schoolFunc();
      })
      .catch((err) => console.error(err));
  };

  const fetchPrincipalMsgs = () => {
    principalService
      .getPrincipalMessage({ user_id: user?.id })
      .then((res) => {
        if (res) {
          setPrincipalMsgs([res]);
        }
      })
      .catch((err) => {
        console.error(err)
      });
  };

  const getPhoto = () => {
    const userId = user?.id;
    principalService
      .getPrincipalPhoto({ user_id: userId })
      .then((result) => {
        const imageUrl = result.imageUrl;
        if (imageUrl) {
          setLogo(imageUrl);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      console.error(error);
    }
  };

  const handleEditClick = (messageId, messageTitle, messageContent) => {
    setSelectedMessageId(messageId);
    setTitle(messageTitle);
    setDescription(messageContent);
    setEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedMessage = {
        title: title,
        description: description,
      };

      await fetch(
        `${API_BASE_URL}principals/editprincipalmessage/${selectedMessageId}/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMessage),
        }
      );

      fetchPrincipalMsgs();
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
      className="p-4"
    >
      <div className="flex">
        <p className="text-lg font-semibold">
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

      <div className="mt-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Notice</p>
              <div className="flex space-x-2">
                <button
                  autoFocus
                  onClick={classFunc}
                  className={`px-4 py-2 rounded ${
                    active === 0 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Class
                </button>
                <button
                  onClick={fetchAllNotices}
                  className={`px-4 py-2 rounded ${
                    active === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  School
                </button>
              </div>
            </div>

            <div className="mt-4">
              {allNotices?.map((row) => (
                <div
                  className="flex justify-between items-center mb-4"
                  key={row.id}
                >
                  <div className="w-4/5">
                    <p>{row?.date?.split("-").reverse().join("-")}</p>
                    <p className="font-semibold">{row.title}</p>
                    <p>
                      <Readmore
                        quote={row.description}
                        wordLength={150}
                        underline={true}
                      />
                    </p>
                  </div>
                  <div className="w-1/5 pl-4">
                    {row?.file_url && (
                      <a
                        onClick={(event) =>
                          handleDownloadButton(event, row.file_url)
                        }
                        href="#"
                        className="text-blue-500"
                      >
                        <FaDownload />
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

          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold">Principal Message</p>
                <MdEdit
                  onClick={() =>
                    handleEditClick(
                      principalMsgs[0].id,
                      principalMsgs[0].title,
                      principalMsgs[0].description
                    )
                  }
                  className="cursor-pointer"
                />
              </div>

              {editing ? (
                <div className="mt-4 space-y-4">
                  <CustomAvatar alt="Principal" src={logo} />

                  <div className="space-y-2">
                    <input
                      className="w-full px-4 py-2 border rounded"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Edit Title"
                    />
                  </div>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="mt-4 flex space-x-4">
                  <Avatar
                    alt="Principal"
                    src={logo}
                    sx={{ width: 132, height: 132 }}
                  />
                  {principalMsgs.length > 0 ? (
                    principalMsgs.map((msg) => (
                      <div
                        key={msg.id}
                        className="space-y-2 overflow-auto h-60"
                      >
                        <p className="font-semibold">
                          {msg.title || "No title available"}
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              msg.description || "No description available",
                          }}
                        />
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
    </div>
  );
}