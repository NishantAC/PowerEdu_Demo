import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import bannerOne from "./bannerOne.svg";
import bannerTwo from "./bannerTwo.svg";
import bannerThree from "./bannerThree.svg";
import bannerFour from "./bannerFour.svg";
import bannerFive from "./bannerFive.svg";
import { IoEyeOffOutline,IoEye  } from "react-icons/io5";
import { login, handleTokenExpiry } from "../../slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { schooldata } from "../../slices/school";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      const user_id = user?.id?.toString();
      if (user_id?.startsWith("17")) {
        navigate("/student/dashboard");
      } else if (user_id?.startsWith("14")) {
        navigate("/teacher/dashboard");
      } else if (user_id?.startsWith("15")) {
        navigate("/teacher/dashboard");
      } else if (user_id?.startsWith("13")) {
        navigate("/principal/dashboard");
      } else if (user_id?.startsWith("16")) {
        navigate("/accounts");
      } else if (user_id?.startsWith("12")) {
        navigate("/admin/dashboard");
      } else if (user_id?.startsWith("10")) {
        navigate("/master");
      } else if (user_id?.startsWith("18")) {
        navigate("/staff/dashboard");
      } else {
        navigate("/");
      }
      dispatch(handleTokenExpiry());
    }

    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData && loginData.rememberMe) {
      formik.setValues({ email: loginData.email, rememberMe: true });
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("PowerEdu Id is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    }),
    onSubmit: async (values) => {
      const { email, password, rememberMe } = values;
      const response = await dispatch(login({ userid: email, password, rememberMe }));
      const schoolCode = response?.payload?.response?.schoolcode;
      const user_id = response?.payload?.response?.id.toString();
      if (user_id?.startsWith("17")) {
        navigate("/student/dashboard");
      } else if (user_id?.startsWith("14")) {
        navigate("/teacher/dashboard");
      } else if (user_id?.startsWith("15")) {
        navigate("/teacher/dashboard");
      } else if (user_id?.startsWith("13")) {
        navigate("/principal/dashboard");
      } else if (user_id?.startsWith("16")) {
        navigate("/accounts");
      } else if (user_id?.startsWith("12")) {
        navigate("/admin/dashboard");
      } else if (user_id?.startsWith("10")) {
        navigate("/master");
      } else if (user_id?.startsWith("18")) {
        navigate("/staff/dashboard");
      } else {
        navigate("/");
      }
      dispatch(handleTokenExpiry());
      if (schoolCode) {
        dispatch(schooldata({ code: schoolCode }));
      }
    },
  });

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const bannerSources = [
    bannerOne,
    bannerTwo,
    bannerThree,
    bannerFour,
    bannerFive,
  ];

  return (
    <div className="h-screen  bg-[#FFF] sm:px-10 md:px-20 lg:px-40 py-6">
      <div className="flex justify-center items-center h-full bg-[#EDE8F5] rounded-2xl shadow-2xl shadow-slate-700 max-sm:rounded-none">
        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden glass-effect max-sm:h-full max-sm:border-0 max-sm:shadow-none">
          <div className="hidden md:flex flex-1 items-center">
              <img src={bannerFour} alt="" />
          </div>

          <div className="flex-1 p-6 sm:p-0 flex flex-col justify-center bg-[#ffffff64] backdrop-blur-lg">
            <form className="w-full max-w-96 mx-auto" onSubmit={formik.handleSubmit}>
              <div className="mb-10 max-sm:mb-40">
                <h2 className="text-4xl font-semibold text-center text-[black] ">Sign In</h2>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 border border-white rounded-lg text-black focus:outline-none focus:ring-[#FFF] peer"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 top-3 transition-all duration-200 transform ${
                    formik.values.email ? '-translate-y-8 -translate-x-2 text-sm text-[#000]' : 'peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-black peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[16px] text-gray-500'
                  }`}
                >
                  Login Id
                </label>
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1 absolute">{formik.errors.email}</div>
                )}
              </div>

              <div className="mt-12">
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=" "
                    className="w-full p-3 border border-white rounded-lg text-gray-700 focus:outline-none focus:ring-[#FFF] peer"
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-3 top-3 transition-all duration-200 transform ${
                      formik.values.password ? '-translate-y-8 -translate-x-2 text-sm text-[#000]' : 'peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-black peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[16px] text-gray-500'
                    }`}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4e6e5d] focus:outline-none"
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? <IoEye /> : <IoEyeOffOutline />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1 absolute">{formik.errors.password}</div>
                )}
              </div>

              <div className="flex items-center justify-between mt-10 gap-2">
                <label className="flex items-center justify-center text-white text-nowrap text-sm">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    className="mr-2 filter login-input-checkbox w-4 h-4 checked:invert checked:hue-rotate-[305deg] text-white"
                  />
                  <div className="text-black">Keep me signed in</div>
                </label>
                <Link to="/forgot" className="text-sm text-[#000]">Forgot Password?</Link>
              </div>

              {message && (
                <div className="text-red-500 text-sm mt-4">{message}</div>
              )}

              <button
                type="submit"
                className=" mt-6 text-[#FFF] border-white py-2 px-6 border-2 rounded-lg font-semibold hover:bg-opacity-100 transition duration-300 hover:scale-105 bg-[#7e4fff]"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;