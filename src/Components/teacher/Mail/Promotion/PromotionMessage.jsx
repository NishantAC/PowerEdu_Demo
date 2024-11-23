import React, { useState, useRef, useMemo } from 'react';
import '../Inbox/InboxMessage.css';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Avatar from '@mui/material/Avatar';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import styles from '../Inbox/InboxMessage.module.css';
import DeleteModal from '../Deleted/DeleteModal';
import { List, ListItem, Collapse, ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { toast } from 'react-toastify';
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify';
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


function PromotionMessage({ messageData, setValue }) {
    //print
    const componentRef = useRef();
    //modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {/*print style*/}
            <style>
                {`@media print {
                        .printme{
                            margin-top:20px;
                        }
                        .printme p{
                            font-size: 2rem;
                        }
                        .printme a{
                            font-size: 1.5rem;
                        }
                    }`
                }
            </style>

            {/*head*/}
            <div className={styles.Messagediv1}>
                <HtmlTooltip title="Favourites" placement="left-end">
                    <StarOutlinedIcon className={styles.Mailicon1} />
                </HtmlTooltip>
                <ReactToPrint
                    trigger={() => <HtmlTooltip title="Print" placement="left-end"><PrintOutlinedIcon className={styles.Mailicon2} /></HtmlTooltip>}
                    content={() => componentRef.current}
                />
                <HtmlTooltip title="Delete" placement="left-end">
                    <DeleteOutlineOutlinedIcon onClick={handleOpen} className={styles.Mailicon3} />
                </HtmlTooltip>
                {open && <DeleteModal open={open} handleClose={handleClose} messageData={messageData[0]} setFltMails={setFltMails} />}
            </div>
            {/*subhead*/}
            <div ref={componentRef} className='printme'>
                <p className={styles.Div1P}>{getCurrentTime(messageData?.date)}</p>
                <p className={styles.Inboxdiv1P2}>{messageData?.subject}</p>
                {/*body*/}
                <div style={{ display: 'inline-block', width: "100%", height: '100%' }} >
                    <iframe
                        title="Message Body"
                        style={{ border: 'none', width: '100%', minHeight: '100rem' }}
                        srcDoc={DOMPurify.sanitize(messageData?.body)}
                    />
                    {/* {  <List style={{ display: 'block' }}>
                        {messageData && Object.values(messageData).map((message, index) => (
                            <div key={index}>
                                <p>{extractNameAndEmail(message?.from)}</p>
                                <Collapse style={{ display: 'inline-block' }} in={true} timeout="auto" unmountOnExit>
                                    <ListItem style={{ display: 'inline-block' }}>
                                        <div className={styles.Message} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message?.body) }} />
                                      <img src={`data:image/png;base64,${message?.attachment}`} /> 
                                    </ListItem>
                                </Collapse>
                            </div>
                        ))}
                    </List>} */}

                </div >
            </div>

        </div>
    )
}

export default PromotionMessage;
