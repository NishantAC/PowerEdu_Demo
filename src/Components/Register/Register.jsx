import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../../slices/auth";
import { clearMessage } from "../../slices/message";

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    userid: "",
    email: "",
    firstname: "",
    lastname: "",
    admissionno: "",
    rollno: "",
    parentname: "",
    school_id: "",
    status: "true",
    classname: "",
    password: "",
    roles: ""
  };

  const validationSchema = Yup.object().shape({
    userid: Yup.string()
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    firstname: Yup.string()
      .required("This field is required"),
    lastname: Yup.string()
      .required("This field is required"),
    admissionno: Yup.string()
      .required("This field is required"),
    rollno: Yup.string()
      .required("This field is required"),
    parentname: Yup.string()
      .required("This field is required"),
    school_id: Yup.string()
      .required("This field is required"),
    status: Yup.string()
      .required("This field is required"),
    classname: Yup.string()
      .required("This field is required"),
    password: Yup.string()
      .test(
        "len",
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character.",
        (val) =>
          val &&
          val.toString().match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),
      )
      .required("This field is required!"),
      roles: Yup.string()
          .required("Select the role")
  });

  const handleRegister = (formValue) => {
    const { userid, email, firstname, lastname, admissionno, rollno, parentname, school_id, status, classname, password, roles } = formValue;

    setSuccessful(false);

    dispatch(register({ userid, email, firstname, lastname, admissionno, rollno, parentname, school_id, status, classname, password, roles }))
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
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="userid">User Id</label>
                  <Field name="userid" type="text" className="form-control" />
                  <ErrorMessage
                    name="userid"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <Field name="firstname" type="text" className="form-control" />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <Field name="lastname" type="text" className="form-control" />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="admissionno">Admission Number</label>
                  <Field name="admissionno" type="text" className="form-control" />
                  <ErrorMessage
                    name="admissionno"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rollno">Roll Number</label>
                  <Field name="rollno" type="text" className="form-control" />
                  <ErrorMessage
                    name="rollno"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="parentname">Parent Name</label>
                  <Field name="parentname" type="text" className="form-control" />
                  <ErrorMessage
                    name="parentname"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

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
                  <label htmlFor="status">Status</label>
                  <Field name="status" type="text" className="form-control" />
                  <ErrorMessage
                    name="status"
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
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="roles">Role</label>
                  <Field as="select" name="roles">
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="class_teacher">Class Teacher</option>
                    <option value="principal">Principal</option>
                    <option value="account">Accounts</option>
                    <option value="admin">Admin</option>
                    <option value="master">Master</option>
                  </Field>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
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

export default Register;