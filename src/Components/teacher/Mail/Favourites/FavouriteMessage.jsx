import React from 'react';
import styles from '../Inbox/InboxMessage.module.css';
import { getCurrentTime } from '../../../../common/Time';
import DOMPurify from 'dompurify';
import AttachmentLink from '../Sent/AttachmentLink';

function FavouriteMessage({ messageData }) {
  const sanitizedHtml = DOMPurify.sanitize(messageData.body);
  console.log(messageData)
  return (
    <div>
      <div>
        <p className={styles.Div1P}>{getCurrentTime(messageData.date)}</p>
        <div className={styles.Div2P}>
          <p>From</p>
          <input className={styles.Input2} type='text' value={messageData.from} disabled />
        </div>
        <div className={styles.Div2P}>
          <p >Subject</p>
          <input className={styles.Input2} type='text' value={messageData.subject} disabled />
        </div>
        <br />
        {
          messageData.body.startsWith('<!DOCTYPE') ?
          <iframe
            title="Message Body"
            style={{ border: 'none', width: '100%', minHeight: '300px' }}
            srcDoc={sanitizedHtml}
          /> :
          <p style={{ border: 'none', width: '100%', minHeight: '300px' }} dangerouslySetInnerHTML={{ __html: messageData.body }} ></p>
        }
      </div>
      <br />
      <ul className={styles.attachments}>
        {/* Attachments */}
        {messageData.attachments.length > 0 && 
          messageData.attachments.map((file,i) => (
            <ul key={i} className={styles.attachments}>
              <AttachmentLink mimeType={file.dataType} base64Data={file.data} fileName={`attachment-${i+1}`}/>
            </ul>
          ))
        }
      </ul>
    </div>
  )
}

export default FavouriteMessage