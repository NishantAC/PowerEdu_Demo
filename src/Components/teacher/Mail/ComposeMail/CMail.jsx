import React, { useState, useEffect, useMemo } from 'react';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
;
import SendIcon from '@mui/icons-material/Send';
import ImageModal from './ImageModal';
import { sendMail, createDraft } from '../../../../services/mail.service';
import { toast } from 'react-toastify';
import { getCurrentTime } from '../../../../common/Time';
import { useForm } from "react-hook-form";


function ComposeMessage() {
    const [time, setTime] = useState(getCurrentTime());
    const { register, handleSubmit } = useForm();

    //form state
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [err, setErr] = useState(false);
    const [attachment, setAttachment] = useState();


    //update time every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);


    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file.type.startsWith('image/') && file.size > 3 * 1024 * 1024) {
            alert('Image files must be less than 3MB');
            return false;
        } else if (file.size > 15 * 1024 * 1024) {
            alert('Files must be less than 15MB');
            return false;
        }
        setAttachment(file);

        return true;  
    };

    //remove file from attachements
    const handleAttachmentRemove = () => {
        setAttachment();
    };

    // Attachment preview
    const handleAttachmentClick = (file) => {
        if (file.type === "application/pdf") {
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        } else {
            alert("File format not supported");
        }
    };

    const onSubmit = async (data) => {

        if (!recipient) {
            setErr(true);
            return;
        }

        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const hashtagConfig = {
            trigger: '#',
            separator: ' ',
        }
        const markup = draftToHtml(
            rawContentState,
            hashtagConfig
        );

        const formData = new FormData();
        formData.append('recipient', recipient);
        formData.append('body', markup);
        formData.append('subject', subject);
        
        if(data.file.length > 0){
            formData.append('attachment', data.file[0]);
        }

        const { response, error } = await sendMail(formData);

        if (error) {
            toast.error("Failed to send email", { autoClose: 500 });
        } else {
            toast.success(response.data.message, { autoClose: 500 });
        }
    };

    const MakeDraft = async () => {
        if (!recipient) {
            setErr(true);
            return;
        }

        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const hashtagConfig = {
            trigger: '#',
            separator: ' ',
        }
        const markup = draftToHtml(
            rawContentState,
            hashtagConfig
          );

        const body = {
            recipient,
            body: markup,
            subject
        }

        const { response, error } = await createDraft(body);

        if (error) {
            toast.error("Failed to draft email", { autoClose: 500 });
        } else {
            toast.success(response.data.message, { autoClose: 500 });
        }
    }

    return (
        <>
            <div className={styles.MessageHead}>
                <p className={styles.Div1P}>{time}</p>
                <button onClick={MakeDraft} className={styles.Mailsendbtn}>Draft Mail</button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.Messagediv2} autocomplete="off">

                <div className={styles.Div2P}>
                    <p>To</p>
                    <input className={styles.Input2} type="email" value={recipient} id="to" onChange={event => setRecipient(event.target.value)} />
                </div>
                {err && <p style={{ color: "red", margin: 0 }}>Enter valid email ID</p>}

                <div className={styles.Div2P}>
                    <p >Subject</p>
                    <input className={styles.Input2} type="text" id="subject" value={subject} onChange={event => setSubject(event.target.value)} />
                </div>

                <br />

                <>
                    <ul className={styles.attachments}>
                        {attachment &&
                            <div className={styles.attachchild} title='Tap to view'>
                                {attachment.type.startsWith("image/") ? <ImageModal file={attachment} /> :
                                    <li onClick={() => handleAttachmentClick(attachment)} >
                                        {attachment.name}
                                    </li>}
                                <ClearIcon onClick={(event) => {
                                    event.stopPropagation();
                                    handleAttachmentRemove();
                                }} sx={{ color: "red", height: "20px", width: "20px", cursor: "pointer" }} />
                            </div>
                        }
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
                    <input  
                        type="file"
                        {...register("file")}
                        onChange={handleFileChange}
                    />
                    {/* <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                    >
                        
                        <AttachFileIcon className={styles.AtFile} />
                    </IconButton> */}
                </>

                <button type="submit" className={styles.Mailsendbtn}>Send<SendIcon className={styles.SendIcon} /></button>

            </form >
        </>
    );
}

export default ComposeMessage;