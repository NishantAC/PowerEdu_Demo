import React, { useEffect, useState } from 'react';
import DraftMessage from './DraftMessage';
;
import SearchIcon from '@mui/icons-material/Search';
import { getTime } from '../../../../common/Time';
import { getDraftMails } from '../../../../services/mail.service';
import { toast } from 'react-toastify';

function DraftMail() {
  const [value, setValue] = useState({});
  const [draftMails, setDraftMails] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');

  useEffect(() => {
    fetchDraftMail();
  }, [nextPageToken]);

  const fetchDraftMail = async () => {
    const { response, error } = await getDraftMails({ pageToken: nextPageToken });
    if (error) {
      toast.error("Failed to get draft mails", { autoClose: 500 });
    } else {
      // Check if response.data is an array, filter out any invalid entries
      const validMails = Array.isArray(response?.data) ? response.data.filter(mail => mail && mail.id) : [];
      setDraftMails(validMails);
      toast.success("Successfully fetched draft mails", { autoClose: 500 });
    }
  };

  const handleSearch = (searchInput) => {
    if (searchInput === "") {
      fetchDraftMail();
    } else {
      const filteredData = draftMails.filter((item) => {
        const name = item.name.toLowerCase();
        const searchInputLowercase = searchInput.toLowerCase();
        return name.includes(searchInputLowercase);
      });
      setDraftMails(filteredData);
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
            placeholder="Search Contact" />
        </div>
        {draftMails.map((m) => {
          return (
            <button
              key={m.id}
              onClick={() => openMsg(m)}
              className={`${styles.selectmsgtype} ${value === m ? styles.activecontact : ''}`}>
              <div className={styles.Avatard1}>
                <div className={styles.Avatard2}>
                  <h4 className={styles.d1h4}>{m.from.split('<')[0]}</h4>
                  <span className={styles.d1h4Span}>{getTime(m.date)}</span>
                </div>
                <p className={styles.Maild1P}>{m.subject}</p>
              </div>
            </button>
          );
        })}
        {nextPageToken && (
          <div className={styles.nextPageBtn} onClick={() => setNextPageToken(draftMails?.nextPageToken)}>
            Next Page
          </div>
        )}
      </div>
      <div className={styles.Maild2}>
        {Object.keys(value).length > 0 && <DraftMessage messageData={value} />}
      </div>
    </div>
  );
}

export default DraftMail;
