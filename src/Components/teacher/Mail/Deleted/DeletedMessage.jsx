import React from 'react';
;
import { getCurrentTime } from '../../../../common/Time';
import DOMPurify from 'dompurify';
import AttachmentLink from '../Sent/AttachmentLink';

function DeletedMessage({ messageData }) {
  const sanitizedHtml = DOMPurify.sanitize(messageData.body);

  return (
    <div>
      <div >
        <div className={styles.deleteHead}>
          <p className={styles.Div1P}>{getCurrentTime(messageData.created_at)}</p>
          <button className={styles.Mailsendbtn} onClick={undoDelete}>Undo</button>
        </div>
        <div className={styles.Div2P}>
          <p>To</p>
          <input className={styles.Input2} type='text' value={messageData.name} disabled />
        </div>
        <div className={styles.Div2P}>
          <p>Subject</p>
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
          <p className={styles.Message} dangerouslySetInnerHTML={{ __html: messageData.body }} ></p>
        }
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
    </div>
  )
}

export default DeletedMessage;