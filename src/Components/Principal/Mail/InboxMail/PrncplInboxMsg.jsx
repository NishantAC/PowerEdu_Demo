import './PrncplInboxMsg.css';
import React, { useState, useRef, useMemo } from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Avatar from '@mui/material/Avatar';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import styles from '../../../teacher/Mail/Inbox/InboxMessage.module.css';
import DeleteModal from '../../../teacher/Mail/Deleted/DeleteModal';
import { List, ListItem, Collapse, ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ReplyForwardMail from '../../../teacher/Mail/ReplyForwardMail/ReplyForwardMail';
import { MakefavouriteMail } from '../../../../services/mail.service';
import { toast } from 'react-toastify';
import ReactToPrint from "react-to-print";
import { getCurrentTime } from '../../../../common/Time';
import { useSelector } from 'react-redux';

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


function PrncplInboxMsg({ messageData, setFltMails }) {
    const user = useSelector((state) => state.auth.user);
    //print
    const componentRef = useRef();

    //modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //shrink
    const [selectedIndex, setSelectedIndex] = useState(messageData.length - 1);
    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    //favourite
    const handleFavourite = async () => {
        const res = await MakefavouriteMail(messageData[0].emailid);
        if (res.status === 200) {
            setFltMails(prevData => prevData.map(m => {
                if (m.emailid === messageData[0].emailid) {
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
        <>
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
                    <StarOutlinedIcon className={styles.Mailicon1} onClick={handleFavourite} style={{ color: messageData.is_favorite && '#FFE500' }} />
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
                <p className={styles.Div1P}>{getCurrentTime(messageData[0].created_at)}</p>
                <p className={styles.Inboxdiv1P2}>Suggestion For the event</p>
                {/*body*/}
                <div style={{ display: 'inline-block', width: "80%" }} >
                    <List style={{ display: 'block' }}>
                        {messageData.map((m, i) => {
                            return (
                                <div key={m.emailid}>
                                    <ListItemButton button onClick={() => handleListItemClick(i)}>
                                        {user.id === m.receiver_id ? <>
                                            <Avatar
                                                alt={m.name}
                                                src={m.image_url}
                                                className={styles.Avatar} />
                                            <p className={styles.AvatarP1}>{m.name}</p></>
                                            : <p className={styles.AvatarP1}>You</p>}
                                        <p className={styles.AvatarP2}>{m.body.substring(0, 60) + '............'}</p>
                                        {selectedIndex === i ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse style={{ display: 'inline-block' }} in={selectedIndex === i} timeout="auto" unmountOnExit>
                                        <ListItem style={{ display: 'inline-block' }}>
                                            <ul className={styles.attachments}>
                                                {m.attach_type && m.attach_type.map((file, i) =>
                                                    <div className={styles.attachchild} key={i}>
                                                        <li >
                                                            <a href={m.attach_url[i]}
                                                                download={m.attach_name?.[i] ?? `File${file}`}
                                                                className={styles.attach_dwnld}
                                                            >
                                                                {m.attach_name?.[i] ?? `File${file}`}
                                                            </a>
                                                        </li>
                                                    </div>
                                                )}
                                            </ul>
                                            <p className={styles.Message}>{m.subject}<br />{m.body}<br />
                                            </p>
                                        </ListItem>
                                    </Collapse>
                                </div>
                            )
                        })}
                    </List>
                </div >
            </div>
            {/*Forward and reply*/}
            <div style={{ marginTop: '30px', display: 'block' }}>
                <ReplyForwardMail email={messageData[0]} setFltMails={setFltMails} />
            </div >
        </>
    )
}

export default PrncplInboxMsg;

