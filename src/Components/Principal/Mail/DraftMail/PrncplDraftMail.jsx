import '../InboxMail/PrncplInboxMsg.css'
import PrncplDraftMsg from './PrncplDraftMsg'
import React, { useEffect, useMemo, useState } from 'react';
import { Avatar } from '@mui/material';
import styles from '../../../teacher/Mail/Inbox/InboxMessage.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { getTime } from '../../../../common/Time';

function PrncplDraftMail({ fltMails, setFltMails }) {
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const [draftMails, setDraftMails] = useState([]);
  const [value, setValue] = useState({});

  useEffect(() => {
    const AllDraftedMails = fltMails.filter((M) =>
      M.draft === true && M.sender_id === user.id
    )
    setDraftMails(AllDraftedMails);
  }, [fltMails])

  const openMsg = (d) => {
    setValue(d);
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
        {draftMails.map((d) => {
          return (
            <button
              key={d.emailid}
              value={value}
              onClick={() => openMsg(d)}
              className={`${styles.selectmsgtype} ${value === 0 ? styles.activecontact : ''}`}>
              <Avatar
                alt={d.name}
                src={d.image_url}
                className={styles.Avatar} />
              <div className={styles.Avatard1}>
                <div className={styles.Avatard2}>
                  <h4 className={styles.Draftd1h4}>{d.name}</h4>
                  <span className={styles.d1h4Span}>{getTime(d.updated_at)}</span>
                </div>
                <p className={styles.Maild1P}>{d.body}</p>
              </div>
            </button>)
        })}
      </div>
      <div className={styles.Maild2}>
        {Object.keys(value).length > 0 && <PrncplDraftMsg draftMails={value} setFltMails={setFltMails} />}
      </div>
    </div >
  )
}

export default PrncplDraftMail;

