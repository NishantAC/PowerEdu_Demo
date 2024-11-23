import React, { useState, useEffect } from 'react';
import '../Inbox/InboxMessage.css'
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendIcon from '@mui/icons-material/Send';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import styles from '../Inbox/InboxMessage.module.css';
import { IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';

import io from 'socket.io-client';
import { socketUrl } from '../../../../common/socketLink';
import { whiteSpaceValidation } from '../../../../Utils/CommonValidation';
import { REQUIRED_FIELD_ERROR } from '../../../../common/constant';
const socket = io(socketUrl);

// const HtmlTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: '#F8F8F8',
//     color: 'rgba(0, 0, 0, 0.53)',
//     fontSize: '12px',
//     fontStyle: 'normal',
//     lineHeight: '24px',
//     padding: '1px 5px',
//     marginBottom: '10px'
//   },
// }));


// const [editorState, setEditorState] = useState(() =>
//   EditorState.createEmpty()
// );

// const { handleSubmit, control, setValue } = useForm({
//   defaultValues: {
//     to: '',
//     subject: '',
//     editorState: null,
//   },
// });



// const handleFileChange = (event) => {
//   const fileNames = Array.from(event.target.files).map((file) => file.name);
//   setValue(
//     'editorState',
//     EditorState.createWithContent(
//       ContentState.createFromText(fileNames.join('\n'))
//     )
//   );
// };



// useEffect(() => {
//   console.log(editorState);
// }, [editorState]);



//   return (
//     <div>
//       <div className={styles.sentMessagediv1}></div>
//       <p className={styles.Div1P}>Today,01 January 2022, 11.26am</p>

//       <div className={styles.Messagediv2}>
//         <div className={styles.Div2P}>
//           <p>To:-</p>
//           <input className={styles.Input2} type='text' />
//         </div>
//         <div className={styles.Div2P}>
//           <p >Subject:-</p>
//           <input className={styles.Input2} type='text' />
//         </div>
//         <br />
//         <Editor
//           editorState={editorState}
//           onEditorStateChange={setEditorState}
//           placeholder="Write your message....."
//           toolbar={{
//             options: ['inline', 'blockType', 'fontSize', 'textAlign'],
//             inline: {
//               options: ['bold', 'italic', 'underline'],
//               bold: { className: 'demo-option-custom' },
//               italic: { className: 'demo-option-custom' },
//               underline: { className: 'demo-option-custom' },
//             },
//             blockType: {
//               className: 'demo-option-custom-wide',
//               dropdownClassName: 'demo-dropdown-custom'
//             },
//             fontSize: {
//               className: 'demo-option-custom-medium'
//             }
//           }}
//         />
//         <div className={styles.Div3}>
//           <IconButton
//             color="primary"
//             aria-label="upload picture"
//             component="label"
//           >
//             <input
//               hidden
//               type="file"
//             />
//             <AttachFileIcon className={styles.AtFile} />
//           </IconButton>
//           <IconButton
//             color="primary"
//             aria-label="upload picture"
//             component="label"
//           >
//             <input
//               hidden
//               accept="image/*"
//               type="file"
//             />
//             <ImageOutlinedIcon className={styles.ImgIcon} />
//           </IconButton>
//           <button className={styles.Mailsendbtn}>Send<SendIcon className={styles.SendIcon} /></button>
//         </div>
//       </div>

//     </div>
//   )
// }



function ComposeMessage() {

  useEffect(() => {
    // WebSocket event listeners
    socket.on('connect', () => {
      console.log('WebSocket connection established.');
    });

    socket.on('disconnect', () => {
      console.log('WebSocket connection disconnected.');
    });

    socket.on('mail', (emailData) => {
      // Handle the new email notification
      console.log('New email received:', emailData);
      // Update the Inbox or other relevant parts of the UI in real time
    });

    // Add other WebSocket event listeners as needed

    return () => {
      // Clean up WebSocket connection on component unmount
      socket.disconnect();
    };
  }, []);


  const { handleSubmit, register, setError, setValue, formState: { errors }, reset, formState } = useForm();
  //upload file
  //to get file name
  // const [file, setFile] = useState();
  // const fileInputRef = useRef();

  const validation = (e) => {
    whiteSpaceValidation(setValue, setError, e.target);
  }

  const onSubmit = (data) => {
    socket.emit("mail", { data });
    reset();
    console.log(data);
  };


  return (
    <>
      {/*778 1434*/}
      {/* <div className={styles.sentMessagediv1}></div> */}
      <p className={styles.Div1P}>Today,01 January 2022, 11.26am</p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.Messagediv2}>

        <div >
          <div className={styles.Div2P}>
            <p>To:-</p>
            <input className={styles.Input2} type='text' id="to" {...register("to", { required: true, onChange: validation })} />
            {console.log(errors)}
          </div>
          <div>
            {errors?.to && <span style={{ color: "red" }}>{REQUIRED_FIELD_ERROR}</span>}
          </div>
        </div>

        <div className={styles.Div2P}>
          <p >Subject:-</p>
          <input className={styles.Input2} type='text' id="subject" {...register("subject", { required: false, onChange: validation })} />
        </div>

        <br />


        <Editor
          // editorState={field.value}
          // onEditorStateChange={(editorState) => {
          //   setValue('editorState', editorState);
          // }}
          {...register("body")}
          onEditorStateChange={(editorState) => {
            const contentState = editorState.getCurrentContent();
            const rawContentState = convertToRaw(contentState);
            const jsonContentState = JSON.stringify(rawContentState);
            setValue('body', jsonContentState);
          }}
          placeholder="Write your message....."
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

        <div className={styles.Div3}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              type="file"
            // onChange={handleFileChange}
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
            // onChange={handleFileChange}
            />
            <ImageOutlinedIcon className={styles.ImgIcon} />
          </IconButton>
          <button type="submit" className={styles.Mailsendbtn} disabled={!formState.isValid} >Send<SendIcon className={styles.SendIcon} /></button>
        </div>

      </form>
    </>
  );
}

export default ComposeMessage;