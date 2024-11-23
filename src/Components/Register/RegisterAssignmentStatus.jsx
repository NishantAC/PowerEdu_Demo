import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registerassignmentstatus } from "../../slices/assignmentstatus";
import { clearMessage } from "../../slices/message";

const RegisterAssignmentStatus = () => {
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
    studentname: "",
    assigndate: "",
    submitdate: "",
    status: "",
  };


  const validationSchema = Yup.object().shape({
    schoolcode: Yup.string()
      .required("This field is required!"),
    classname: Yup.string()
      .required("This field is required!"),
    subjectname: Yup.string()
      .required("This field is required!"),
    studentname: Yup.string()
      .required("This field is required!"),
    assigndate: Yup.string()
      .required("This field is required!"),
    submitdate: Yup.string()
      .required("This field is required!"),
    status: Yup.string()
      .required("This field is required!"),
  });

  const handleregisterassignmentstatus = (formValue) => {

    const { schoolcode, classname, subjectname, studentname, assigndate, submitdate, status } = formValue;

    setSuccessful(false);

    dispatch(registerassignmentstatus({ schoolcode, classname, subjectname, studentname, assigndate, submitdate, status }))
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
          onSubmit={handleregisterassignmentstatus}
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
                  <label htmlFor="studentname">Student Name</label>
                  <Field name="studentname" type="text" className="form-control" />
                  <ErrorMessage
                    name="studentname"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="assigndate">Assign Date</label>
                  <Field name="assigndate" type="text" className="form-control" />
                  <ErrorMessage
                    name="assigndate"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="submitdate">Submit Date</label>
                  <Field name="submitdate" type="text" className="form-control" />
                  <ErrorMessage
                    name="submitdate"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <Field name="status" type="text" className="form-control" />
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Register Class Assignment Status</button>
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

export default RegisterAssignmentStatus;