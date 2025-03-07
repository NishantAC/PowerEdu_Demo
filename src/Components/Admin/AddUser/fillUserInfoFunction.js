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

  // Validate dob field
  if (name === "dob") {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!iso8601Regex.test(value)) {
      alert("Date of Birth must be in ISO 8601 date format (YYYY-MM-DD)");
      return;
    }
  }

  setFormValues({
    ...formValues,
    [name]: value,
  });
};

export const handleSubmit = (
  e,
  formValues,
  setErrorMsg,
  setUserId,
  setPassword,
  setShowConfirmationModal
) => {
  e.preventDefault();
  if (!formValues.role) {
    alert("Please Select User Type");
  }
  if (!formValues.gender) {
    setErrorMsg("Select Gender");
  } else if (formValues.userType === "Teacher" && !formValues.role) {
    setErrorMsg("Select role");
  } else if (formValues.userType === "Teacher" && !formValues.subject) {
    setErrorMsg("Select subject");
  } else {
    // formData.append("file", formValues.image);
    // formData.append("status", "true");
    // formData.append("school_id", formValues.school_id);
    // formData.append("user_id", formValues.poweredu_id);
    // formData.append("admission_number", formValues.admission_number);
    // formData.append(
    //   "class_id",
    //   formValues.userType === "Student" || formValues.userType === "Teacher" ?
    //      formValues.class_id
    //     : null
    // );
    // formData.append(
    //   "roll_number",
    //   formValues.userType === "Student" ? formValues.roll_number : null
    // );
    // formData.append("role", formValues.role);
    // formData.append("first_name", formValues.first_name);
    // formData.append("middle_name", formValues.middle_name);
    // formData.append("last_name", formValues.last_name);
    // formData.append("gender", formValues.gender);
    // formData.append("admission_date", formValues.admission_date);
    // formData.append("email", formValues.email);
    // formData.append("dob", formValues.dob);
    // formValues.userType == "Student" &&
    //   formData.append("father_name", formValues.guardian.father_name);
    // formValues.userType == "Student" &&
    //   formData.append("mother_name", formValues.guardian.mother_name);
    // formValues.userType == "Student" &&
    //   formData.append("guardian_name", formValues.guardian.guardian_name);
    // formValues.userType == "Student" &&
    //   formData.append("father_contact", formValues.guardian.father_contact);
    // formValues.userType == "Student" &&
    //   formData.append("mother_contact", formValues.guardian.mother_contact);
    // formValues.userType == "Student" &&
    //   formData.append("guardian_contact", formValues.guardian.guardian_contact);
    // formValues.userType == "Student" &&
    //   formData.append("address", formValues.guardian.address);
    // formValues.userType == "Teacher" &&
    //   formData.append("primary_contact", formValues.primary_contact);
    // formValues.userType == "Teacher" &&
    //   formData.append("secondary_contact", formValues.secondary_contact);
    // formValues.userType == "Teacher" &&
    //   formData.append("subject", formValues.subject);


    // 
   
  //  {field: "admission_number", message: ""admission_number" is not allowed"}

    const newFormValues = { ...formValues };
    delete newFormValues.admission_number;
    delete newFormValues.imageUrl;

    authService
      .register(newFormValues)
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

  toast.info("User Added Successfully", {
    description: `User Added Successfully, User ID: ${formValues.rekorId}, Save the information.`,
  });
};
