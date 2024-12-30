import React from 'react'
import styles from "../../../../teacher/Home/ToDoModal.module.css";
import { Box, Checkbox, Modal } from '@mui/material';

export default function SyllabusModal({ selectedChapters, setSelectedChapters, closeSyllabus, syllabusModal }) {

  const Chapters = Array.from({ length: 20 }, (_, index) => index + 1);
  

  return (
    <Modal
      open={syllabusModal}
      onClose={closeSyllabus}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="syllabusboxstyle">
        <div style={{ display: "flex", padding: "0" }}>
          <h4
            style={{
              color: "rgba(0, 0, 0, 0.55)",
              margin: "auto",
              marginLeft: "20px",
              width: "100%",
              fontSize: "20px",
            }}
          >
            Syllabus
          </h4>
          <button
            className={styles.modalbutton}
            onClick={closeSyllabus}
            style={{ marginRight: "18px", marginBottom: "16px" }}
          >
            X
          </button>
        </div>
        <div className='scrollableDiv' style={{ overflowY: 'auto', maxHeight: '60vh' }}>
          {Chapters?.map((chap) => (
            <div key={chap} style={{ margin: "0 20px" }}>
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "500",
                }}
              >
                {`Chapter ${chap}`}
                {/* <input
                    type="check"
                    style={{ marginTop: "5px", float: "right" }}
                  /> */}
                <Checkbox
                  checked={selectedChapters.includes(chap)}
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      setSelectedChapters((prevChapters) => [
                        ...prevChapters,
                        chap,
                      ]);
                    } else {
                      setSelectedChapters((prevChapters) =>
                        prevChapters.filter(
                          (chapter) => chapter !== chap
                        )
                      );
                    }
                  }}
                />
              </p>
            </div>
          ))}
        </div>
        <div style={{ width: "70%", marginTop: "30px" }}>
          <button
            type="submit"
            onClick={closeSyllabus}
            style={{
              background: "#3CB532",
              width: "100%",
              margin: "auto",
              color: "white",
              border: "none",
              padding: "8px",
              position: "absolute",
            }}
          >
            Save
          </button>
        </div>
      </Box>
    </Modal>
  )
}
