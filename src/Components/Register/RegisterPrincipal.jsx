import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registerPrincipal } from "../../slices/principal";
import { clearMessage } from "../../slices/message";

const RegisterPrincipal = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    school_id: "",
    principalname: "",
    principalmessage: "",
  };

  const validationSchema = Yup.object().shape({
    school_id: Yup.string()
      .required("This field is required!"),
    principalname: Yup.string()
      .required("This field is required"),
    principalmessage: Yup.string()
      .required("This field is required!"),
  });

  const handleRegisterPrincipal = (formValue) => {
    const { school_id, principalname, principalmessage } = formValue;

    setSuccessful(false);

    dispatch(registerPrincipal({ school_id, principalname, principalmessage }))
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
          onSubmit={handleRegisterPrincipal}
        >
          <Form>
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
                  <label htmlFor="principalname">Principal Name</label>
                  <Field name="principalname" type="text" className="form-control" />
                  <ErrorMessage
                    name="principalname"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="principalmessage">Principal Message</label>
                  <Field as="textarea" name="principalmessage" type="text" className="form-control" />
                  <ErrorMessage
                    name="principalmessage"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Register Principal</button>
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

export default RegisterPrincipal;