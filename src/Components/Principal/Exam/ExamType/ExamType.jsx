import { useEffect, useState } from "react";
import "./ExamType.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExamTypeTable from "./ExamTypeTable";
import {
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { bgcolor } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { deleteExamType, updateExamType, clearMessage, clearError } from "../../../../slices/examtype";
import { toast } from "react-toastify"

function ExamType({ setActiveKey, activeKey, examtype, copyData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(examtype.exam_name);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { error, message } = useSelector(state => state.examtype)

  console.log(examtype);
  useEffect(() => {
    setTitle(examtype.exam_name);
  }, [examtype, error, message]);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleToggle = () => {
    if (activeKey === examtype.id) {
      setActiveKey("");
    } else {
      setActiveKey(examtype.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Stop event propagation
    setIsEditing(true);
  };

  const handleCloseEdit = (e) => {
    e.stopPropagation(); // Stop event propagation
    setIsEditing(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const saveTitle = () => {
    setIsEditing(false);
    dispatch(
      updateExamType({
        id: examtype.id,
        title: title,
        school_code: user?.schoolcode,
        class_code: examtype.class_code
      })
    ).then((result) => {
      if (result.payload) {
        // Dispatch succeeded, show success message
        toast.success(result.payload.message, { autoClose: 1000, position: "bottom-right" });
        dispatch(clearMessage());
      } else {
        // Dispatch failed, show error message
        toast.error(result.error.message, { autoClose: 1000, position: "bottom-right" });
        dispatch(clearError());
      }
    });
  };


  const handleTitleKeyDown = (e) => {
    e.stopPropagation(); // Stop event propagation
    if (e.key === "Enter") {
      saveTitle();
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Stop event propagation
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleteDialogOpen(false);
    dispatch(deleteExamType({ id: examtype.id, school_code: user?.schoolcode, class_code: examtype.class_code })).then((result) => {
      if (result.payload) {
        // Dispatch succeeded, show success message
        toast.success(result.payload.message, { autoClose: 1000, position: "bottom-right" });
        dispatch(clearMessage());
      } else {
        // Dispatch failed, show error message
        toast.error(result.error.message, { autoClose: 1000, position: "bottom-right" });
        dispatch(clearError());
      }
    });;
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <Accordion>
      <AccordionItem>
        <div onClick={handleToggle}>
          <div style={{ display: "flex", gap: "1px", alignItems: "center" }}>
            <div style={{ marginRight: "5px" }}>
              {isEditing ? (
                <TextField
                  value={title}
                  onClick={(e) => e.stopPropagation()}
                  onChange={handleTitleChange}
                  error={!title}
                  onKeyDown={handleTitleKeyDown}
                  autoFocus
                />
              ) : (
                examtype.exam_name
              )}
            </div>
            {!isEditing ? (
              <>
                {!copyData && <IconButton onClick={handleEdit}>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    width={18}
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      width={20}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </svg>
                </IconButton>}
                {!copyData && <IconButton onClick={handleDelete}>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    width={18}
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      width={20}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </svg>
                </IconButton>}
              </>
            ) : (
              <IconButton onClick={handleCloseEdit}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  width={18}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            )}
          </div>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "5px",
              marginTop: "-7px",
              marginBottom: "-10px",
              transform:
                activeKey === examtype.id ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {/* Add your custom flipping icon here */}
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              style={{ width: "28px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <div>
          {/* Add the content for Half Yearly here */}
          <div style={{ width: "100%" }}>
            <ExamTypeTable copyData={copyData} examtype={examtype} activeKey={activeKey} />
          </div>
        </div>
      </AccordionItem>

      <Dialog open={isDeleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this exam type?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Accordion>
  );
}

export default ExamType;
