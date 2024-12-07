import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; 
import './Editor.css'

function DisplayEditor({ editorHtml, edit, handleChange }) {

  return (
    <div style={{ height: "100%" }}>
      {/* <ReactQuill
        value={editorHtml}
        className="quill-wrapper"

        onChange={(html) => {
          handleChange("message", html);
        }}

        modules={{ toolbar: edit ? true : false }} 
        readOnly={edit ? false : true}
      /> */}
      {/* Other components or actions */}
    </div>
  );
}

export default DisplayEditor;
