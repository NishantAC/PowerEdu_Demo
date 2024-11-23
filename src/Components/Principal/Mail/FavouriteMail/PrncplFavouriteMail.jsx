import '../InboxMail/PrncplInboxMsg.css'
import PrncplFavouriteMsg from './PrncplFavouriteMsg'
import React, { useEffect, useMemo, useState } from 'react';
import { Avatar } from '@mui/material';
import styles from '../../../teacher/Mail/Inbox/InboxMessage.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { getTime } from '../../../../common/Time';

function PrncplFavouriteMail({ fltMails, setFltMails }) {
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const [value, setValue] = useState({});
  const [favMails, setFavMails] = useState([]);

  useEffect(() => {
    const AllFavMails = fltMails.filter((M) =>
      M.is_favorite === true && M.receiver_id === user.id && M.is_deleted === null
    )
    setFavMails(AllFavMails);
  }, [fltMails])

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
        {favMails?.map((m) => {
          return (<button
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
        {Object.keys(value).length > 0 && <PrncplFavouriteMsg messageData={value} setFltMails={setFltMails} />}
      </div>
    </div>
  )
}

export default PrncplFavouriteMail;

