import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registersyllabus } from "../../slices/syllabus";
import { clearMessage } from "../../slices/message";

const RegisterSyllabus = () => {
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
    chaptername: "",
    status: "",
    createdby: "",
  };


  const validationSchema = Yup.object().shape({
    school_id: Yup.string()
      .required("This field is required!"),
    classname: Yup.string()
      .required("This field is required!"),
    subjectname: Yup.string()
      .required("This field is required!"),
    chaptername: Yup.string()
      .required("This field is required!"),
    status: Yup.string()
      .required("This field is required!"),
    createdby: Yup.string()
      .required("This field is required!"),
  });

  const handleRegisterSyllabus = (formValue) => {

    const { school_id, classname, subjectname, chaptername, status, createdby } = formValue;

    setSuccessful(false);

    dispatch(registersyllabus({ school_id, classname, subjectname, chaptername, status, createdby }))
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
          onSubmit={handleRegisterSyllabus}
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
                  <label htmlFor="chaptername">Chapter Name</label>
                  <Field name="chaptername" type="text" className="form-control" />
                  <ErrorMessage
                    name="chaptername"
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
                  <label htmlFor="createdby">Created By</label>
                  <Field name="createdby" type="text" className="form-control" />
                  <ErrorMessage
                    name="createdby"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Register Subject Syllabus</button>
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

export default RegisterSyllabus;