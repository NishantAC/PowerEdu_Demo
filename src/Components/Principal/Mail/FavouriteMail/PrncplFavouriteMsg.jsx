import '../InboxMail/PrncplInboxMsg.css';
import React, { useRef, useState } from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import styles from '../../../teacher/Mail/Inbox/InboxMessage.module.css';
import DeleteModal from '../../../teacher/Mail/Deleted/DeleteModal';
import { MakefavouriteMail } from '../../../../services/mail.service';
import { toast } from 'react-toastify';
import ReactToPrint from "react-to-print";
import { getCurrentTime } from '../../../../common/Time';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#F8F8F8',
    color: 'rgba(0, 0, 0, 0.53)',
    fontSize: '12px',
    fontStyle: 'normal',
    lineHeight: '24px',
    padding: '1px 5px',
    marginBottom: '10px'
  },
}));

function PrncplFavouriteMsg({ messageData, setFltMails }) {
  //print
  const componentRef = useRef();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //handel fav
  const handleFavourite = async () => {
    const res = await MakefavouriteMail(messageData.emailid);
    console.log(res.data.message);
    if (res.status === 200) {
      setFltMails(prevData => prevData.map(m => {
        if (m.emailid === messageData.emailid) {
          return { ...m, is_favorite: !m.is_favorite };
        } else {
          return m;
        }
      }));
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  }

  return (
    <div>
      {/*print style*/}
      <style>
        {`@media print {
                        .printme{
                            margin-top:20px;
                        }
                        .printme p,input,a{
                            font-size: 1.2rem !important;
                        }
                        .printme button{
                            display:none;
                        }
                    }`
        }
      </style>
      {/*head*/}
      <div className={styles.Messagediv1}>
        <HtmlTooltip title="Favourites" placement="left-end">
          <StarOutlinedIcon className={styles.Mailicon1} style={{ color: '#FFE500' }} onClick={handleFavourite} />
        </HtmlTooltip>
        <ReactToPrint
          trigger={() => <HtmlTooltip title="Print" placement="left-end"><PrintOutlinedIcon className={styles.Mailicon2} /></HtmlTooltip>}
          content={() => componentRef.current}
        />
        <HtmlTooltip title="Delete" placement="left-end">
          <DeleteOutlineOutlinedIcon onClick={handleOpen} className={styles.Mailicon3} />
        </HtmlTooltip>
        {open && <DeleteModal open={open} handleClose={handleClose} messageData={messageData} setFltMails={setFltMails} />}
      </div>
      {/*body*/}
      <div ref={componentRef} className='printme'>
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
            <div className={styles.attachchild} key={i} title='download File'>
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
    </div>
  )
}

export default PrncplFavouriteMsg