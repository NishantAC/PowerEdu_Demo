import React, { useState, useEffect } from "react";
import "./Login.css";
import bannerOne from "./bannerOne.svg";
import bannerTwo from "./bannerTwo.svg";
import bannerThree from "./bannerThree.svg";
import bannerFour from "./bannerFour.svg";
import bannerFive from "./bannerFive.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { login, handleTokenExpiry } from "../../slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { schooldata } from "../../slices/school";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    errors: {},
  });
  const [bannerIndex, setBannerIndex] = useState(0); // added state for banner index

  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("Current User:", user); // Add this line to check if the user is updated

    if (user) {
      const user_id = user?.id?.toString();
      if (user_id?.startsWith("17")) {
        navigate("/student/home");
      } else if (user_id?.startsWith("14")) {
        navigate("/teacher/home");
      } else if (user_id?.startsWith("15")) {
        navigate("/teacher/home");
      } else if (user_id?.startsWith("13")) {
        navigate("/principal/home");
      } else if (user_id?.startsWith("16")) {
        navigate("/accounts");
      } else if (user_id?.startsWith("12")) {
        console.log("User ID starts with 12:", user_id);
        navigate("/admin/home");
      } else if (user_id?.startsWith("10")) {
        navigate("/master");
      } else if (user_id?.startsWith("18")) {
        navigate("/staff/home");
      } else {
        navigate("/");
      }
      dispatch(handleTokenExpiry());
    }
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData && loginData.rememberMe) {
      setFormData({ ...formData, email: loginData.email, rememberMe: true });
    }
    const bannerInterval = setInterval(() => {
      setBannerIndex((bannerIndex) => (bannerIndex + 1) % bannerSources.length);
    }, 3000);
  }, [user]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    console.log("login hua ");

    event.preventDefault();

    // validation code
    const errors = {};
    if (!formData.email) {
      errors.email = "PowerEdu Id is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (Object.keys(errors).length === 0) {
      const password = formData.password;
      const userid = formData.email;
      const rememberMe = formData.rememberMe;
      const response = await dispatch(login({ userid, password, rememberMe }));
      const schoolCode = response?.payload?.response?.schoolcode;
      const user_id = response?.payload?.response?.id.toString();
      if (user_id?.startsWith("17")) {
        navigate("/student/home");
      } else if (user_id?.startsWith("14")) {
        navigate("/teacher/home");
      } else if (user_id?.startsWith("15")) {
        navigate("/teacher/home");
      } else if (user_id?.startsWith("13")) {
        navigate("/principal/home");
      } else if (user_id?.startsWith("16")) {
        navigate("/accounts");
      } else if (user_id?.startsWith("12")) {
        navigate("/admin/home");
      } else if (user_id?.startsWith("10")) {
        navigate("/master");
      } else if (user_id?.startsWith("18")) {
        navigate("/staff/home");
      } else {
        navigate("/");
      }
      dispatch(handleTokenExpiry()); // start checking token expiry
      if (schoolCode) {
        dispatch(schooldata({ code: schoolCode }));
      }
    } else {
      setFormData({ ...formData, errors });
    }
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
            <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 10000 })]}>
              <CarouselContent>
                {bannerSources.map((source, index) => (
                  <CarouselItem key={index}>
                    <img className="w-full h-full object-cover" alt="banner" src={source} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="flex-1 p-6 sm:p-0 flex flex-col justify-center bg-[#ffffff64] backdrop-blur-lg">
            <form className="w-full max-w-96 mx-auto" onSubmit={handleSubmit}>
              <div className="mb-10 max-sm:mb-40">
                <h2 className="text-4xl font-semibold text-center text-[black] ">Sign In</h2>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full p-3 border border-white rounded-lg text-black focus:outline-none focus:ring-[#FFF] peer"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 top-3 transition-all duration-200 transform ${
                    formData.email ? '-translate-y-8 -translate-x-2 text-sm text-[#000]' : 'peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-black peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[16px]'
                  }`}
                >
                  Login Id
                </label>
                {formData.errors.email && (
                  <div className="text-red-500 text-sm mt-1">{formData.errors.email}</div>
                )}
              </div>

              <div className="mt-10">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full p-3 border border-white rounded-lg text-gray-700 focus:outline-none focus:ring-[#FFF] peer"
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-3 top-3 transition-all duration-200 transform ${
                      formData.password ? '-translate-y-8 -translate-x-2 text-sm text-black' : 'peer-focus:-translate-y-8 peer-focus:-translate-x-2 peer-focus:text-sm peer-focus:text-black peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[16px]'
                    }`}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4e6e5d] focus:outline-none"
                    onClick={handlePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
                {formData.errors.password && (
                  <div className="text-red-500 text-sm mt-1">{formData.errors.password}</div>
                )}
              </div>

              <div className="flex items-center justify-between mt-2 gap-2">
                <label className="flex items-center justify-center text-white text-nowrap text-sm">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
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


// ! Copyright (c) 2024 Aquaria Core Pvt. Ltd.