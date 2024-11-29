import '../InboxMail/PrncplInboxMsg.css'
import PrncplSentMsg from './PrncplSentMsg'
import React, { useEffect, useMemo, useState } from 'react';
import { Avatar } from '@mui/material';
import styles from '../../../teacher/Mail/Inbox/InboxMessage.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { getTime } from '../../../../common/Time';
import { useSelector } from 'react-redux';


function PrncplSentMail({ fltMails }) {
  const user = useSelector((state) => state.auth.user);
  const [value, setValue] = useState({});
  const [sentMails, setSentMails] = useState([]);

  useEffect(() => {
    updateStateOfmail();
  }, [fltMails]);

  const updateStateOfmail = () => {
    const SendedMails = fltMails.filter((M) =>
      M.sender_id === user.id && M.draft === false
    )
    setSentMails(SendedMails);
  }

  const handleSearch = (searchInput) => {
    if (searchInput === "") {
      updateStateOfmail();
    } else {
      const filteredData = sentMails.filter((item) => {
        const name = (item.name).toLowerCase();
        const searchInputLowercase = searchInput.toLowerCase();
        // Check if the name includes the search input
        return name.includes(searchInputLowercase);
      });
      setSentMails(filteredData);
    }
  };


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
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search Contact" />
        </div>
        {sentMails?.map((m) => {
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
                <span className={styles.d1h4Span}>{getTime(m.updated_at)}</span>
              </div>
              <p className={styles.Maild1P}>{m?.body.substring(0, 26) + "..."}</p>
            </div>
          </button>)
        })}
      </div>
      <div className={styles.Maild2}>
        {Object.keys(value).length > 0 && <PrncplSentMsg messageData={value} />}
      </div>
    </div>
  )
}

export default PrncplSentMail

