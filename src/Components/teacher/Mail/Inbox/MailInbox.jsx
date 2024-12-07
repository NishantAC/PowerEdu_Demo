import React, { useState, useEffect, useRef } from "react";
import InboxMessage from "./InboxMessage";
import SearchIcon from "@mui/icons-material/Search";
import { getTime } from "../../../../common/Time";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import InfiniteScroll from "react-infinite-scroll-component";
import { alpha } from "@mui/material/styles";
import debounce from 'lodash.debounce';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: theme.properties?.inputBackground || alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out',
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: theme.spacing(2),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

function MailInbox({ inboxMails, fetchMoreMails, themeProperties, loading, setLoading }) {
  const [value, setValue] = useState({});
  const [selectedMail, setSelectedMail] = useState(null); // Add state for selected mail
  const scrollRef = useRef(null);

  const openMsg = (mail) => {
    setSelectedMail(mail.threadId);
    setValue(mail);
  };

  useEffect(() => {
    if (inboxMails && inboxMails.length > 0) {
      openMsg(inboxMails[0]); 
    }
    const handleScroll = debounce(() => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollHeight - scrollTop <= clientHeight + 400) {
          if (loading) { return; }
          fetchMoreMails();
          setLoading(true);
        }
      }
    }, 300);

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [fetchMoreMails, loading, inboxMails]);

  useEffect(() => {
    const renderStartTime = performance.now();
    return () => {
      const renderEndTime = performance.now();
      console.log(`Rendering time: ${renderEndTime - renderStartTime} ms`);
    };
  }, [value]);

  const extractName = (from) => {
    const match = from.match(/^(.*?)\s*</);
    return match ? match[1] : from;
  };
  

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={20}  defaultSize={30} maxSize={40}>
      <div className="h-[600px] overflow-y-auto bg-[#f8f9ff] pt-14 px-3" ref={scrollRef}>
        <div className="flex items-center justify-center rounded-lg">
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
                  inputProps={{ 'aria-label': 'search' }}
                  style={{
                    color: themeProperties.inputTextColor,
                    borderRadius: '20px',
                  }}
                />
              </Search>
            </Toolbar>
          </Box>
        </div>

        {inboxMails &&
          Object.values(inboxMails).map((mail, index) => (
            <button
              key={index}
              value={value}
              onClick={() => openMsg(mail)}
              className={`flex w-full h-20 mb-2 border border-transparent ${
                selectedMail === mail.threadId ? "bg-white shadow-md rounded-lg" : ""
              }`} // Highlight selected mail
            >
              <div className="w-full text-left">
                <div className="flex mb-1 mt-2 overflow-hidden whitespace-nowrap text-ellipsis">
                  <h4 className="font-semibold text-sm text-[#1e1e1e] mt-1">
                  {extractName(mail.from)}
                  </h4>
                  <span className="text-xs text-[#1e1e1e] ml-auto self-center font-light">
                    {getTime(mail.date)}
                  </span>
                </div>
                <p className="text-gray-500 font-medium text-xs overflow-hidden whitespace-nowrap text-ellipsis">
                  {mail.subject}
                </p>
              </div>
            </button>
          ))}

        {loading && (
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-t-[4px] rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
      <div className=" h-[600px] overflow-y-auto bg-white pt-5 px-4">
        {value && Object.keys(value).length > 0 && (
          <InboxMessage messageData={value} setValue={setValue} />
        )}
      </div>
      </ResizablePanel>
      </ResizablePanelGroup>
  );
}

export default MailInbox;