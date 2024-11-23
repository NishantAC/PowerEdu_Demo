import React, { useContext, useEffect, useState } from "react";
import style from "./teacher.module.css";
import { MenuContext } from "../../../context/Menu/MenuContext";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import FeedbackStatusService from "../../../services/feedbackstatus.service";
import SubjectTeacherService from "../../../services/subjectteacher.service";
import FeedbackForm from "./FeedbackForm";
import { getSubjectTeacherData } from "../../../slices/subjectteacher";
import { getFeedbackQuestions } from "../../../slices/feedbackquestions";
import { getFeedbackResponses } from "../../../slices/feedbackresponses";
import { getFeedbackStatus } from "../../../slices/feedbackstatus";

export default function StudentTeacher() {
  const mycontext = useContext(MenuContext);
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { subjectteachers } = useSelector((state) => state.subjectteacher);
  const { feedbackquestions } = useSelector((state) => state.feedbackquestion);
  const { feedbackresponses } = useSelector((state) => state.feedbackresponse);
  const { feedbackstatus } = useSelector((state) => state.feedbackstatus);

  const [submittedResponses, setSubmittedResponses] = useState(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    dispatch(
      getSubjectTeacherData({
        classId: currentUser?.classid,
        schoolcode: currentUser?.schoolcode,
      })
    );
    dispatch(
      getFeedbackQuestions({
        schoolcode: currentUser?.schoolcode,
        class_id: currentUser?.classid,
      })
    );
    dispatch(
      getFeedbackResponses({
        schoolcode: currentUser?.schoolcode,
        user_id: currentUser?.id,
      })
    );
    dispatch(
      getFeedbackStatus({
        schoolcode: currentUser?.schoolcode,
      })
    );
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeacherId(null);
    setSubmittedResponses(null)
  };

  const handleClick = (teacher) => {
    setSelectedTeacherId(teacher.teacher_id);
    const subReponses = feedbackresponses.find(
      (fr) => fr.user_id === currentUser.id && fr.question_id === selectedForm?.id 
    );
    console.log(subReponses)
    setSubmittedResponses(subReponses);
    handleOpenModal();
  };
  return (
    <div className={style.main}>
      <p className={style.para}>
        Home &gt;
        <b>
          {" "}
          <u>Teachers</u>
        </b>
      </p>
      <div className={style.teacherdiv}>
        {subjectteachers?.map((row) => {
          let currentForm = feedbackquestions?.find(
            (feed) => feed.teacher_id === row.teacher_id && feed.subject_id === row.subject_id
          );
          console.log(currentForm);
          const isFeedbackSubmitted = feedbackresponses?.some(
            (fr) =>
              currentForm?.id === fr.question_id &&
              fr.user_id === currentUser.id
          );
          return (
            <div key={row.id} className={style.teacherdiv1}>
              <div className={style.teacherdiv2}>
                <Avatar
                  alt="Image"
                  src={row?.profile}
                  sx={{ width: 80, height: 80 }}
                  className={style.teacherdiv2style}
                />
              </div>
              <br />
              <p className={style.para2}>
                {row.firstname} {row.lastname}
              </p>
              <p className={style.para3}>{row.subjectname} Dept.</p>
              <p className={style.para4}>{row.details}</p>
              {currentForm?.status === "active" ? (
                <>
                  {isFeedbackSubmitted ? (
                    <button
                      className={style.feedbackbtn}
                      onClick={() => handleClick(row) & setSelectedForm(currentForm)}
                    >
                      Submit Feedback
                    </button>
                  ) : (
                    <button
                      className={style.feedbackbtn}
                      onClick={() => handleClick(row) & setSelectedForm(currentForm)}
                    >
                      Submit Feedback
                    </button>
                  )}
                </>
              ) : (
                <button disabled className={style.feedbackbtn1}>
                  Submitted
                </button>
              )}
            </div>
          );
        })}
        {selectedForm && (
          <FeedbackForm
            show={showModal}
            feedbackForm={selectedForm}
            // teacherId={selectedTeacherId}
            // submittedResponses={submittedResponses}
            onHide={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}
