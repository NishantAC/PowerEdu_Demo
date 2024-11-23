import React, { useState, useEffect, useMemo, useRef } from 'react';
import '../Inbox/InboxMessage.css'
import { Editor } from "react-draft-wysiwyg";
import { convertFromHTML, EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SendIcon from '@mui/icons-material/Send';
import styles from '../Inbox/InboxMessage.module.css';
import ImageModal from '../ComposeMail/ImageModal';
import ClearIcon from '@mui/icons-material/Clear';
import { sendMail } from '../../../../services/mail.service';
import { toast } from 'react-toastify';
import { getCurrentTime } from '../../../../common/Time';
import { useForm } from "react-hook-form";

function DraftMessage({ messageData }) {
  const { register, handleSubmit } = useForm();

  const blocksFromHTML = convertFromHTML(messageData.body);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  //form state
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
  const [err, setErr] = useState(false);
  const [attachments, setAttachments] = useState([]);


  useEffect(() => {
    setRecipient(messageData.from.split('<')[1].split('>')[0]);
    setSubject(messageData.subject);
    // setAttachments();
  }, [messageData])

  /**
  * * File
  */
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file.type.startsWith('image/') && file.size > 3 * 1024 * 1024) {
        alert('Image files must be less than 3MB');
        return false;
    } else if (file.size > 15 * 1024 * 1024) {
        alert('Files must be less than 15MB');
        return false;
    }
    setAttachments(file);

    return true;  
  };

  //remove file from attachements
  const handleAttachmentRemove = () => {
    setAttachments();
  };

  //handel attached files
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



  return (
    <div>
      <div>
        <p className={styles.Div1P}>{getCurrentTime(messageData.date)}</p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.Messagediv2}>

          <div className={styles.Div2P}>
            <p>To</p>
            <input className={styles.Input2} type="text" value={recipient} id="to" onChange={event => setRecipient(event.target.value)} />
          </div>
          {err && <p style={{ color: "red", margin: 0 }}>Enter the Name</p>}
          <div className={styles.Div2P}>
            <p >Subject</p>
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
              editorStyle={{ height: '400px' }}
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
          </>

          <button className={styles.Mailsendbtn}>Send<SendIcon className={styles.SendIcon} /></button>

        </form >

      </div>
    </div>
  )
}

export default DraftMessage;