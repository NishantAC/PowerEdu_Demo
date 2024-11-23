import React, { useEffect, useMemo, useState } from "react";
import InboxMessage from "./InboxMessage";
import { Avatar } from "@mui/material";
import styles from "./InboxMessage.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { getTime } from "../../../../common/Time";
import { getThread, setReadMail } from "../../../../services/mail.service";
import { toast } from "react-toastify";

function MailInbox({ inboxMails }) {
  console.log(inboxMails, "this is inbox mail");

  const [value, setValue] = useState({});

  const openMsg = (m) => {
    console.log(m, "single mail");
    getThread({
      pageToken: m.nextPageToken ? m.nextPageToken : null,
      id: m.threadId,
    }).then((res) => {
      // get all thread for the email
      console.log(res.response.data);
      setValue(res.response.data);
    });
  };

  // console.log(inboxmails);

  return (
    <div className={styles.Mail}>
      <div className={styles.Maild1}>
        <div className={styles.searchBox}>
          <SearchIcon className={styles.SearchIcon} />
          <input type="search" placeholder="Search Contact" />
        </div>

        {inboxMails &&
          Object.values(inboxMails).map((mail) => {
            return (
              <button
                value={value}
                onClick={() => openMsg(mail)}
                className={`${styles.selectmsgtype} ${
                  value === 0 ? styles.activecontact : ""
                }`}
              >
                <div className={styles.Avatard1}>
                  <div className={styles.Avatard2}>
                    <h4 className={styles.d1h4}>{mail.from}</h4>
                    <span className={styles.d1h4Span}>
                      {getTime(mail.date)}
                    </span>
                  </div>
                  <p className={styles.Maild1P}>{mail.subject}</p>
                </div>
              </button>
            );
          })}
      </div>
      <div className={styles.Maild2}>
        {value && Object.keys(value).length > 0 && (
          <InboxMessage messageData={value} setValue={setValue} />
        )}
      </div>
    </div>
  );
}

export default MailInbox;
