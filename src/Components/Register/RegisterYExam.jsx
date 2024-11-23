import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registeryexam } from "../../slices/yexam";
import { clearMessage } from "../../slices/message";

const RegisterYExam = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    schoolcode: "",
    classname: "",
    subjectname: "",
    syllabus: "",
    examdate: "",
    totalmarks: "",
    createdby: "",
  };


  const validationSchema = Yup.object().shape({
    schoolcode: Yup.string()
      .required("This field is required!"),
    classname: Yup.string()
      .required("This field is required!"),
    subjectname: Yup.string()
      .required("This field is required!"),
    syllabus: Yup.string()
      .required("This field is required!"),
    examdate: Yup.string()
      .required("This field is required!"),
    totalmarks: Yup.string()
      .required("This field is required!"),
    createdby: Yup.string()
      .required("This field is required!"),
  });

  const handleregisteryexam = (formValue) => {

    const { schoolcode, classname, subjectname, syllabus, examdate, totalmarks, createdby } = formValue;

    setSuccessful(false);

    dispatch(registeryexam({ schoolcode, classname, subjectname, syllabus, examdate, totalmarks, createdby }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleregisteryexam}
        >
          <Form>
          {/* <FormObserver /> */}
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="schoolcode">School Code</label>
                  <Field name="schoolcode" type="text" className="form-control" />
                  <ErrorMessage
                    name="schoolcode"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="classname">Class Name</label>
                  <Field name="classname" type="text" className="form-control" />
                  <ErrorMessage
                    name="classname"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subjectname">Subject Name</label>
                  <Field name="subjectname" type="text" className="form-control" />
                  <ErrorMessage
                    name="subjectname"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="syllabus">Syllabus</label>
                  <Field name="syllabus" type="text" className="form-control" />
                  <ErrorMessage
                    name="syllabus"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="examdate">Exam Date</label>
                  <Field name="examdate" type="text" className="form-control" />
                  <ErrorMessage
                    name="examdate"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="totalmarks">Total Markls</label>
                  <Field name="totalmarks" type="text" className="form-control" />
                  <ErrorMessage
                    name="totalmarks"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="createdby">Created By</label>
                  <Field name="createdby" type="text" className="form-control" />
                  <ErrorMessage
                    name="createdby"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Register Yearly Exam</button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>

      {message && (
        <div className="form-group">
          <div
            className={successful ? "alert alert-success" : "alert alert-danger"}
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterYExam;