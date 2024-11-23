import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registerOrGetAssignments } from "../../slices/assignment";
import { clearMessage } from "../../slices/message";

const RegisterAssignment = () => {
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
    assigndate: "",
    duedate: "",
    title: "",
    createdby: "",
  };


  const validationSchema = Yup.object().shape({
    schoolcode: Yup.string()
      .required("This field is required!"),
    classname: Yup.string()
      .required("This field is required!"),
    subjectname: Yup.string()
      .required("This field is required!"),
    assigndate: Yup.string()
      .required("This field is required!"),
    duedate: Yup.string()
      .required("This field is required!"),
    title: Yup.string()
      .required("This field is required!"),
    createdby: Yup.string()
      .required("This field is required!"),
  });

  const handleregisterassignment = (formValue) => {

    const { schoolcode, classname, subjectname, assigndate, duedate, title, createdby } = formValue;

    setSuccessful(false);

    dispatch(registerOrGetAssignments({ schoolcode, classname, subjectname, assigndate, duedate, title, createdby }))
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
          onSubmit={handleregisterassignment}
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
                  <label htmlFor="assigndate">Assignment Date</label>
                  <Field name="assigndate" type="text" className="form-control" />
                  <ErrorMessage
                    name="assigndate"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duedate">Due Date</label>
                  <Field name="duedate" type="text" className="form-control" />
                  <ErrorMessage
                    name="duedate"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Field name="title" type="text" className="form-control" />
                  <ErrorMessage
                    name="title"
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
                  <button type="submit" className="btn btn-primary btn-block">Register Class Assignment</button>
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

export default RegisterAssignment;