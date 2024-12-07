import '../InboxMail/PrncplInboxMsg.css'
import React from 'react';
;
import { getCurrentTime } from '../../../../common/Time';

function PrncplSentMessage({ messageData }) {

  return (
    <div>
      <div className={styles.sentMessagediv1}></div>
      <p className={styles.Div1P}>{getCurrentTime(messageData.created_at)}</p>
      <div className={styles.Div2P}>
        <p>To:-</p>
        <input className={styles.Input2} type='text' value={messageData.name} />
      </div>
      <div className={styles.Div2P}>
        <p >Subject:-</p>
        <input className={styles.Input2} type='text' value={messageData.subject} />
      </div>
      <br />
      <ul className={styles.attachments}>
        {messageData.attach_type && messageData.attach_type.map((file, i) =>
          <div className={styles.attachchild} key={i} title='download file'>
            <li >
              <a href={messageData.attach_url[i]}
                download={messageData.attach_name?.[i] ?? `File${file}`}
                className={styles.attach_dwnld}
              >
                {messageData.attach_name?.[i] ?? `File${file}`}
              </a>
            </li>
          </div>
        )}
      </ul>
      <br />
      <p className={styles.Message}>{messageData.body}</p>
    </div>
  )
}

export default PrncplSentMessage