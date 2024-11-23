import React from 'react';
import ComposeMessage from './CMail';
import styles from '../Inbox/InboxMessage.module.css';

function ComposeMail() {

  return (
    <div className={styles.Mail}>
      <div className={styles.Maild2}>
        <ComposeMessage />
      </div>
    </div>
  )
}

export default ComposeMail;
