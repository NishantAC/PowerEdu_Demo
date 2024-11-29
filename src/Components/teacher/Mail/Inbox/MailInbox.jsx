import React, { useState, useEffect, useRef } from "react";
import InboxMessage from "./InboxMessage";
import SearchIcon from "@mui/icons-material/Search";
import { getTime } from "../../../../common/Time";
import { getThread } from "../../../../services/mail.service";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import InfiniteScroll from "react-infinite-scroll-component";
import { alpha } from "@mui/material/styles";
import debounce from 'lodash.debounce';

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

function MailInbox({ inboxMails, fetchMoreMails ,themeProperties, loading, setLoading}) {
  const [value, setValue] = useState({});
  const scrollRef = useRef(null);
  const openMsg = (m) => {
    console.log(m, "single mail");
    getThread({
      pageToken: m.nextPageToken ? m.nextPageToken : null,
      id: m.threadId,
    }).then((res) => {
      console.log(res.response.data);
      setValue(res.response.data);
    });
  };

  useEffect(() => {
    console.log("mailInboc", inboxMails);
    const handleScroll = debounce(() => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollHeight - scrollTop <= clientHeight + 400) {
          console.log("scrolling");
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
  }, [fetchMoreMails, loading]);

  return (
    <div className="flex gap-2 h-full text-black">
      <div className=" h-[550px] overflow-y-auto bg-[#f8f9ff] pt-14 px-3" ref={scrollRef}>
        <div className="flex items-center justify-center rounded-lg ">
        <Box sx={{ }}>
            <Toolbar>
              <Search
                style={{
                  background: themeProperties.inputBackground,
                  color: themeProperties.inputTextColor,
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon style={{
                    color: themeProperties.inputTextColor,
                   }} />
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
                  value === 0 ? "bg-white shadow-md rounded-lg" : ""
                }`}
              >
                <div className="w-full text-left">
                  <div className="flex mb-1 mt-2 overflow-hidden whitespace-nowrap text-ellipsis">
                    <h4 className="font-semibold text-sm text-[#1e1e1e] mt-1">
                      {mail.from}
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
      <div className="w-2/3 h-[600px] overflow-y-auto bg-white pt-5 px-4">
        {value && Object.keys(value).length > 0 && (
          <InboxMessage messageData={value} setValue={setValue} />
        )}
      </div>
    </div>
  );
}

export default MailInbox;