import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Usercard from "./Usercard";
import SwipeableUserCard from "./SwipeableUserCard";

const FeedPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  useEffect(() => {
    const loginFlag = sessionStorage.getItem("loginSuccess");
    if (loginFlag === "true") {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
        sessionStorage.removeItem("loginSuccess");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const getFeed = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.users));
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="bg-feed min-h-screen flex justify-center items-center   p-4 pt-16">
      <div className="sparkle" style={{ top: "10%", left: "15%" }}></div>
      <div className="sparkle" style={{ top: "25%", left: "60%" }}></div>
      <div className="sparkle" style={{ top: "40%", left: "80%" }}></div>
      <div className="sparkle" style={{ top: "55%", left: "35%" }}></div>
      <div className="sparkle" style={{ top: "70%", left: "50%" }}></div>
      <div className="sparkle" style={{ top: "85%", left: "20%" }}></div>

      <div className="w-full max-w-lg relative h-[80vh] flex items-center justify-center">
        {refreshing && (
          <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-xl animate-pulse">
            <div className="w-16 h-16 border-4 border-transparent border-t-4 border-t-blue-500 rounded-full animate-spin shadow-[0_0_15px_rgba(59,130,246,0.7)]"></div>
            <p className="mt-4 text-white font-semibold text-lg animate-pulse">
              Refreshing Feed...
            </p>
          </div>
        )}
        {!refreshing &&
          (feed && feed.length > 0 ? (
            feed.map((user, index) => {
              const offsetY = index * 8;
              const scale = 1 - index * 0.05;
              return (
                <div
                  key={user._id}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    zIndex: feed.length - index,
                    transform: `translate(-50%, -50%) translateY(${offsetY}px) scale(${scale})`,
                  }}
                >
                  <SwipeableUserCard user={user} />
                </div>
              );
            })
          ) : (
            <div className="relative w-full rounded-3xl p-10 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-950 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-[sparkle_2s_linear_infinite]"></div>
              <div className="absolute top-1/3 left-3/4 w-2 h-2 bg-yellow-300 rounded-full animate-[sparkle_2.5s_linear_infinite]"></div>
              <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-[sparkle_3s_linear_infinite]"></div>
              <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-yellow-200 rounded-full animate-[sparkle_3.5s_linear_infinite]"></div>

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,182,193,0.35),transparent_60%)] pointer-events-none animate-pulse"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(144,238,144,0.35),transparent_65%)] pointer-events-none animate-pulse"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(173,216,230,0.25),transparent_70%)] pointer-events-none animate-pulse"></div>

              <div className="absolute top-5 left-5 text-yellow-400 text-xl animate-[float_4s_ease-in-out_infinite]">
                ✨
              </div>
              <div className="absolute bottom-5 right-10 text-pink-400 text-2xl animate-[float_5s_ease-in-out_infinite]">
                💫
              </div>
              <div className="absolute top-1/2 right-1/3 text-green-400 text-xl animate-[float_6s_ease-in-out_infinite]">
                🌟
              </div>

              <div className="relative z-10 text-center">
                <span className="text-6xl mb-4 block text-yellow-400 animate-bounce">
                  ⚠️
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-red-500 to-purple-600">
                  Oops! No Feed Available
                </h2>
                <p className="text-gray-300 text-sm md:text-base mb-6">
                  Looks like there’s nothing here yet. Check back later or
                  explore other users!
                </p>
                <button
                  onClick={getFeed}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
                >
                  🔄 Refresh Feed
                </button>
              </div>

              <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none shadow-[0_0_60px_rgba(255,255,255,0.15)] animate-[pulse_4s_infinite]"></div>
            </div>
          ))}
      </div>

      <style>
        {`
          @keyframes sparkle {
            0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
            50% { transform: translateY(-8px) scale(1.2); opacity: 0.7; }
          }
      
          @keyframes progress-shrink {
            0% { width: 100%; }
            100% { width: 0%; }
          }
          .animate-progress {
            animation: progress-shrink 2s linear forwards;
          }
        `}
      </style>

      {showPopup && (
        <div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 
            bg-gradient-to-r from-teal-400 via-green-400 to-emerald-500
            text-white px-6 py-3 rounded-2xl shadow-2xl text-lg font-semibold z-50 w-96"
        >
          <div className="flex justify-between items-center">
            <span>✔️ Logged in Successfully!</span>
          </div>
          <div className="mt-2 h-1 w-full bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-progress"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedPage;
