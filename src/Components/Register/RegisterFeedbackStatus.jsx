import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registerFeedbackStatus } from "../../slices/feedbackstatus";
import { clearMessage } from "../../slices/message";

const RegisterFeedbackStatus = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    school_id: "",
    status: "",
  };


  const validationSchema = Yup.object().shape({
    school_id: Yup.string()
      .required("This field is required!"),
    status: Yup.string()
      .required("This field is required!"),
  });

  const handleRegisterFeedbackStatus = (formValue) => {

    const { school_id, status } = formValue;

    setSuccessful(false);

    dispatch(registerFeedbackStatus({ school_id, status }))
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
          onSubmit={handleRegisterFeedbackStatus}
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
                  <label htmlFor="status">Active Status</label>
                  <Field name="status" type="text" className="form-control" />
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Register Feedback Status</button>
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

export default RegisterFeedbackStatus;