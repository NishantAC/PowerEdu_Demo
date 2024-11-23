import React, { useEffect, useMemo, useState } from "react";
// import '../Inbox/InboxMessage.css'
import { Avatar } from "@mui/material";
import SentMessage from "./SentMessage";
import styles from "../Inbox/InboxMessage.module.css";
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
    <div className={styles.Mail}>
      <div className={styles.Maild1}>
        <div className={styles.searchBox}>
          <SearchIcon className={styles.SearchIcon} />
          <input
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search Contact"
          />
        </div>
        {sentMails?.mails?.map((m, i) => {
          if (m.id) {
            return (
              <button
                key={m.id}
                value={value}
                onClick={() => openMsg(m)}
                className={`${styles.selectmsgtype} ${
                  value === 0 ? styles.activecontact : ""
                }`}
              >
                <div className={styles.Avatard1}>
                  <div className={styles.Avatard2}>
                    <h4 className={styles.d1h4}>{m.from.split("<")[0]}</h4>
                    <span className={styles.d1h4Span}>{getTime(m.date)}</span>
                  </div>
                  <p className={styles.Maild1P}>{m.subject}</p>
                </div>
              </button>
            );
          }
        })}
        {sentMails?.nextPageToken && (
          <div
            className={styles.nextPageBtn}
            onClick={() => setNextPageToken(sentMails?.nextPageToken)}
          >
            Next Page
          </div>
        )}
      </div>
      <div className={styles.Maild2}>
        {Object.keys(value).length > 0 && <SentMessage messageData={value} />}
      </div>
    </div>
  );
}

export default SentMail;
