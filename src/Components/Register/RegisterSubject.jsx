import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registersubject } from "../../slices/subject";
import { clearMessage } from "../../slices/message";

const RegisterSubject = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    school_id: "",
    classname: "",
    subjectname: "",
    createdby: "",
  };


  const validationSchema = Yup.object().shape({
    school_id: Yup.string()
      .required("This field is required!"),
    classname: Yup.string()
      .required("This field is required!"),
    subjectname: Yup.string()
      .required("This field is required!"),
    createdby: Yup.string()
      .required("This field is required!"),
  });

  const handleRegisterSubject = (formValue) => {

    const { school_id, classname, subjectname, createdby } = formValue;

    setSuccessful(false);

    dispatch(registersubject({ school_id, classname, subjectname, createdby }))
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
          onSubmit={handleRegisterSubject}
        >
          <Form>
          {/* <FormObserver /> */}
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="school_id">School Code</label>
                  <Field name="school_id" type="text" className="form-control" />
                  <ErrorMessage
                    name="school_id"
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
                  <label htmlFor="createdby">Created By</label>
                  <Field name="createdby" type="text" className="form-control" />
                  <ErrorMessage
                    name="createdby"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Register Class Subject</button>
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

export default RegisterSubject;