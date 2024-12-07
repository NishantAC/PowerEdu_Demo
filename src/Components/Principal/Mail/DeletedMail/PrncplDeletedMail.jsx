import '../InboxMail/PrncplInboxMsg.css'
import PrncplDeletedMsg from './PrncplDeletedMsg';
import React, { useEffect, useMemo, useState } from 'react';
import { Avatar } from '@mui/material';
;
import SearchIcon from '@mui/icons-material/Search';
import { getTime } from '../../../../common/Time';

function PrncplDeletedMail({ fltMails, setFltMails }) {
  const user = useSelector((state) => state.auth.user);
  const [value, setValue] = useState({});
  const [deletedMails, setDeletedMails] = useState([]);

  useEffect(() => {
    const AllDeltedMails = fltMails.filter((M) =>
      M.is_deleted !== null && M.receiver_id === user.id
    )
    setDeletedMails(AllDeltedMails);
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

        {deletedMails?.map((m) => {
          return (
            <>
              {
                <button
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
                </button>}
            </>)
        })}
      </div>
      <div className={styles.Maild2}>
        {Object.keys(value).length > 0 && <PrncplDeletedMsg  messageData={value} setFltMails={setFltMails} />}
      </div>

    </div>
  )
}


export default PrncplDeletedMail;
