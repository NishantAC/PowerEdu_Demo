import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registerAcademicFee } from "../../slices/academicfee";
import { clearMessage } from "../../slices/message";

const RegisterAcademicFee = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    schoolcode: "",
    classname: "",
    feetype: "",
    amount: "",
    duedate: "",
  };


  const validationSchema = Yup.object().shape({
    schoolcode: Yup.string()
      .required("This field is required!"),
    classname: Yup.string()
      .required("This field is required!"),
    feetype: Yup.string()
      .required("This field is required!"),
    amount: Yup.string()
      .required("This field is required!"),
    duedate: Yup.string()
      .required("This field is required!"),
  });

  const handleregisteracademicfee = (formValue) => {

    const { schoolcode, classname, feetype, amount, duedate } = formValue;

    setSuccessful(false);

    dispatch(registeracademicfee({ schoolcode, classname, feetype, amount, duedate }))
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
          onSubmit={handleregisteracademicfee}
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
                  <label htmlFor="feetype">Fee Type</label>
                  <Field name="feetype" type="text" className="form-control" />
                  <ErrorMessage
                    name="feetype"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <Field name="amount" type="text" className="form-control" />
                  <ErrorMessage
                    name="amount"
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
                  <button type="submit" className="btn btn-primary btn-block">Register Academic Fee</button>
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

export default RegisterAcademicFee;