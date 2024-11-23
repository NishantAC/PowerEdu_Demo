import React, { useEffect, useState } from "react";
import FavouriteMessage from "./FavouriteMessage";
import styles from "../Inbox/InboxMessage.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { getTime } from "../../../../common/Time";
import { getStarred, getThread } from "../../../../services/mail.service";
import { toast } from "react-toastify";

function FavouriteMail() {
  const [value, setValue] = useState({});
  const [favMails, setFavMails] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");

  useEffect(() => {
    fetchFavMail();
  }, [nextPageToken]);

  const fetchFavMail = async () => {
    const { response, error } = await getStarred({ pageToken: nextPageToken });
    if (error) {
      toast.error("Failed to get Starred mails", { autoClose: 500 });
    } else {
      console.log(response.data, "this is fav mails");
      setFavMails(response.data);
      toast.success("Successfully fetched Starred mails", { autoClose: 500 });
    }
  };

  const handleSearch = (searchInput) => {
    if (searchInput === "") {
      fetchFavMail();
    } else {
      const filteredData = favMails.filter((item) => {
        const name = item.name.toLowerCase();
        const searchInputLowercase = searchInput.toLowerCase();
        // Check if the name includes the search input
        return name.includes(searchInputLowercase);
      });
      setFavMails(filteredData);
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
        {Object.values(favMails).map((m, i, array) => {
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
        })}
        {favMails?.nextPageToken && (
          <div
            className={styles.nextPageBtn}
            onClick={() => setNextPageToken(favMails?.nextPageToken)}
          >
            Next Page
          </div>
        )}
      </div>
      <div className={styles.Maild2}>
        {Object.keys(value).length > 0 && (
          <FavouriteMessage messageData={value} />
        )}
      </div>
    </div>
  );
}

export default FavouriteMail;
