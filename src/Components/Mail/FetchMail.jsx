


export const fetchMails = (mailType, body, id) => {
     switch (mailType) {
     case "inbox":
          return getInboxMails(body);
     case "sent":
          return getSentMails(body);
     case "draft":
          return getDraftMails(body);
     case "trash":
          return getTrashMails(body);
     default:
          return getInboxMails(body);
     }
     };