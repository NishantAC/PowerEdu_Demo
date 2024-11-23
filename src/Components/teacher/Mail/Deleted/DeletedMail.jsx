import React, { useEffect, useMemo, useState } from 'react';
// import '../Inbox/InboxMessage.css'
import { Avatar } from '@mui/material';
import DeletedMessage from './DeletedMessage';
import styles from '../Inbox/InboxMessage.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { getTime } from '../../../../common/Time';
import { getTrashMails } from '../../../../services/mail.service';
import { toast } from 'react-toastify';

function DeletedMail() {
  const [value, setValue] = useState({});
  const [deletedMails, setDeletedMails] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');

  useEffect(() => {
    fetchSentMail();
  },[nextPageToken]);

  const fetchSentMail = async() => {
    const { response, error } = await getTrashMails({pageToken: nextPageToken});
    if (error) {
      toast.error("Failed to get sent mails", { autoClose: 500 });
    } else {
      setDeletedMails(response.data);
      toast.success(response.data.message || "Successfully fetched sent mails", { autoClose: 500 });
    }
  }

  const handleSearch = (searchInput) => {
    if (searchInput === "") {
      fetchSentMail();
    } else {
      const filteredData = deletedMails.filter((item) => {
        const name = (item.name).toLowerCase();
        const searchInputLowercase = searchInput.toLowerCase();
        // Check if the name includes the search input
        return name.includes(searchInputLowercase);
      });
      setDeletedMails(filteredData);
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
        {Object.values(deletedMails).map((m, i, array) => {
          if (i < array.length - 1) {
            return (
            <button
              key={m.id}
              value={value}
              onClick={() => openMsg(m)}
              className={`${styles.selectmsgtype} ${value === 0 ? styles.activecontact : ''}`}>
              <div className={styles.Avatard1}>
                <div className={styles.Avatard2}>
                  <h4 className={styles.d1h4}>{m.from.split('<')[0]}</h4>
                  <span className={styles.d1h4Span}>{getTime(m.date)}</span>
                </div>
                <p className={styles.Maild1P} >{m.subject}</p>
              </div>
            </button>
            );
          }
        })}
        {
          deletedMails?.nextPageToken &&
          <div className={styles.nextPageBtn} onClick={()=> setNextPageToken(deletedMails?.nextPageToken)}>Next Page</div>
        }
      </div>
      <div className={styles.Maild2}>
        {Object.keys(value).length > 0 && <DeletedMessage messageData={value} />}
      </div>
    </div>
  )
}

export default DeletedMail;
