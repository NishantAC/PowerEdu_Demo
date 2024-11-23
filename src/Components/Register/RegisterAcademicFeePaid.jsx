import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registeracademicfeepaid } from "../../slices/academicfeepaid";
import { clearMessage } from "../../slices/message";

const RegisterAcademicFeePaid = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    schoolcode: "",
    classname: "",
    studentname: "",
    feetype: "",
    latefee: "",
    datesubmitted: "",
  };


  const validationSchema = Yup.object().shape({
    schoolcode: Yup.string()
      .required("This field is required!"),
    classname: Yup.string()
      .required("This field is required!"),
    studentname: Yup.string()
      .required("This field is required!"),
    feetype: Yup.string()
      .required("This field is required!"),
    datesubmitted: Yup.string()
      .required("This field is required!"),
  });

  const handleregisteracademicfeepaid = (formValue) => {

    const { schoolcode, classname, studentname, feetype, latefee, datesubmitted } = formValue;

    setSuccessful(false);

    dispatch(registeracademicfeepaid({ schoolcode, classname, studentname, feetype, latefee, datesubmitted }))
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
          onSubmit={handleregisteracademicfeepaid}
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
                  <label htmlFor="studentname">Student Name</label>
                  <Field name="studentname" type="text" className="form-control" />
                  <ErrorMessage
                    name="studentname"
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
                  <label htmlFor="latefee">Late Fee</label>
                  <Field name="latefee" type="text" className="form-control" />
                  <ErrorMessage
                    name="latefee"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="datesubmitted">Submitted Date</label>
                  <Field name="datesubmitted" type="text" className="form-control" />
                  <ErrorMessage
                    name="datesubmitted"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Register Academic Fee Paid</button>
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

export default RegisterAcademicFeePaid;