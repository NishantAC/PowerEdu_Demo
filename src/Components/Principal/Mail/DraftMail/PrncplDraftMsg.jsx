import '../InboxMail/PrncplInboxMsg.css'
import React, { useState, useEffect, useMemo, useRef } from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Editor } from "react-draft-wysiwyg";
import { convertFromHTML, EditorState, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendIcon from '@mui/icons-material/Send';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import styles from '../../../teacher/Mail/Inbox/InboxMessage.module.css';
import { Avatar, IconButton } from '@mui/material';
import DeleteModal from '../../../teacher/Mail/Deleted/DeleteModal';
import ImageModal from '../../../teacher/Mail/ComposeMail/ImageModal';
import ClearIcon from '@mui/icons-material/Clear';
import { MakefavouriteMail, fetchAllUsername, sendMail } from '../../../../services/mail.service';
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    px: 2,
    py: 2
};

function PrncplDraftMsg({ draftMails, setFltMails }) {

    const componentRef = useRef();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const user = useMemo(() => JSON.parse(localStorage.getItem("user")), [])

    //form state
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [editorState, setEditorState] = useState();
    const [err, setErr] = useState(false);
    const [attachments, setAttachments] = useState([]);

    //suggest state
    const [showPopup, setShowPopup] = useState(false);
    const [userNames, setUserNames] = useState([]);
    const [selectedId, setSelectedId] = useState({});

    useEffect(() => {
        setRecipient(draftMails.name);
        setSubject(draftMails.subject);
        setSelectedId(draftMails.receiver_id);
        // setAttachments();
    }, [draftMails])

    /**
    * * File
    */
    const handleFileChange = (event) => {
        //convert to array
        const files = Array.from(event.target.files);
        //check file size
        const validFiles = files.filter((file) => {
            if (file.type.startsWith('image/') && file.size > 3 * 1024 * 1024) {
                alert('Image files must be less than 3MB');
                return false;
            } else if (file.size > 15 * 1024 * 1024) {
                alert('Files must be less than 15MB');
                return false;
            }
            return true;
        });

        setAttachments([...attachments, ...validFiles]);
    };

    //remove file from attachements
    const handleAttachmentRemove = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    //handel attached files
    const handleAttachmentClick = (file) => {
        // Open PDF in a new tab
        if (file.type === "application/pdf") {
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        } else {
            // Alert not supported format
            alert("File format not supported");
        }
    };

    /**
     * selected user - acc to text
    */
    const handleSelectUser = (user) => {
        setRecipient(user.firstname + " " + user.lastname);
        setSelectedId(user.id);
        setShowPopup(false);
    };

    //on user typing action get names
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (recipient.length > 0) {
                const data = await fetchAllUsername({
                    name: recipient.split(" ")[0], schoolcode: user?.schoolcode
                });
                // console.log(data)
                if (data) {
                    setUserNames(data);
                    setShowPopup(true);
                } else {
                    setUserNames([]);
                    alert("no user found");
                }
            } else {
                setUserNames([]);
                setShowPopup(false);
            }
        }, 1000)
        return () => clearTimeout(timeoutId);
    }, [recipient]);

    // useEffect(() => {
    //   console.log(editorState);
    // }, [editorState]);

    useEffect(() => {
        const blocksFromHTML = convertFromHTML(`<p className={styles.Message}>${draftMails.body}</p>`)
        // const blocksFromHTML = convertFromHTML("<p className={styles.Message}>Hello Ma'am,<br /><br />We need your suggestion for the upcoming event i.e on 12-05-2022. We have planned to organise the event in theschool auditorium for class 5th to 9th after lunch. The event will start with solo singing performace after that group dance and after that a short play on “A Christmas Carol”.<br /><br /> It would be a great help if you can suggest the guest of honour.</p>");
        const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        const editor = EditorState.createWithContent(contentState);
        setEditorState(editor);
    }, [draftMails]);

    //perform action
    const onSubmit = (event) => {
        event.preventDefault();
        if (recipient == "") {
            setErr(true);
            return;
        }
        //get text
        const contentState = editorState.getCurrentContent();
        const text = contentState.getPlainText();
        const formData = new FormData();
        formData.append("mail_id", draftMails.emailid)
        formData.append("sender_id", user.id);
        formData.append("schlcode", user?.schoolcode);
        formData.append("receiver_id", selectedId);
        formData.append('body', text);
        formData.append('subject', subject);
        attachments.forEach(file => {
            formData.append('files', file);
        });

        const res = sendMail(formData);
        if (res.status == 200) {
            toast.success(res.message, { autoClose: 500 });
        } else {
            toast.error(res.message, { autoClose: 500 });
        }
    };

    const handleFavourite = async () => {
        const res = await MakefavouriteMail(draftMails.emailid);
        if (res.status === 200) {
            setFltMails(prevData => prevData.map(m => {
                if (m.emailid === draftMails.emailid) {
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
            <style>
                {`@media print {
                        .printme{
                            margin-top:20px;
                        }
                        .printme p,input,a{
                            font-size: 1.2rem !important;
                        }
                        .printme button{
                            display:none ;
                        }
                    }`
                }
            </style>

            <div className={styles.Messagediv1}>
                <HtmlTooltip title="Favourites" placement="left-end">
                    <StarOutlinedIcon className={styles.Mailicon1} onClick={handleFavourite} style={{ color: draftMails.is_favorite && '#FFE500' }} />
                </HtmlTooltip>
                <ReactToPrint
                    trigger={() => <HtmlTooltip title="Print" placement="left-end"><PrintOutlinedIcon className={styles.Mailicon2} /></HtmlTooltip>}
                    content={() => componentRef.current}
                />
                <HtmlTooltip title="Delete" placement="left-end">
                    <DeleteOutlineOutlinedIcon onClick={handleOpen} className={styles.Mailicon3} />
                </HtmlTooltip>
                {open && <DeleteModal open={open} handleClose={handleClose} messageData={draftMails} setFltMails={setFltMails} />}
            </div>

            <div ref={componentRef} className='printme'>
                <p className={styles.Div1P}>{getCurrentTime(draftMails.created_at)}</p>

                <form onSubmit={onSubmit} className={styles.Messagediv2}>

                    <div className={styles.Div2P}>
                        <p>To:-</p>
                        <input className={styles.Input2} type="text" value={recipient} id="to" onChange={event => setRecipient(event.target.value)} />
                    </div>
                    {err && <p style={{ color: "red", margin: 0 }}>Enter the Name</p>}

                    {showPopup && (
                        <ul className={styles.ContactSuggestion}>
                            {userNames.length > 0 && userNames.map(user => (
                                <li key={user.id} onClick={() => handleSelectUser(user)}>
                                    <Avatar
                                        alt={user.firstname}
                                        src={user.image_url}
                                    />
                                    <div>
                                        <p>{user.firstname + " " + user.lastname}</p>
                                        <span>{user.id}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className={styles.Div2P}>
                        <p >Subject:-</p>
                        <input className={styles.Input2} type="text" id="subject" value={subject} onChange={event => setSubject(event.target.value)} />
                    </div>

                    <br />

                    <>
                        <ul className={styles.attachments}>
                            {attachments.map((file, index) => (
                                <div className={styles.attachchild}>
                                    {file.type.startsWith("image/") ? <ImageModal file={file} index={index} /> :
                                        <li key={index} onClick={() => handleAttachmentClick(file)} >
                                            {file.name}
                                        </li>}
                                    <ClearIcon onClick={(event) => {
                                        event.stopPropagation();
                                        handleAttachmentRemove(index);
                                    }} sx={{ color: "red", height: "20px", width: "20px", cursor: "pointer" }} />
                                </div>
                            ))}
                        </ul>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}

                            toolbar={{
                                options: ['inline', 'blockType', 'fontSize', 'textAlign'],

                                inline: {
                                    options: ['bold', 'italic', 'underline'],
                                    bold: { className: 'demo-option-custom' },
                                    italic: { className: 'demo-option-custom' },
                                    underline: { className: 'demo-option-custom' },
                                },
                                blockType: {
                                    className: 'demo-option-custom-wide',
                                    dropdownClassName: 'demo-dropdown-custom'
                                },
                                fontSize: {
                                    className: 'demo-option-custom-medium'
                                }
                            }}
                        />

                        <br />

                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                        >
                            <input
                                hidden
                                type="file"
                                onChange={handleFileChange}
                            />
                            <AttachFileIcon className={styles.AtFile} />
                        </IconButton>
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                        >
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <ImageOutlinedIcon className={styles.ImgIcon} />
                        </IconButton>
                    </>

                    <button className={styles.Mailsendbtn}>Send<SendIcon className={styles.SendIcon} /></button>

                </form >

            </div>
        </div>
    )
}

export default PrncplDraftMsg;