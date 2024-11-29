import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import principal from "./slices/principal";
import classnotice from "./slices/classnotice";
import subjectteacher from "./slices/subjectteacher";
import schoolnotice from "./slices/schoolnotice";
import message from "./slices/message";
import user from "./slices/user";
import school from "./slices/school";
import schooldetail from "./slices/schooldetail";
import feedbackstatus from "./slices/feedbackstatus";
import subject from "./slices/subject";
import assignment from "./slices/assignment";
import assignDropDown from "./slices/assigndropdown.slice";
import notification from "./slices/notification";
import hyexam from "./slices/hyexam";
import classtest from "./slices/classtest";
import classtestmark from "./slices/classtestmark";
import feedbackquestion from "./slices/feedbackquestions";
import feedbackresponse from "./slices/feedbackresponses";
import timetable from "./slices/daywisetimetable";
import questionpaper from "./slices/questionpaper";
import examtype from "./slices/examtype";
import exam from "./slices/exam";
import syllabus from "./slices/syllabus";
import image from "./slices/image";
import attendance from "./slices/attendance";
import fee from "./slices/fee";
import student from "./slices/student";
import admin from "./slices/admin";
import calendarSlice from "./slices/calendar";
import theme from "./slices/theme";


const reducer = {
  auth,
  user,
  notification,
  school,
  schooldetail,
  principal,
  classnotice,
  subjectteacher,
  feedbackquestion,
  feedbackresponse,
  schoolnotice,
  message,
  exam,
  examtype,
  syllabus,
  hyexam,
  classtest,
  classtestmark,
  questionpaper,
  feedbackstatus,
  subject,
  assignment,
  assignDropDown,
  timetable,
  image,
  attendance,
  fee,
  student,
  admin,
  calendarSlice,
  theme,

};

const store = configureStore({
  reducer,
  devTools: import.meta.env.NODE_ENV !== "production",
});

export default store;
