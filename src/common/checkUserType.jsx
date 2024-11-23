const checkUserType = (id) => {

     if(id === undefined) {
          return "No ID provided";
     }

     const user_id = id?.toString();
     if (user_id?.startsWith("17")) {
       return("Student");
     } else if (user_id?.startsWith("14")) {
          return("Teacher");
     } else if (user_id?.startsWith("15")) {
       return("Teacher");
     } else if (user_id?.startsWith("13")) {
       return("Principal");
     } else if (user_id?.startsWith("16")) {
       return("Accounts");
     } else if (user_id?.startsWith("12")) {
       return("Admin");
     } else if (user_id?.startsWith("10")) {
       return("Master");
     } else if (user_id?.startsWith("18")) {
       return("Staff");
     } else {
       return("/");
     }
}

export default checkUserType;