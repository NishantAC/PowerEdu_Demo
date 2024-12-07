import '../InboxMail/PrncplInboxMsg.css';
import React, { useRef, useState } from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
;
import DeleteModal from '../../../teacher/Mail/Deleted/DeleteModal';
import { undoDeletedMail } from '../../../../services/mail.service';
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

function PrncplDeletedMessage({ messageData, setFltMails }) {

  const componentRef = useRef();


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const undoDelete = async () => {
    const data = await undoDeletedMail(messageData.emailid);
    console.log(data);
    if (data.status === 200) {
      setFltMails(prevData => prevData.map(m => {
        if (m.emailid === messageData.emailid) {
          return { ...m, is_deleted: null };
        } else {
          return m;
        }
      }));
      toast.success(data.data.message, { autoClose: 500 });
    } else {
      toast.error(data.data.message, { autoClose: 500 });
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
      <div className={styles.Messagediv1}>
        <HtmlTooltip title="Favourites" placement="left-end">
          <StarOutlinedIcon className={styles.Mailicon1} style={{ color: messageData.is_favorite && '#FFE500' }} />
        </HtmlTooltip>
        <ReactToPrint
          trigger={() => <HtmlTooltip title="Print" placement="left-end"><PrintOutlinedIcon className={styles.Mailicon2} /></HtmlTooltip>}
          content={() => componentRef.current}
        />
        <HtmlTooltip title="Delete" placement="left-end">
          <DeleteOutlineOutlinedIcon onClick={handleOpen} className={styles.Mailicon3} />
        </HtmlTooltip>
        {open && <DeleteModal open={open} handleClose={handleClose} />}
      </div>
      {/* <div className={styles.DeleteMessagediv1}></div> */}
      <div ref={componentRef} className='printme'>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginRight: "30px" }}>
          <p className={styles.Div1P}>{getCurrentTime(messageData.created_at)}</p>
          <button className={styles.Mailsendbtn} onClick={undoDelete}>Undo</button>
        </div>
        <div className={styles.Div2P}>
          <p>To:-</p>
          <input className={styles.Input2} type='text' value={messageData.name} />
        </div>
        <div className={styles.Div2P}>
          <p>Subject:-</p>
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
    </div>
  )
}

export default PrncplDeletedMessage;