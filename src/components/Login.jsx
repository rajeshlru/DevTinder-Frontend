import React, { useEffect, useState } from "react";
import landingImg from "../utils/landing.png";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import ErrorAlert from "./ErrorAlert";
import LoginLoader from "./LoginLoader";
let confetti;

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // JWT expired or invalid → redirect to login
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

const LoginPage = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSignUp = async () => {
    if (!firstName || !lastName || !emailId || !password) {
      setError("Please fill in all fields");
      setTrigger(Date.now());
      return;
    }

    const safeEmail = (emailId || "").toLowerCase().trim();

    setLoading(true);
    setShowLoader(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          emailId: safeEmail,
          password: password.trim(),
        },
        { withCredentials: true }
      );

      setTimeout(async () => {
        const userData = res?.data || {};
        dispatch(addUser(userData));

        if (!confetti) {
          const module = await import("canvas-confetti");
          confetti = module.default;
        }
        confetti({ particleCount: 40, spread: 120, origin: { y: 0.4 } });

        sessionStorage.setItem("signupSuccess", "true");
        navigate("/profile", { state: { signupSuccess: true } });
        setShowLoader(false);
        setLoading(false);
      }, 2000);
    } catch (err) {
      setShowLoader(false);
      setLoading(false);
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Something Went Wrong"
      );
      setTrigger(Date.now());
    }
  };

  const handleLogin = async () => {
    if (!emailId || !password) {
      setError("Please fill in all fields");
      setTrigger(Date.now());
      return;
    }
    const safeEmail = (emailId || "").toLowerCase().trim();
    setLoading(true);
    setShowLoader(true);

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: safeEmail,
          password: password.trim(),
        },
        { withCredentials: true }
      );

      setTimeout(async () => {
        const userData = res?.data?.data || res?.data || {};
        dispatch(addUser(userData));

        if (!confetti) {
          const module = await import("canvas-confetti");
          confetti = module.default;
        }
        confetti({ particleCount: 40, spread: 120, origin: { y: 0.4 } });

        navigate("/");

        setShowLoader(false);
        setLoading(false);
      }, 2000);
    } catch (err) {
      setShowLoader(false);
      setLoading(false);
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Something Went Wrong"
      );
      setTrigger(Date.now());
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 gap-8 relative bg-black">
      {loading && <LoginLoader />}
      {isLoginForm ? (
        <h1 className="text-3xl md:text-6xl font-serif text-center bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FF3CAC] bg-clip-text text-transparent mt-4 md:mt-0 -mb-3 md:mb-24 -ml-[200px] md:ml-0">
          DevTinder
        </h1>
      ) : (
        <h1 className="text-3xl md:text-6xl font-serif text-center bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FF3CAC] bg-clip-text text-transparent mt-4 md:mt-10 -mb-3 md:mb-0 -ml-[200px] md:ml-[-480px]">
          {" "}
          DevTinder
        </h1>
      )}

      <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full">
        <div className="w-full md:w-1/2 flex justify-center -mt-4 md:-mt-0 transition-transform duration-500 hover:scale-105 hover:-translate-y-2">
          <img
            alt="DevTinder Landing"
            src={landingImg}
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-lg rounded-xl shadow-2xl object-contain"
          />
        </div>
        <div className="card card-border bg-transparent opacity-100 w-full max-w-md shadow-2xl rounded-2xl relative">
          <div className="card-body flex flex-col items-center">
            {isLoginForm ? (
              <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4 md:mb-8 -mt-12  md:-mt-14 bg-gradient-to-r from-purple-300 via-indigo-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(129,140,248,0.5)] italic leading-snug">
                Login
              </h2>
            ) : (
              <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4 md:mb-8 -mt-12  md:-mt-32 bg-gradient-to-r from-purple-300 via-indigo-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(129,140,248,0.5)] italic leading-snug">
                Sign Up
              </h2>
            )}
            <h2 className="text-3xl md:text-4xl font-semibold text-center -mb-4 md:mb-8 -mt-12  md:-mt-14 bg-gradient-to-r from-purple-300 via-indigo-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(129,140,248,0.5)] italic leading-snug"></h2>

            <div className="flex flex-col items-center w-full">
              {!isLoginForm && (
                <>
                  {" "}
                  <fieldset className="fieldset w-[90%] flex flex-col mb-4 relative">
                    <legend
                      className={
                        firstName
                          ? "fieldset-legend text-lg -mx-2 mb-1 transition-all duration-300 text-emerald-400 transform -translate-y-2 scale-90"
                          : "fieldset-legend text-lg -mx-2 mb-1 transition-all duration-300 text-pink-300"
                      }
                    >
                      First Name
                    </legend>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                      className={
                        firstName
                          ? "input w-full h-[45px] rounded-lg px-3 text-lg transition-all duration-300 bg-[#465A7E66] text-white placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-red-400 focus:outline-none"
                          : "input w-full h-[45px] rounded-lg px-3 text-lg transition-all duration-300 bg-white/80 text-black placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-red-400 focus:outline-none"
                      }
                    />
                  </fieldset>
                  <fieldset className="fieldset w-[90%] flex flex-col mb-1 -mt-4 md:mt-0 relative">
                    <legend
                      className={
                        lastName
                          ? "fieldset-legend text-lg -mx-2 mb-1 transition-all duration-300 text-emerald-400 transform -translate-y-2 scale-90"
                          : "fieldset-legend text-lg -mx-2 mb-1 transition-all duration-300 text-pink-300"
                      }
                    >
                      Last Name
                    </legend>
                    <div
                      className={
                        lastName
                          ? "flex items-center rounded-lg h-[45px] px-2 transition-colors duration-300 bg-[#465A7E66]"
                          : "flex items-center rounded-lg h-[45px] px-2 transition-colors duration-300 bg-white/80"
                      }
                    >
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                        className={
                          lastName
                            ? "flex-1 h-full bg-transparent outline-none placeholder:italic text-lg px-2 pr-10 text-white placeholder:text-gray-300"
                            : "flex-1 h-full bg-transparent outline-none placeholder:italic text-lg px-2 pr-10 text-black placeholder:text-gray-700"
                        }
                      />
                    </div>
                  </fieldset>
                </>
              )}

              <fieldset className="fieldset w-[90%] flex flex-col mb-4 relative">
                <legend
                  className={
                    emailId
                      ? "fieldset-legend text-lg -mx-2 mb-1 transition-all duration-300 text-emerald-400 transform -translate-y-2 scale-90"
                      : "fieldset-legend text-lg -mx-2 mb-1 transition-all duration-300 text-pink-300"
                  }
                >
                  Email
                </legend>
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="abc@gmail.com"
                  className={
                    emailId
                      ? "input w-full h-[45px] rounded-lg px-3 text-lg transition-all duration-300 bg-[#465A7E66] text-white placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-red-400 focus:outline-none"
                      : "input w-full h-[45px] rounded-lg px-3 text-lg transition-all duration-300 bg-white/80 text-black placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-red-400 focus:outline-none"
                  }
                />
              </fieldset>

              <fieldset className="fieldset w-[90%] flex flex-col mb-1 -mt-4 md:mt-0 relative">
                <legend
                  className={
                    password
                      ? "fieldset-legend text-lg -mx-2 mb-1 transition-all duration-300 text-emerald-400 transform -translate-y-2 scale-90"
                      : "fieldset-legend text-lg -mx-2 mb-1 transition-all duration-300 text-pink-300"
                  }
                >
                  Password
                </legend>
                <div
                  className={
                    password
                      ? "flex items-center rounded-lg h-[45px] px-2 transition-colors duration-300 bg-[#465A7E66]"
                      : "flex items-center rounded-lg h-[45px] px-2 transition-colors duration-300 bg-white/80"
                  }
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Abc@123"
                    className={
                      password
                        ? "flex-1 h-full bg-transparent outline-none placeholder:italic text-lg px-2 pr-10 text-white placeholder:text-gray-300"
                        : "flex-1 h-full bg-transparent outline-none placeholder:italic text-lg px-2 pr-10 text-black placeholder:text-gray-700"
                    }
                  />
                  {password.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={
                        password
                          ? "absolute right-[20px] hover:text-pink-500 transition-all duration-300 ease-in-out hover:scale-110 text-white"
                          : "absolute right-[20px] hover:text-pink-500 transition-all duration-300 ease-in-out hover:scale-110 text-gray-600"
                      }
                    >
                      {showPassword ? <EyeOff size={23} /> : <Eye size={23} />}
                    </button>
                  )}
                </div>
              </fieldset>
            </div>

            {error && <ErrorAlert message={error} trigger={trigger} />}

            <div className="flex flex-col sm:flex-row justify-center gap-4 w-[90%] mt-2 md:mt-8">
              <button
                className="btn w-full sm:w-1/2 p-4 text-xl rounded-lg text-white border-none bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FF3CAC] shadow-md relative overflow-hidden transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-pink-400/50"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Sign Up"}
                <span className="absolute top-0 left-[-50%] w-1/2 h-full bg-white/55 blur-xl rotate-12 pointer-events-none"></span>
              </button>
            </div>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center justify-center"></div>
              <div className="relative flex justify-center text-sm">
                {isLoginForm ? (
                  <div className="px-4 text-center">
                    <span className="text-gray-300/80  text-[18px] flex items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      New here ?
                      <span
                        className="ml-6 text-[18px] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 font-semibold cursor-pointer hover:from-pink-500 hover:to-yellow-500 transition-all relative group hover:scale-115 duration-700"
                        onClick={() => setIsLoginForm(false)}
                      >
                        Create an account ✨
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="px-4 text-center">
                    <span className="text-gray-400 text-sm flex items-center text-[18px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Already registered?{" "}
                      <span
                        className="ml-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold cursor-pointer hover:from-blue-500 hover:to-cyan-500 transition-all  relative group hover:scale-115 duration-700"
                        onClick={() => setIsLoginForm(true)}
                      >
                        Login now ✨
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
