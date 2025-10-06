import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";

const UsercardProfile = ({ user, showEdit, setShowEdit }) => {
  const dispatch = useDispatch();
  const [newPhoto, setNewPhoto] = useState(user?.photoUrl || "");
  const [photoUpdated, setPhotoUpdated] = useState(false);
  const [error, setError] = useState("");
  const [currentPhoto, setCurrentPhoto] = useState(user?.photoUrl || "");
  const [skillsInput, setSkillsInput] = useState("");
  const [skillsArray, setSkillsArray] = useState([]);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordFormRef = useRef(null);

  const [showPasswordToast, setShowPasswordToast] = useState(false);

  useEffect(() => {
    if (user) {
      setCurrentPhoto(user.photoUrl || "");
      setNewPhoto(user.photoUrl || "");

      const parsedSkills = parseSkills(user.skills || []);
      setSkillsArray(parsedSkills);
      setSkillsInput(parsedSkills.join(", "));
    }
  }, [user]);

  useEffect(() => {
    if (showPasswordForm && passwordFormRef.current) {
      passwordFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showPasswordForm]);

  if (!user) {
    return (
      <div className="text-white text-center mt-10">Loading profile...</div>
    );
  }

  const {
    firstName = "",
    lastName = "",
    age = "",
    gender = "",
    about = "",
  } = user;

  const parseSkills = (skillsData) => {
    if (Array.isArray(skillsData)) {
      return skillsData;
    }

    if (typeof skillsData === "string") {
      if (skillsData.includes(",")) {
        return skillsData
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0);
      } else if (skillsData.startsWith("[") && skillsData.endsWith("]")) {
        try {
          const parsed = JSON.parse(skillsData);
          return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          console.error("Failed to parse skills array:", e);
          return [];
        }
      } else if (skillsData.trim() !== "") {
        return [skillsData.trim()];
      }
    }

    return [];
  };

  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }

    try {
      const res = await axios.put(
        BASE_URL + "/profile/password",
        {
          currentpassword: currentPassword,
          newpassword: newPassword,
        },
        { withCredentials: true }
      );

      setPasswordSuccess(res.data);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setShowPasswordToast(false);
        setPasswordSuccess("");
        setShowPasswordForm(false);
      }, 3000);
    } catch (err) {
      setPasswordError(err.response?.data || "Failed to update password");
    }
  };

  const handlePhotoUpdate = async () => {
    if (!newPhoto) {
      setError("Please enter a photo URL");
      setPhotoUpdated(true);
      setTimeout(() => setPhotoUpdated(false), 2000);
      return;
    }
    setError("");
    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        { photoUrl: newPhoto },
        { withCredentials: true }
      );

      const updatedUser = res?.data?.data || res?.data?.users;
      dispatch(addUser(updatedUser));
      setCurrentPhoto(updatedUser.photoUrl);
      setPhotoUpdated(true);

      setTimeout(() => setPhotoUpdated(false), 2000);
    } catch (err) {
      setError("Failed to update photo\n" + err?.response?.data);
    }
  };

  return (
    <div className="relative  w-[115%]  ml-2 md:ml-0 md:w-full max-w-2xl bg-white/5 backdrop-blur-lg rounded-4xl shadow-2xl border border-white/10 p-10 flex flex-col items-center mt-24">
      <div className="flex flex-col items-center mb-10">
        <div className="relative">
          {currentPhoto || user?.photoUrl ? (
            <img
              src={currentPhoto || user.photoUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] rounded-full object-cover border-2 border-white shadow-xl"
            />
          ) : (
            <div className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] rounded-full bg-gray-700 flex items-center justify-center text-white">
              No Photo
            </div>
          )}

          <div className="absolute bottom-0  -right-11 md:-right-28 flex flex-row items-center gap-2 bg-green-300/30 p-4 rounded-full backdrop-blur-md shadow-md">
            <input
              type="text"
              placeholder="Enter new photo URL"
              value={newPhoto}
              onChange={(e) => setNewPhoto(e.target.value)}
              className="px-3 py-1 rounded-lg text-sm bg-black/70 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all w-40 "
            />
            {error && (
              <p className="text-red-600 text-xs font-medium">{error}</p>
            )}
            <button
              type="button"
              onClick={handlePhotoUpdate}
              className="px-3 py-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform text-sm"
            >
              Update
            </button>
            {photoUpdated && (
              <span
                className={`text-black text-sm font-medium mt-1 transition-opacity duration-500 ${
                  photoUpdated ? "opacity-100" : "opacity-0"
                }`}
              >
                Updated!
              </span>
            )}
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mt-4 ">
          {firstName} {lastName}
        </h1>

        <div className="flex gap-4 mt-3 items-center">
          <span className="text-emerald-500 font-medium text-lg">
            Age: {age}
          </span>
          <span className="px-4 py-1 rounded-full text-white bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 shadow-lg font-semibold text-lg">
            {gender}
          </span>
        </div>
      </div>

      <div className="mb-8 w-full">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-2 drop-shadow-lg">
          About Me
        </h2>
        <p className="text-white/90 italic bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow-inner border border-white/10 text-lg">
          ✨ {about}
        </p>
      </div>

      {skillsArray.length > 0 && (
        <div className="mb-8 w-full">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 drop-shadow-lg">
            Skills
          </h2>
          <div className="flex flex-wrap gap-4 justify-center bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-inner border border-white/10">
            {skillsArray.map((skill, index) => (
              <span
                key={index}
                className="relative px-6 py-2 text-base font-semibold rounded-full text-white
          bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500
          shadow-[0_0_15px_rgba(138,43,226,0.3)]
          hover:shadow-[0_0_25px_rgba(138,43,226,0.8)]
          hover:scale-110 hover:rotate-2
          transition-all duration-500"
              >
                🚀 {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="buttons-container-wrapper">
        <style>
          {`
      .buttons-container-wrapper .flex.justify-around {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 1rem;
      }
      
      .buttons-container-wrapper .flex.justify-around > div {
        flex: 1;
        display: flex;
      }
      
      .buttons-container-wrapper .flex.justify-around > div:first-child {
        justify-content: flex-start;
      }
      
      .buttons-container-wrapper .flex.justify-around > div:last-child {
        justify-content: flex-end;
      }
      
      /* Keep text on one line */
      .buttons-container-wrapper .relative.z-10 {
        white-space: nowrap;
        z-index: 20;
        position: relative;
      }
      
      /* Fix icons visibility */
      .buttons-container-wrapper .absolute.left-3,
      .buttons-container-wrapper .absolute.right-3 {
        z-index: 10;
      }
      
      /* Perfect padding adjustment */
      .buttons-container-wrapper button {
        padding-left: 2.8rem !important;
        padding-right: 2.8rem !important;
      }
      
      /* New beautiful styling for Change Password button */
      .buttons-container-wrapper > div > div:first-child > div > button {
        background: linear-gradient(135deg, #8b5cf6, #7c3aed, #6d28d9) !important;
        color: #ffffff !important;
        box-shadow: 0 3px 10px rgba(139, 92, 246, 0.3) !important;
        transition: all 0.3s ease !important;
      }
      
      .buttons-container-wrapper > div > div:first-child > div > button:hover {
        box-shadow: 0 5px 15px rgba(139, 92, 246, 0.4) !important;
        transform: translateY(-1px) !important;
      }
      
      /* Beautiful styling for Edit Profile button */
      .buttons-container-wrapper > div > div:last-child > button {
        background: linear-gradient(135deg, #10b981, #059669, #047857) !important;
        color: #ffffff !important;
        box-shadow: 0 3px 10px rgba(16, 185, 129, 0.3) !important;
        transition: all 0.3s ease !important;
      }
      
      .buttons-container-wrapper > div > div:last-child > button:hover {
        box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4) !important;
        transform: translateY(-1px) !important;
      }
      
      /* Mobile responsiveness */
      @media (max-width: 768px) {
        .buttons-container-wrapper .flex.justify-around {
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .buttons-container-wrapper .flex.justify-around > div:first-child,
        .buttons-container-wrapper .flex.justify-around > div:last-child {
          justify-content: center;
          width: 100%;
        }
        
        .buttons-container-wrapper .flex.justify-around button {
          width: 100%;
          max-width: 260px;
          padding-left: 2.5rem !important;
          padding-right: 2.5rem !important;
        }
      }
      
      /* Ensure proper spacing on larger screens */
      @media (min-width: 769px) {
        .buttons-container-wrapper .flex.justify-around {
          padding: 0 1rem;
        }
      }
    `}
        </style>

        <div className="flex justify-around ">
          <div>
            <div className="flex mt-4 w-full justify-center">
              <button
                onClick={() => {
                  setShowPasswordForm(!showPasswordForm);
                  window.scrollTo({ top: 30, behavior: "smooth" });
                }}
                className="relative py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 font-bold text-lg group overflow-hidden"
                style={{ minWidth: "190px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <span className="relative z-10 drop-shadow-md">
                  {showPasswordForm ? "Cancel" : "Change Password"}
                </span>

                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 z-10">
                  {showPasswordForm ? "←" : "🔒"}
                </span>

                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-x-1 z-10">
                  {showPasswordForm ? "←" : "🔒"}
                </span>

                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/30 transition-all duration-700"></div>
              </button>
            </div>
          </div>
          <div className="flex mt-4 w-full">
            <button
              className="relative py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 font-bold text-lg group overflow-hidden"
              onClick={() => {
                setShowEdit(!showEdit);
                window.scrollTo({ top: 30, behavior: "smooth" });
              }}
              style={{ minWidth: "190px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <span className="relative z-10 drop-shadow-md text-black">
                {showEdit ? "Cancel Edit" : "Edit Profile"}
              </span>

              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 z-10">
                {showEdit ? "✕" : "✏️"}
              </span>

              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-x-1 z-10">
                {showEdit ? "✕" : "✏️"}
              </span>

              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/30 transition-all duration-700"></div>

              <div className="absolute inset-0 overflow-hidden">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-80 "
                  ></div>
                ))}
              </div>
            </button>
          </div>
        </div>
      </div>

      {showPasswordToast && (
        <div
          className="fixed top-20 right-5 w-80 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-lg shadow-xl flex flex-col space-y-2 cursor-pointer hover:shadow-2xl transition-shadow duration-300 z-50"
          onClick={() => setShowPasswordToast(false)}
        >
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 text-white rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-black">
                Password Updated!
              </p>
              <p className="text-sm text-blue-700">
                Your password has been updated successfully.
              </p>
            </div>
          </div>
          <div className="h-1 w-full bg-blue-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 animate-shrink"></div>
          </div>
          <style>{`
      @keyframes shrink {
        0% { width: 100%; }
        100% { width: 0%; }
      }
      .animate-shrink {
        animation: shrink 4s linear forwards;
      }
    `}</style>
        </div>
      )}

      {showPasswordForm && (
        <div
          ref={passwordFormRef}
          className="relative w-[125%]  md:w-full bg-gray-900/80 backdrop-blur-3xl p-8 rounded-3xl shadow-2xl border border-white/20 mt-6 space-y-6 overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-72 h-72 bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 opacity-20 rounded-full blur-3xl animate-blob"></div>
            <div className="w-56 h-56 bg-gradient-to-br from-green-400 via-blue-500 to-indigo-400 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="w-64 h-64 bg-gradient-to-l from-pink-400 via-purple-500 to-blue-400 opacity-15 rounded-full blur-2xl animate-blob animation-delay-4000"></div>
          </div>

          <h2 className="relative text-2xl text-cyan-400 font-extrabold mb-6 drop-shadow-xl">
            🔒 Change Password
          </h2>

          {[
            {
              label: "Current Password",
              value: currentPassword,
              show: showCurrentPassword,
              setShow: setShowCurrentPassword,
              onChange: setCurrentPassword,
            },
            {
              label: "New Password",
              value: newPassword,
              show: showNewPassword,
              setShow: setShowNewPassword,
              onChange: setNewPassword,
            },
            {
              label: "Confirm New Password",
              value: confirmPassword,
              show: showConfirmPassword,
              setShow: setShowConfirmPassword,
              onChange: setConfirmPassword,
            },
          ].map((field, i) => (
            <div key={i} className="relative group">
              <input
                type={field.show ? "text" : "password"}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.label}
                className="w-full px-4 pt-5 pb-3 rounded-xl bg-black/40 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 shadow-lg group-hover:shadow-xl"
              />
              <label
                className={`absolute left-4 top-4 text-sm transition-all duration-300 pointer-events-none
            ${
              field.value
                ? "text-green-400 -translate-y-3 text-base drop-shadow-md"
                : "text-white"
            }`}
              >
                {field.label}
              </label>
              {field.value.length > 0 && (
                <button
                  type="button"
                  onClick={() => field.setShow(!field.show)}
                  className="absolute right-4 top-3 text-white hover:text-pink-500 transition-all duration-300 ease-in-out"
                >
                  {field.show ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              )}
            </div>
          ))}

          {passwordError && (
            <div className="flex items-center gap-2 bg-red-600/40 text-red-100 px-4 py-2 rounded-lg text-sm font-medium animate-fadeIn shadow-md">
              ❌ {passwordError}
            </div>
          )}
          {passwordSuccess && (
            <div className="flex items-center gap-2 bg-green-600/40 text-green-100 px-4 py-2 rounded-lg text-sm font-medium animate-fadeIn shadow-md">
              ✅ {passwordSuccess}
            </div>
          )}

          <button
            onClick={handleChangePassword}
            className="relative w-full py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-2xl font-extrabold shadow-lg overflow-hidden hover:scale-105 hover:shadow-xl transition-transform duration-300 group"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-all duration-500"></span>
            <span className="relative z-10">Update Password</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UsercardProfile;
