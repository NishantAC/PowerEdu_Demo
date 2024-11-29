import { DeleteOutline } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import styles from "../Inbox/InboxMessage.module.css";
import SendIcon from "@mui/icons-material/Send";
import {
  fetchAllUsername,
  forwardMail,
  sendMail,
} from "../../../../services/mail.service";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

function ForwardMessage({ email, setForward, forward, attachments }) {
  const user = useSelector((state) => state.auth.user);
  const [recipient, setRecipient] = useState("");
  const [mailType, setMailType] = useState("forward");
  const [err, setErr] = useState(false);

  //suggest state
  const [showPopup, setShowPopup] = useState(false);
  const [userNames, setUserNames] = useState([]);
  const [selectedId, setSelectedId] = useState({});

  /**
   * selected user - acc to text
   */
  const handleSelectUser = (popuser) => {
    setRecipient(popuser.firstname + " " + popuser.lastname);
    setSelectedId(popuser.id);
    setShowPopup(false);
  };

  //on user typing action get names
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (recipient.length > 0) {
        const data = await fetchAllUsername({
          name: recipient.split(" ")[0],
          schoolcode: user?.schoolcode,
        });
        if (data) {
          setUserNames(data);
          setShowPopup(true);
        } else {
          setUserNames([]);
          toast.error("no user found");
        }
      } else {
        setUserNames([]);
        setShowPopup(false);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [recipient]);

  //submit
  const submitForward = async () => {
    //to is empty return
    if (recipient == "") {
      setErr(true);
      return;
    }

    const res = await forwardMail({ threadId: email[0].threadId, recipient });
    if (res.response.status === 200) {
      toast.success(res.response.data.data, { autoClose: 500 });
    } else {
      toast.error(res.response.data.data, { autoClose: 500 });
    }
  };

  return (
    <div style={{ width: "95%" }} className={styles.Messagediv2}>
      <div className={styles.Div2P}>
        <p>To:-</p>
        <input
          className={styles.Input2}
          type="text"
          value={recipient}
          id="to"
          onChange={(event) => setRecipient(event.target.value)}
        />
      </div>
      {err && <p style={{ color: "red", margin: 0 }}>To can not be empty</p>}
      {showPopup && (
        <ul className={styles.ContactSuggestion}>
          {userNames.length > 0 &&
            userNames.map((user) => (
              <li key={user.id} onClick={() => handleSelectUser(user)}>
                <Avatar alt={user.firstname} src={user.image_url} />
                <div>
                  <p>{user.firstname + " " + user.lastname}</p>
                  <span>{user.id}</span>
                </div>
              </li>
            ))}
        </ul>
      )}
      <br />
      <p className={styles.message}>{email.body}</p>
      <div>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <DeleteOutline
            className={styles.ImgIcon}
            onClick={() => setForward(!forward)}
          />
        </IconButton>

        <button className={styles.Mailsendbtn} onClick={submitForward}>
          Send
          <SendIcon className={styles.SendIcon} />
        </button>
      </div>
    </div>
  );
}

export default ForwardMessage;
