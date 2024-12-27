import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedback, updateFeedback } from "../../../slices/feedbackresponses";
import  Modal  from "@/components/ui/modal"; // Shadcn Modal component
import { Button } from "@/components/ui/button"; // Shadcn Button component
import  Textarea  from "@/components/ui/textarea"; // Shadcn Textarea component
import { RadioGroup, RadioItem } from "@/components/ui/radiogroup"; // Shadcn Radio components
import Typography from "@/components/ui/typography"; // Shadcn Typography component
import { toast } from "sonner"; // For displaying toast notifications

const FeedbackForm = ({ show, onHide, feedbackForm }) => {
  const { user } = useSelector((state) => state.user);
  const { feedbackresponses } = useSelector((state) => state.feedbackresponse);
  const [responseId, setResponseId] = useState(null);
  const [responses, setResponses] = useState([]);
  const [comment, setComment] = useState("");

  const initialState = () => {
    const subResponses = feedbackresponses.find(
      (fr) => fr.user_id === user.id && fr.question_id === feedbackForm?.id
    );
    setResponseId(subResponses?.id || null);
    setResponses(subResponses?.responses || []);
    setComment(subResponses?.comment || "");
  };

  useEffect(() => {
    initialState();
  }, [feedbackForm]);

  const dispatch = useDispatch();

  const handleRatingChange = (e, index) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = e.target.value;
    setResponses(updatedResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (responseId !== null) {
      // Feedback already submitted, so update it
      dispatch(
        updateFeedback({
          response_id: responseId,
          responses,
          comment,
        })
      );
    } else {
      // Submit new feedback
      dispatch(
        submitFeedback({
          user_id: user.id,
          question_id: feedbackForm.id,
          teacher_id: feedbackForm.teacher_id,
          responses,
          comment,
        })
      );
    }
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        initialState();
      }}
      size="lg"
      centered
    >
      <Modal.Body>
        <form id="feedback-form" onSubmit={handleSubmit}>
          {feedbackForm?.questions.map((question, index) => (
            <div key={index} className={styles.feedbackQuestion}>
              <Typography variant="h6" className={styles.feedbackQuestionItem}>
                {question || `How is your overall experience?`}
              </Typography>
              <RadioGroup className={styles.radioGroup}>
                {Array.from({ length: feedbackForm?.ranges[index] }, (_, i) => String(i + 1)).map((rating) => (
                  <RadioItem
                    key={rating}
                    value={rating}
                    checked={responses && rating === responses[index]}
                    onChange={(e) => handleRatingChange(e, index)}
                    required
                  >
                    {rating}
                  </RadioItem>
                ))}
              </RadioGroup>
            </div>
          ))}
          <div className={styles.feedbackQuestion}>
            <Typography variant="h6" className={styles.feedbackQuestionItem}>
              Other comment
            </Typography>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type here"
              rows={4}
            />
          </div>
        </form>
      </Modal.Body>
      <div className={styles.feedbackFooter}>
        <Button variant="outline" onClick={() => onHide() & initialState()}>
          Cancel
        </Button>
        <Button type="submit" form="feedback-form">
          {responseId ? "Update" : "Submit"}
        </Button>
      </div>
    </Modal>
  );
};

export default FeedbackForm;
