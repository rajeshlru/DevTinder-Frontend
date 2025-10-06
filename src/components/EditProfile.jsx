import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import ResponsiveUsercardProfile from "./ResponsiveUsercardProfile";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [showEdit, setShowEdit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [skillsArray, setSkillsArray] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const editFormRef = useRef(null);

  useEffect(() => {
    if (showEdit && editFormRef.current) {
      const rect = editFormRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [showEdit]);

  useEffect(() => {
    if (showEdit) {
      setFirstName("");
      setLastName("");
      setAge("");
      setGender("");
      setAbout("");
      setSkillsInput("");

      if (user?.skills) {
        if (Array.isArray(user.skills)) {
          setSkillsArray(user.skills);
          setSkillsInput(user.skills.join(", "));
        } else if (typeof user.skills === "string") {
          const skillsList = user.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);
          setSkillsArray(skillsList);
          setSkillsInput(skillsList.join(", "));
        }
      } else {
        setSkillsArray([]);
      }
    }
  }, [showEdit, user]);

  useEffect(() => {
    setCurrentPhoto(user?.photoUrl || "");
  }, [user?.photoUrl]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSkillsInput = (e) => {
    setSkillsInput(e.target.value);
  };

  const handleSkillsKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const inputValue = skillsInput.trim();
      if (!inputValue) return;
      const newSkills = inputValue
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0 && !skillsArray.includes(skill));
      if (newSkills.length > 0) {
        setSkillsArray([...skillsArray, ...newSkills]);
      }
      setSkillsInput("");
    }
  };

  const handleSkillsBlur = () => {
    const inputValue = skillsInput.trim();
    if (!inputValue) return;
    const newSkills = inputValue
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0 && !skillsArray.includes(skill));
    if (newSkills.length > 0) {
      setSkillsArray([...skillsArray, ...newSkills]);
    }
    setSkillsInput("");
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skillsArray];
    updatedSkills.splice(index, 1);
    setSkillsArray(updatedSkills);
  };

  const saveProfile = async () => {
    setError("");

    const isUnchanged =
      (firstName === "" || firstName === user.firstName) &&
      (lastName === "" || lastName === user.lastName) &&
      (age === "" || age === user.age) &&
      (gender === "" || gender === user.gender) &&
      (about === "" || about === user.about) &&
      (skillsArray.length === 0 ||
        JSON.stringify(skillsArray) === JSON.stringify(user.skills || []));

    if (isUnchanged) {
      setError(
        "⚡ Oops! Please update at least one field to save your profile ⚡"
      );
      setShowToast(false);
      return;
    }

    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName,
          age: age || user.age,
          gender: gender || user.gender,
          about: about || user.about,
          skills: skillsArray.length > 0 ? skillsArray : user.skills,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowEdit(false);

      if (res?.data?.data?.photoUrl) {
        setCurrentPhoto(res.data.data.photoUrl);
      }

      setShowToast(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error(err?.response?.data);
      setError("Failed to save profile");
    }
  };

  const sparkles = Array.from({ length: 15 }).map((_, i) => {
    const top = Math.random() * 100 + "%";
    const left = Math.random() * 100 + "%";
    const size = Math.random() * 3 + 2 + "px";
    const duration = 20 + Math.random() * 30;
    const delay = Math.random() * 5;
    return (
      <div
        key={i}
        className="absolute rounded-full bg-white/30"
        style={{
          top,
          left,
          width: size,
          height: size,
          opacity: 0.3 + Math.random() * 0.2,
          animation: `moveDots ${duration}s linear ${delay}s infinite`,
        }}
      ></div>
    );
  });

  const emojis = ["✨", "🚀", "🌟", "💫", "🔥"];
  const confetti = Array.from({ length: 10 }).map((_, i) => {
    const top = Math.random() * 90 + "%";
    const left = Math.random() * 90 + "%";
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const delay = Math.random() * 5;
    const duration = 8 + Math.random() * 5;
    return (
      <div
        key={i}
        style={{
          top,
          left,
          animation: `floatEmoji ${duration}s ease-in-out ${delay}s infinite`,
        }}
        className="absolute text-2xl z-0 pointer-events-none"
      >
        {emoji}
      </div>
    );
  });

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center p-2 md:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 bg-[length:400%_400%] animate-bgGradientShift">
      {sparkles}
      {confetti}
      <div>
        {showToast && (
          <div
            className="fixed top-20 right-4 md:right-10 w-80 p-4 bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg shadow-md flex flex-col space-y-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 z-50"
            onClick={saveProfile}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 text-white rounded-full p-2">
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
                <p className="text-xl font-semibold text-black">
                  Profile Updated!
                </p>
                <p className="text-[12px] text-green-700">
                  Your changes have been saved successfully.
                </p>
              </div>
            </div>

            <div className="h-1 w-full bg-green-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{
                  animation: "shrink 3s linear forwards",
                }}
              ></div>
            </div>

            <style>
              {`
                  @keyframes shrink {
                    0% { width: 100%; }
                    100% { width: 0%; }
                  }
                `}
            </style>
          </div>
        )}
      </div>

      <div
        className={`w-full flex ${
          showEdit ? "flex-col lg:flex-row" : "justify-center"
        } gap-1 transition-all duration-500`}
      >
        <div
          className={`${
            showEdit ? "lg:w-1/2" : "w-full max-w-2xl"
          } transition-all duration-500`}
        >
          <ResponsiveUsercardProfile
            user={user}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
          />
        </div>

        {showEdit && (
          <div
            ref={editFormRef}
            className={`${
              showEdit ? "lg:w-1/2" : "hidden"
            } transition-all duration-500 mt-6 lg:mt-24 w-full`}
          >
            <div className="w-full bg-gray-900/70 backdrop-blur-2xl p-6 md:p-8 rounded-3xl shadow-2xl border border-white/20 flex flex-col items-center gap-6 relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl animate-pulse-slow"></div>

              <div className="relative inline-block mb-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-500 animate-text-glow drop-shadow-lg">
                  Edit Profile
                </h2>
              </div>

              <p className="text-white/70 text-sm text-center mb-4">
                ✨ Update your details! ✨
              </p>

              <div className="w-full flex flex-col gap-1 relative">
                <label
                  className={`absolute -top-6 left-5 font-semibold text-lg transition-all duration-500 ${
                    firstName
                      ? "text-green-400  -translate-y-3 -translate-x-4"
                      : "text-red-400"
                  }`}
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={user.firstName || "Enter your first name"}
                  className={`w-full px-5 py-3 rounded-xl text-lg placeholder-white/50 italic transition-all duration-500 shadow-lg my-3 ${
                    firstName
                      ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white/80"
                      : "bg-black/30 placeholder-white/50"
                  }`}
                />
              </div>

              <div className="w-full flex flex-col gap-1 relative mt-3">
                <label
                  className={`absolute -top-6 left-5 font-semibold text-lg transition-all duration-500 ${
                    lastName
                      ? "text-green-400 -translate-y-3 -translate-x-4"
                      : "text-red-400"
                  }`}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={user.lastName || "Enter your last name"}
                  className={`w-full px-5 py-4 rounded-xl text-lg placeholder-black/50 italic transition-all duration-500 shadow-lg mt-3 ${
                    lastName
                      ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white/80"
                      : "bg-black/30 placeholder-white/50"
                  }`}
                />
              </div>

              <div className="w-full flex flex-col gap-1 relative mt-6">
                <label
                  className={`absolute -top-6 left-5 font-semibold text-lg transition-all duration-500 ${
                    age
                      ? "text-green-400 -translate-y-3 -translate-x-4"
                      : "text-red-400"
                  }`}
                >
                  Age
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder={
                    user.age ? `Current: ${user.age}` : "Enter your age"
                  }
                  className={`w-full px-5 py-4 rounded-xl text-lg placeholder-black/50 italic transition-all duration-500 shadow-lg mt-3 ${
                    age
                      ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white/80"
                      : "bg-black/30 placeholder-white/50"
                  }`}
                />
              </div>

              <div className="w-full flex flex-col gap-2 relative mt-7">
                <label
                  className={`absolute -top-6 left-5 font-semibold text-lg transition-all duration-500 ${
                    gender
                      ? "text-green-400 -translate-y-3 -translate-x-4"
                      : "text-red-400"
                  }`}
                >
                  Gender
                </label>
                <div className="flex flex-col sm:flex-row gap-4 mt-3">
                  {["male", "female", "other"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setGender(option)}
                      className={`flex-1 py-3 rounded-xl text-lg font-medium transition-all duration-500 shadow-lg ${
                        gender === option
                          ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white/80"
                          : "bg-black/30 text-white/50"
                      } hover:scale-105 hover:shadow-xl`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-col gap-1 relative mt-7">
                <label
                  className={`absolute -top-6 left-5 font-semibold text-lg transition-all duration-500 ${
                    about
                      ? "text-green-400 -translate-y-3 -translate-x-4"
                      : "text-red-400"
                  }`}
                >
                  About
                </label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className={`w-full  px-5 py-4 rounded-xl text-lg placeholder-black/50 italic transition-all duration-500 shadow-lg mt-3 ${
                    about
                      ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white/80"
                      : "bg-black/30 placeholder-white/50"
                  }`}
                  placeholder="Tell us something about you"
                ></textarea>
              </div>

              <div className="w-full flex flex-col gap-1 relative mt-7">
                <label
                  className={`absolute -top-6 left-5 font-semibold text-lg transition-all duration-500 ${
                    skillsArray.length > 0
                      ? "text-green-400 -translate-y-3 -translate-x-4"
                      : "text-red-400"
                  }`}
                >
                  Skills
                </label>
                <div
                  className={`w-full px-5 py-4 rounded-xl text-lg transition-all duration-500 shadow-lg mt-3 ${
                    skillsArray.length > 0
                      ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"
                      : "bg-black/30"
                  }`}
                >
                  {skillsArray.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {skillsArray.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="ml-1.5 rounded-full flex-shrink-0 text-white hover:text-gray-200 focus:outline-none"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <input
                    type="text"
                    value={skillsInput}
                    onChange={handleSkillsInput}
                    onKeyDown={handleSkillsKeyDown}
                    onBlur={handleSkillsBlur}
                    placeholder="Enter skills separated by commas (e.g., Frontend, Backend, UI/UX)"
                    className="w-full bg-transparent outline-none text-white placeholder-white/50"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Type skills separated by commas and press Enter or click away
                  to add them
                </p>
              </div>
              {error && (
                <div className="w-full text-center   mx-auto mt-4 p-3 bg-red-100 backdrop-blur-md border border-red-500 rounded-xl shadow-lg flex  justify-center items-center gap-2 animate-fadeIn">
                  <span className="text-xl">⚠️</span>
                  <p className="text-red-900 text-sm font-semibold tracking-wide">
                    {error}
                  </p>
                </div>
              )}

              <button
                onClick={saveProfile}
                className="relative w-full md:w-1/2 py-2 text-2xl rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-white font-bold shadow-2xl hover:shadow-[0_0_40px_rgba(96,165,250,0.2)] transition-all duration-700 overflow-hidden group border-2 border-white/20"
              >
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                  <div className="absolute top-1/4 left-1/4 w-16 h-11 border-2 border-white/30 rounded-full"></div>
                  <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-white/30 rotate-45"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border-2 border-white/30"></div>
                </div>

                <div className="absolute -right-6 -top-6 w-20 h-20 bg-green-400 rounded-full opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-1000"></div>
                <div className="absolute -left-6 -bottom-6 w-16 h-16 bg-blue-400 rounded-full opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-1000 delay-200"></div>

                <div className="relative z-10 flex items-center justify-center space-x-1">
                  <span className="tracking-wider group-hover:tracking-widest transition-all duration-500 text-white/90">
                    Save
                  </span>
                </div>

                <span className="absolute inset-0 rounded-2xl bg-white opacity-0 group-active:opacity-30 group-active:scale-150 transition-all duration-300"></span>
              </button>

              <style>{`
                  @keyframes pulse-slow { 0%,100%{transform:scale(1);opacity:0.6;} 50%{transform:scale(1.2);opacity:0.4;} }
                  .animate-pulse-slow{animation:pulse-slow 6s infinite ease-in-out;}
                  @keyframes slide {0%{left:-50%;}100%{left:100%;}}
                  .animate-slide{animation:slide 1.5s linear infinite;}
                `}</style>
            </div>
          </div>
        )}
      </div>

      <style>{`
          @keyframes moveDots {0%{transform:translate(0,0);}25%{transform:translate(10px,-10px);}50%{transform:translate(-40px,40px);}75%{transform:translate(10px,10px);}100%{transform:translate(0,0);}}
          @keyframes floatEmoji {0%{transform:translateY(0) rotate(0deg);opacity:0;}50%{transform:translateY(-50px) rotate(180deg);opacity:1;}100%{transform:translateY(-100px) rotate(360deg);opacity:0;}}
          @keyframes bgGradientShift {0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0 50%;}}
        `}</style>
    </div>
  );
};

export default EditProfile;
