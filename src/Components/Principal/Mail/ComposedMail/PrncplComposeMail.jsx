import '../InboxMail/PrncplInboxMsg.css'
import PrncplComposeMsg from './PrncplComposeMsg';
import React, { useEffect, useRef, useState } from 'react';
import { Avatar } from '@mui/material';
import styles from '../../../teacher/Mail/Inbox/InboxMessage.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { getTime } from '../../../../common/Time';

function PrncplComposeMail({ fltMails, setFltMails }) {

  const [recentContact, setRecentContact] = useState([]);

  useEffect(() => {
    const distinctData = getDistinctElementsByMostRecentUpdateTime(fltMails);
    setRecentContact(distinctData);
  }, [fltMails])


  const getDistinctElementsByMostRecentUpdateTime = (data) => {

    // Create an object to store the most recent element for each receiverid
    const mostRecentElementsBySenderid = {};

    data.forEach((item) => {
      if (item.is_deleted === null) {
        // Check if the receiverid is already in the object
        if (item.receiver_id in mostRecentElementsBySenderid) {
          // update by most recent updatetime
          if (item.updated_at > mostRecentElementsBySenderid[item.receiver_id].updated_at) {
            // Update the stored item if the current item is more recent
            mostRecentElementsBySenderid[item.receiver_id] = item;
          }
        } else {
          // if object doesnt exist in object in array
          mostRecentElementsBySenderid[item.receiver_id] = item;
        }
      }
    });
    // Return an array of the most recent elements for each receiverid
    return Object.values(mostRecentElementsBySenderid);
  };

  const [value, setValue] = useState({});

  const openMsg = (m) => {
    setValue(m);
  }

  return (
    <div className={styles.Mail}>
      <div className={styles.Maild1}>
        <div className={styles.searchBox}>
          <SearchIcon className={styles.SearchIcon} />
          <input
            type="search"
            placeholder="Search Contact" />
        </div>
        {recentContact?.map((m) => {
          return (<button
            key={m.emailid}
            value={value}
            onClick={() => openMsg(m)}
            className={`${styles.selectmsgtype} ${value === 0 ? styles.activecontact : ''}`}>
            <Avatar
              alt={m.name}
              src={m.image_url}
              className={styles.Avatar} />
            <div className={styles.Avatard1}>
              <div className={styles.Avatard2}>
                <h4 className={styles.d1h4}>{m.name}</h4>
                <span className={styles.d1h4Span}>{getTime(m.created_at)}</span>
              </div>
              <p className={styles.Maild1P}>{m?.body.substring(0, 26) + "..."}</p>
            </div>
          </button>)
        })}

      </div>
      <div className={styles.Maild2}>
        {Object.keys(value).length > 0 ? <PrncplComposeMsg messageData={value} setFltMails={setFltMails} /> : <PrncplComposeMsg setFltMails={setFltMails} />}
      </div>

    </div>
  )
}

export default PrncplComposeMail;

