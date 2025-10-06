import React from "react";
import SkillsList from "./SkillsList";
import ExpandableText from "./ExpandableText";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";

const UserCard = ({ user, highlight }) => {
  const dispatch = useDispatch();
  if (!user) return null;
  //console.log(user);
  const {
    _id,
    firstName,
    lastName,
    age,
    gender,
    photoUrl,
    about,
    skills = [],
  } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send" + "/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-[400px] md:w-[450px] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] transform hover:scale-[1.02] transition-all duration-500 group">
        <div className="absolute top-2 right-2 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-80"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-80 delay-300"></div>

        <figure className="relative">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-[450px] h-[320px] md:w-[450px] md:h-[320px] object-cover transition-transform duration-700 group-hover:scale-y-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/15 to-transparent"></div>

          <div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                  backdrop-blur-md bg-white/25 border border-white/40 
                  px-4 py-2 rounded-2xl shadow-lg text-center w-[80%] -my-3 transition-all duration-300 group-hover:bg-white/35 group-hover:shadow-xl"
          >
            <h2 className="text-[22px] font-bold text-slate-800 drop-shadow-md">
              {firstName} {lastName}
            </h2>
          </div>
        </figure>

        <div
          className="relative px-6 pt-6 pb-8 border border-white/30 
                backdrop-blur-xl 
                bg-gradient-to-tr from-[#fdfbfb] via-[#ebedee] to-[#fdfbfb] 
                overflow-hidden "
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,182,193,0.75),transparent_60%)] animate-pulse-slow pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(144,238,144,0.65),transparent_65%)] pointer-events-none animate-pulse-slower"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(173,216,230,0.55),transparent_70%)] pointer-events-none animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(221,160,221,0.6),transparent_70%)] pointer-events-none animate-pulse-slower"></div>
          {age && (
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-lg font-bold text-red-900 bg-white/70 px-3 py-1 rounded-full transition-all duration-300 group-hover:bg-white/90">
                • {age} yrs
              </span>
              <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                {gender}
              </span>
            </div>
          )}
          <div className="px-1 h-[130px] overflow-y-auto scrollbar-none ">
            <ExpandableText text={about} maxLines={2} />
            <SkillsList skills={skills} />
          </div>
          <div className="flex justify-center gap-14  relative top-5 z-10">
            <button
              id={`ignored-btn-${_id}`}
              className={`w-16 h-14 rounded-full flex items-center justify-center 
    bg-gradient-to-tr from-red-500 to-pink-600 text-white text-2xl 
    shadow-[0_0_20px_rgba(255,0,0,0.5)] 
    hover:shadow-[0_0_25px_rgba(255,0,0,0.8)] 
    hover:scale-110 hover:rotate-3 transition-all duration-300 transform-gpu
    ${
      highlight === "ignored"
        ? "scale-125  ring-4 ring-red-400 ring-offset-2 ring-offset-black/20 shadow-[0_0_40px_rgba(255,0,0,0.7)]"
        : ""
    }`}
              onClick={() => handleSendRequest("ignored", _id)}
            >
              ❌
            </button>

            <button
              id={`interested-btn-${_id}`}
              className={`w-16 h-14 rounded-full flex items-center justify-center 
    bg-gradient-to-tr from-green-400 to-emerald-600 text-white text-2xl 
    shadow-[0_0_20px_rgba(0,255,100,0.5)] 
    hover:shadow-[0_0_25px_rgba(0,255,120,0.8)] 
    hover:scale-110 hover:-rotate-3 transition-all duration-300 transform-gpu
    ${
      highlight === "interested"
        ? "scale-125  ring-4 ring-green-300 ring-offset-2 ring-offset-black/20 shadow-[0_0_40px_rgba(0,255,100,0.7)]"
        : ""
    }`}
              onClick={() => handleSendRequest("interested", _id)}
            >
              💚
            </button>
          </div>

          <div className="absolute inset-0 rounded-2xl border border-white/40 pointer-events-none animate-[pulse_3s_infinite] shadow-[0_0_40px_rgba(0,0,0,0.08)]"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
      </div>

      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0.8; }
          }
          @keyframes pulse-slower {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.7; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          .animate-pulse-slower {
            animation: pulse-slower 5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default UserCard;
