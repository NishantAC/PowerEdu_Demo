import React, { useState, useEffect, useRef } from "react";
import InboxMessage from "./InboxMessage";
import SearchIcon from "@mui/icons-material/Search";
import { getTime } from "../../../common/Time";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import InfiniteScroll from "react-infinite-scroll-component";
import { alpha } from "@mui/material/styles";
import debounce from "lodash.debounce";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { IoMdRefresh } from "react-icons/io";
import { Button, Skeleton } from "@mui/material";
import { toast } from "sonner";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor:
    theme.properties?.inputBackground ||
    alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)", // Added hover shadow
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease-in-out",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: theme.spacing(2),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

function Mail({
  mails,
  fetchMails,
  themeProperties,
  setLoading,
  loading,
  type,
}) {
  const [value, setValue] = useState({});
  const [selectedMail, setSelectedMail] = useState(null); // State for selected mail
  const scrollRef = useRef(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const openMsg = (mail) => {
    setSelectedMail(mail?.id);
    setValue(mail);
  };
  const [disableRefresh, setDisableRefresh] = useState(false);

  const refresh = () => {
    setDisableRefresh(true);
    toast.info("Refreshing", {
      description: "Refreshing your " + type + " mails",
    });
    setRefreshLoading(true);
    setSelectedMail();
    setValue({});
    fetchMails(true)
      .then(() => {
        setRefreshLoading(false);
        toast.success("Refreshed", {
          description: ` Your ${type} mails has been refreshed"`,
        });
        setDisableRefresh(false);
        openMsg(mails[0]);
      })
      .catch(() => {
        setRefreshLoading(false);
        toast.error("Failed to refresh", { description: "Please try again" });
        setDisableRefresh(false);
      });
  };

  useEffect(() => {
    if (mails && mails.length > 0) {
      openMsg(mails[0]);
    }
    const handleScroll = debounce(() => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollHeight - scrollTop <= clientHeight + 400) {
          if (loading) {
            return;
          }

          fetchMails(false);
          setLoading(true);
        }
      }
    }, 300);

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const extractName = (from) => {
    const match = from.match(/^(.*?)\s*</);
    return match ? match[1] : from;
  };

  const uniqueMails = Array.from(new Set(mails.map((mail) => mail.id))).map(
    (id) => mails.find((mail) => mail.id === id)
  );

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={20} defaultSize={30} maxSize={40}>
        <div
          className="h-[90vh] overflow-y-scroll px-2 "
          ref={scrollRef}
        >
          <style>
            {`
              .scrolling::-webkit-scrollbar-thumb {
                background: ${themeProperties.scrollColor};
              }
            `}
          </style>

          <div className="flex items-center justify-center fixed mt-4 -top-5 z-[1000] -translate-x-1/2 left-1/2">
            <Box sx={{}}>
              <Toolbar>
                <Search
                  style={{
                    background: themeProperties.inputBackground,
                    color: themeProperties.inputTextColor,
                  }}
                >
                  <SearchIconWrapper>
                    <SearchIcon
                      style={{
                        color: themeProperties.inputTextColor,
                      }}
                    />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    style={{
                      color: themeProperties.inputTextColor,
                      borderRadius: "20px",
                    }}
                  />
                </Search>
              </Toolbar>

              {/* Refresh button */}
              <div className="">
                <IoMdRefresh
                  size={20}
                  className={`cursor-pointer absolute top-10 left-2 ${
                    refreshLoading ? "animate-spin" : ""
                  }`}
                  onClick={() => {
                    if (disableRefresh) {
                      return;
                    }
                    refresh();
                  }}
                  style={{
                    color: themeProperties.textColor,
                  }}
                />
              </div>
            </Box>
          </div>

          {refreshLoading ? (
            <></>
          ) : (
            <div className="">
              {uniqueMails &&
                Object.values(uniqueMails).map((mail, index) => (
                  <button
                    key={index}
                    onClick={() => openMsg(mail)}
                    className={`mail flex w-full h-20 mb-2 mt-4 rounded-[10px] outline-none border transition-all duration-300 ease-in-out`}
                    disableRipple
                    disableElevation
                    style={{
                      backgroundColor:
                        selectedMail === mail?.id
                          ? themeProperties?.normal1
                          : "",
                      color:
                        selectedMail === mail?.id
                          ? themeProperties?.textColorAlt
                          : "",
                      boxShadow:
                        selectedMail === mail?.id
                          ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                          : "none",
                      display:
                        extractName(mail.from) === "Mail Delivery Subsystem"
                          ? "none"
                          : "block",
                      marginTop: "10px !important",
                      marginBottom: "10px !important",
                      borderRadius: "10px",
                      border: "1px solid #e5e5e5",
                      "--hover-color": themeProperties?.textColorAlt,
                      "--hover-bg": themeProperties?.normal1,
                    }}
                  >
                    <style>
                      {`
                    .mail{
                      color : ${themeProperties?.textColor};
                    }
                    
                    .mail:hover 
                    { color: var(--hover-color); 
                    background-color: var(--hover-bg); }`}
                    </style>

                    <div className="w-full text-left p-3">
                      <div className="flex overflow-hidden whitespace-nowrap text-ellipsis">
                        <h4 className="font-medium text-sm mt-1">
                          {extractName(mail?.from)}
                        </h4>
                        <span className="text-xs ml-auto self-center font-light">
                          {getTime(mail?.date)}
                        </span>
                      </div>
                      <p className="font-light text-[10px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {mail?.subject} - {mail?.snippet}
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          )}

          {loading && (
            <div>
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div
                  key={item}
                  className="w-full h-20 mb-0 mt-4 rounded-[10px] outline-none transition-all duration-300 ease-in-out -z-20"
                >
                  <Skeleton
                    animation="wave"
                    sx={{
                      bgcolor: "grey.100",
                      height: "120px",
                      width: "100%",
                      borderRadius: "10px",
                      margin: "0 !important",
                      padding: "0 !important",
                      position: "relative",
                      transformOrigin: "0 0",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel>
        <div className="h-[90vh] overflow-y-auto">
          {value && Object.keys(value).length > 0 && (
            <InboxMessage
              messageData={value}
              setValue={setValue}
              refreshLoading={refreshLoading}
              disableRefresh={disableRefresh}
            />
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Mail;