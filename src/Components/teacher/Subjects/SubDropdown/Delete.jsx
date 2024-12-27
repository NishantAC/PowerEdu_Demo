import React from "react";
import styles from "../TeacherSubject.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "sonner";
import NoteService from "../../../../services/note.service";
import LinkService from "../../../../services/link.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

function Delete({
  id,
  chapterDesc,
  name,
  note,
  setChapterNotes,
  setChapterLinks,
  chapterLinks,
  chapterNotes,
  getAssignedSubjects,
  classDropdownValue,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.warn(id);

  console.log("this is chapter num", chapterDesc.chapter_number);

  const deleteById = () => {
    if (note) {
      NoteService.deleteNoteById({
        chapter_number: chapterDesc.chapter_number,
        chapter_id: chapterDesc.chapter_id,
        id,
      })
        .then((res) => {
          getAssignedSubjects(classDropdownValue);
          const filt = chapterNotes.filter((f) => f.id !== id);
          setChapterNotes(filt);
          toast(res?.data?.message);
          handleClose();
        })
        .catch((err) =>
          console.log(
            "Problem in ChapterDescription :: deleteNoteById() => ",
            err
          )
        );
    } else {
      LinkService.deleteLinkById({
        chapter_number: chapterDesc.chapter_number,
        chapter_id: chapterDesc.chapter_id,
        id,
      })
        .then((res) => {
          getAssignedSubjects(classDropdownValue);
          const filt = chapterLinks.filter((f) => f.id !== id);
          setChapterLinks(filt);

          toast(res?.data?.message);
          handleClose();
        })
        .catch((err) =>
          console.log(
            "Problem in ChapterDescription :: deleteLinkById() => ",
            err
          )
        );
    }
  };

  return (
    <div>
      <button onClick={handleOpen} className={styles.tabbtn2}>
        Delete
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.box}>
          <div className={styles.boxdiv} style={{ margin: 0, padding: 0 }}>
            <h3 className={styles.boxdivh3}>Delete Notes</h3>
            <button onClick={handleClose} className={styles.crossbtn}>
              X
            </button>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                paddingTop: "10px",
              }}
            >
              <h4
                style={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "21px",
                  color: "#494949",
                }}
              >
                Do you really want to delete
                <br />
                <span style={{ color: "#6755d9", fontSize: "18px" }}>
                  {name}
                </span>
                ?
              </h4>
            </div>
            <div
              className={styles.formbtn}
              style={{ display: "flex", gap: 20 }}
            >
              <button
                type="button"
                className={styles.save}
                onClick={deleteById}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={handleClose}
                className={styles.save}
              >
                No
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Delete;
