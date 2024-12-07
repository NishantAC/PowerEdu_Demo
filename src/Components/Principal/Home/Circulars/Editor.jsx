import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import './Editor.css'

function Editor({editorHtml, setEditorHtml}) {

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  console.log(editorHtml)
  // const modules = {
  //   toolbar: [
  //     [{ 'header': [1, 2, false] }],
  //     ['bold', 'italic', 'underline','strike', 'blockquote'],
  //     [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  //     ['link', 'image'],
  //     ['clean']
  //   ],
  // }

  // const formats = [
  //   'header',
  //   'bold', 'italic', 'underline', 'strike', 'blockquote',
  //   'list', 'bullet', 'indent',
  //   'link', 'image'
  // ]

  return (
    <div style={{height: "100%"}}>
      {/* <ReactQuill
        value={editorHtml}
        onChange={handleEditorChange}
        className="quill-wrapper"
        placeholder="Write your message..."
 
      /> */}
      {/* Other components or actions */}
    </div>
  );
}

export default Editor;
