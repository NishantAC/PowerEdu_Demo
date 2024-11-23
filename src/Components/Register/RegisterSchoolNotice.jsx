import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registerSchoolNotice } from "../../slices/schoolnotice";
import { clearMessage } from "../../slices/message";

const RegisterSchoolNotice = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    schoolcode: "",
    title: "",
    createdby: "",
    details: ""
  };


  const validationSchema = Yup.object().shape({
    schoolcode: Yup.string()
      .required("This field is required!"),
    title: Yup.string()
      .required("This field is required!"),
    createdby: Yup.string()
      .required("This field is required!"),
    details: Yup.string()
      .required("This field is required!"),
  });

  const handleRegisterSchoolNotice = (formValue) => {
    const date = new Date().toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-');

    const { schoolcode, title, createdby, details } = formValue;

    setSuccessful(false);

    dispatch(registerSchoolNotice({ schoolcode, date, title, createdby, details }))
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
          onSubmit={handleRegisterSchoolNotice}
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
                  <label htmlFor="title">Title</label>
                  <Field name="title" type="text" className="form-control" />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="details">Details</label>
                  <Field as="textarea" name="details" type="text" className="form-control" />
                  <ErrorMessage
                    name="details"
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
                  <button type="submit" className="btn btn-primary btn-block">Register School Notice</button>
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

export default RegisterSchoolNotice;