import React, { useEffect, useMemo, useState } from "react";
// 
import { Avatar } from "@mui/material";
import SentMessage from "./SentMessage";
import SearchIcon from "@mui/icons-material/Search";
import { getTime } from "../../../../common/Time";
import { getSentMails } from "../../../../services/mail.service";
import { toast } from "react-toastify";

function SentMail() {
  const [value, setValue] = useState({});
  const [sentMails, setSentMails] = useState([]);
  console.log(sentMails,"285183562158351625352153521735215385185382157")
  const [nextPageToken, setNextPageToken] = useState("");

  useEffect(() => {
    fetchSentMail();
  }, [nextPageToken]);

  const fetchSentMail = async () => {
    const { response, error } = await getSentMails({
      pageToken: nextPageToken,
    });

    if (error) {
      toast.error("Failed to get sent mails", { autoClose: 500 });
    } else {
      setSentMails(response.data);
      toast.success("Successfully fetched sent mails", { autoClose: 500 });
    }
  };

  const handleSearch = (searchInput) => {
    if (searchInput === "") {
      fetchSentMail(); // Fetch all mails if the search input is empty
    } else {
      const filteredData = sentMails.mails.filter((item) => {
        const from = item.from.toLowerCase(); // Changed from 'item.name' to 'item.from'
        const subject = item.subject.toLowerCase();
        const searchInputLowercase = searchInput.toLowerCase();
        // Check if the 'from' or 'subject' includes the search input
        return from.includes(searchInputLowercase) || subject.includes(searchInputLowercase);
      });
      setSentMails({ ...sentMails, mails: filteredData }); // Update only the mails part
    }
  };
  

  const openMsg = (m) => {
    setValue(m);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex items-center mb-4">
          <SearchIcon className="mr-2" />
          <input
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search Contact"
            className="border p-2 rounded"
          />
        </div>
        {sentMails?.mails?.map((m, i) => {
          if (m.id) {
            return (
              <button
                key={m.id}
                value={value}
                onClick={() => openMsg(m)}
                className={`p-4 border rounded mb-2 ${value === 0 ? "bg-blue-100" : ""}`}
              >
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <h4 className="font-bold">{m.from.split("<")[0]}</h4>
                    <span className="text-gray-500">{getTime(m.date)}</span>
                  </div>
                  <p className="ml-4">{m.subject}</p>
                </div>
              </button>
            );
          }
        })}
        {sentMails?.nextPageToken && (
          <div
            className="p-4 border rounded mt-4 cursor-pointer"
            onClick={() => setNextPageToken(sentMails?.nextPageToken)}
          >
            Next Page
          </div>
        )}
      </div>
      <div className="flex flex-col mt-4">
        {Object.keys(value).length > 0 && <SentMessage messageData={value} />}
      </div>
    </div>
  );  
}

export default SentMail;
