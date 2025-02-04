
import { toast } from "sonner";
import authService from "../../../services/auth.service";


export const handleImageUpload = (event, formValues, setFormValues) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    setFormValues({
      ...formValues,
      imageUrl: reader.result,
      image: file,
    });
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

export const handleChange = (e, formValues, setFormValues) => {
  const { name, value } = e.target;
  setFormValues({
    ...formValues,
    [name]: value,
  });
};

export const handleSubmit = (e, formValues, setErrorMsg, setUserId, setPassword, setShowConfirmationModal) => {
  e.preventDefault();
  if (!formValues.userType) {
    alert("Please Select User Type");
  }

  if (!formValues.gender) {
    setErrorMsg("Select Gender");
  } else if (formValues.userType === "Teacher" && !formValues.role) {
    setErrorMsg("Select role");
  } else if (formValues.userType === "Teacher" && !formValues.subject) {
    setErrorMsg("Select subject");
  } else {
    const formData = new FormData();
    formData.append("file", formValues.image);
    formData.append("status", "true");
    formData.append("school_code", formValues.school_id);
    formData.append("user_id", formValues.rekorId);
    formData.append("admissionno", parseInt(formValues.admissionNo));
    formData.append(
      "class_code",
      formValues.userType === "Student" || formValues.userType === "Teacher"
        ? formValues.class
        : null
    );
    formData.append(
      "rollno",
      formValues.userType === "Student" ? formValues.rollNo : null
    );
    formData.append("userType", formValues.userType.toLowerCase());
    formData.append("firstname", formValues.firstName);
    formData.append("middlename", formValues.middleName);
    formData.append("lastname", formValues.lastName);
    formData.append("gender", formValues.gender);
    formData.append("admissiondate", formValues.admissionDate);
    formData.append("email", formValues.email);
    formData.append("dob", formValues.dob);
    formData.append(
      "fathername",
      formValues.userType === "Student" ? formValues.fatherName : null
    );
    formData.append(
      "mothername",
      formValues.userType === "Student" ? formValues.motherName : null
    );
    formData.append(
      "guardianname",
      formValues.userType === "Student" ? formValues.guardianName : null
    );
    formData.append(
      "fathercontactno",
      formValues.userType === "Student" ? parseInt(formValues.fatherContactNo) : null
    );
    formData.append(
      "mothercontactno",
      formValues.userType === "Student" ? parseInt(formValues.motherContactNo) : null
    );
    formData.append(
      "guardiancontactno",
      formValues.userType === "Student" ? parseInt(formValues.guardianContactNo) : null
    );
    formData.append("address1", formValues.addressLine1);
    formData.append("address2", formValues.addressLine2);
    formData.append(
      "role",
      formValues.userType === "Teacher" || formValues.userType === "Staff" ? formValues.role : null
    );
    formData.append(
      "subject",
      formValues.userType === "Teacher" ? formValues.subject : null
    );
    formData.append(
      "primarycontactnumber",
      formValues.userType === "Student"
        ? null
        : parseInt(formValues.primaryContactNumber)
    );
    formData.append(
      "secondarycontactnumber",
      formValues.userType === "Student"
        ? null
        : parseInt(formValues.secondaryContactNumber)
    );

    authService.register(formData)
      .then((res) => {
        
        if (res.status === 201) {
          setUserId(res.data.userId);
          setPassword(res.data.password);
          setShowConfirmationModal(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          
          setErrorMsg(error.response.data.message);
        } else if (error.request) {
          
        } else {
          
        }
      });
  }

  toast.info("User Added Successfully", { description: `User Added Successfully, User ID: ${formValues.rekorId}, Save the information.` });
};