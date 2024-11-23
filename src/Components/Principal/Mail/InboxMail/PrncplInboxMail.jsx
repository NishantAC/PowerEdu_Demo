import './PrncplInboxMsg.css'
import PrncplInboxMsg from './PrncplInboxMsg';
import React, { useEffect, useMemo, useState } from 'react';
import { Avatar } from '@mui/material';
import styles from '../../../teacher/Mail/Inbox/InboxMessage.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { getTime } from '../../../../common/Time';
import { setReadMail } from '../../../../services/mail.service';
import { toast } from 'react-toastify';

function PrncplInboxMail({ fltMails, setFltMails }) {

  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const [value, setValue] = useState({});
  const [inboxmails, setInboxMails] = useState({});

  useEffect(() => {
    //get received mails
    const ReceivedMails = fltMails.filter((M) =>
      (M.parent_email_id !== null || M.receiver_id === user.id) && M.is_deleted === null
    )

    //reverse the mails
    const reversedMails = [...ReceivedMails].reverse();
    const groupedData = {};

    //make an array of same parent msg
    reversedMails.forEach((item) => {
      const { emailid, parent_email_id } = item;

      // If both emailid and parent_email_id are present
      if (emailid && parent_email_id) {
        if (!groupedData[parent_email_id]) {
          groupedData[parent_email_id] = [item]
        }
        else {
          groupedData[parent_email_id].push(item);
        }// If only emailid is present 
      } else if (emailid && !parent_email_id) {
        if (!groupedData[emailid]) {
          groupedData[emailid] = [item]
        }
      }
    })

    //sort by created_at
    for (const key in groupedData) {
      if (groupedData.hasOwnProperty(key)) {
        groupedData[key].sort((a, b) => b.created_at - a.created_at);
      }
    }

    setInboxMails((prevData) => { return { ...prevData, ...groupedData } });
  }, [fltMails]);

  const handelRead = async (msg) => {
    if (!msg[0]) {
      return
    }
    if (msg[0].read) {
      return
    }
    const res = await setReadMail(msg[0].emailid);
    if (res.status === 200) {
      setFltMails(prevData => prevData.map(m => {
        if (m.emailid === msg[0].emailid) {
          return { ...m, read: true };
        } else {
          return m;
        }
      }));
      // toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  }

  const openMsg = (m) => {
    console.log(m);
    handelRead(m);
    setValue(m);
  }

  // console.log(inboxmails);

  return (

    <div className={styles.Mail}>
      <div className={styles.Maild1}>

        <div className={styles.searchBox}>
          <SearchIcon className={styles.SearchIcon} />
          <input
            type="search"
            placeholder="Search Contact" />
        </div>

        {Object.values(inboxmails).map((m) => {
          return (
            <button
              value={value}
              onClick={() => openMsg(m)}
              className={`${styles.selectmsgtype} ${value === 0 ? styles.activecontact : ''}`}>
              <Avatar
                alt={m[0].name}
                src={m[0].image_url}
                className={styles.Avatar} />
              <div className={styles.Avatard1}>
                <div className={styles.Avatard2}>
                  <h4 className={styles.d1h4}>{m[0].name}</h4>
                  <span className={styles.d1h4Span}>{getTime(m[0].updated_at)}</span>
                </div>
                <p className={styles.Maild1P}>{m?.[0].body.substring(0, 26) + "..."}</p>
              </div>
            </button>)
        })}
      </div>
      <div className={styles.Maild2}>
        {Object.keys(value).length > 0 && <PrncplInboxMsg messageData={value} setFltMails={setFltMails} />}
      </div>

    </div>
  )
}

export default PrncplInboxMail;
