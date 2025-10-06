import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import ConfirmDialog from "./ConfirmDialog ";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [userLoaded, setUserLoaded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAccount = async (userId, navigate) => {
    if (!userId) {
      alert("User ID not found. Please try again.");
      return;
    }

    try {
      const res = await axios.delete(`${BASE_URL}/delete/${userId}`, {
        withCredentials: true,
      });

      alert(res.data.message);
      setTimeout(() => {
        dispatch(removeUser());
        navigate("/login");
      }, 100);
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("❌ Failed to delete account");
    }
  };
  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ease-in-out
    ${
      scrolled
        ? "bg-teal-800 md:bg-transparent md:shadow-md py-2"
        : "bg-transparent shadow-xl py-3 md:bg-gradient-to-r from-purple-900/70 via-indigo-900/60 to-pink-900/40  md:backdrop-blur-sm"
    }`}
    >
      <div className="max-w-full  px-4 sm:px-6 flex">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="drawer">
              <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={isDrawerOpen}
                onChange={(e) => setIsDrawerOpen(e.target.checked)}
              />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer"
                  className="btn btn-ghost drawer-button p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-50 group-hover:text-white transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </label>
              </div>
              <div className="drawer-side z-50">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                  onClick={() => setIsDrawerOpen(false)}
                ></label>
                <div className="menu bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-base-content min-h-full w-80 p-6 shadow-2xl border-r border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
                    <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl"></div>
                  </div>

                  <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/10 relative z-10">
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/10 transition-all duration-300 hover:rotate-90"
                    >
                      ✕
                    </button>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"></h2>
                  </div>

                  <ul className="space-y-3 relative z-10">
                    <li>
                      <Link
                        to="/"
                        className="text-lg text-white/80 hover:text-white
          hover:bg-white/10 rounded-xl px-4 py-3 transition-all
          duration-300 flex items-center group hover:shadow-lg"
                      >
                        <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300 mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-purple-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                        </div>
                        Home
                        <span className="ml-auto transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                          →
                        </span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/about"
                        className="text-lg text-white/80 hover:text-white hover:bg-white/10 rounded-xl px-4 py-3 transition-all duration-300 flex items-center group hover:shadow-lg"
                      >
                        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300 mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        </div>
                        About Me
                        <span className="ml-auto transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                          →
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="text-lg text-white/80 hover:text-white hover:bg-white/10 rounded-xl px-4 py-3 transition-all duration-300 flex items-center group hover:shadow-lg"
                      >
                        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300 mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        Yout Profile
                        <span className="ml-auto transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                          →
                        </span>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          if (!userLoaded) {
                            alert(
                              "User data still loading. Please try again in a moment."
                            );
                            return;
                          }
                          if (!user?._id) {
                            alert("User ID not found. Please try again.");
                            return;
                          }
                          setOpen(true);
                        }}
                        className="text-lg text-white/80 hover:text-white hover:bg-white/10 rounded-xl px-4 py-3 transition-all duration-300 flex items-center group hover:shadow-lg"
                        disabled={!userLoaded}
                      >
                        <div className="p-2 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg group-hover:from-red-500/30 group-hover:to-pink-500/30 transition-all duration-300 mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 
        0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                            />
                          </svg>
                        </div>
                        Delete Account
                        <span className="ml-auto transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                          →
                        </span>
                      </button>
                    </li>

                    <ConfirmDialog
                      open={open}
                      onCancel={() => setOpen(false)}
                      onConfirm={() => {
                        if (user?._id) {
                          setOpen(false);
                          handleDeleteAccount(user._id, navigate);
                        } else {
                          alert("User ID not found. Please try again.");
                          setOpen(false);
                        }
                      }}
                    />
                  </ul>

                  <div className="absolute bottom-24 left-0 right-0 p-6 border-t border-white/10  z-10">
                    <h3 className="text-red-300 text-sm font-medium mb-4 text-center">
                      Connect with me
                    </h3>
                    <div className="flex justify-center space-x-4">
                      <a
                        href="https://github.com/rajeshlru"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                      >
                        <svg
                          className="w-6 h-6 group-hover:text-purple-300 transition-colors"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>

                      <a
                        href="https://www.linkedin.com/in/rajesh-elluru-97ba6b356/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                      >
                        <svg
                          className="w-6 h-6 group-hover:text-blue-200 transition-colors"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>

                      <a
                        href="https://instagram.com/rrajesh.h"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white hover:from-pink-400 hover:to-rose-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                      >
                        <svg
                          className="w-6 h-6 group-hover:text-pink-200 transition-colors"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10  z-10">
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center group shadow-lg hover:shadow-xl"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 group-hover:animate-pulse"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/"
              className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FF3CAC] bg-clip-text text-transparent hover:opacity-90 transition-opacity duration-300"
            >
              <span className="relative z-50 text-3xl bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FF3CAC] bg-clip-text text-transparent">
                DevTinder
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FF3CAC] rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </span>
            </Link>
          </div>
        </div>
        <div className="ml-auto">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar relative group"
            >
              <div className="absolute -inset-4  rounded-full opacity-90 blur-2xl transition-all duration-1000  "></div>

              <div
                className="absolute -ins-8 rounded-full border-2 border-purple-500/30 animate-spin-medium"
                style={{
                  animationDuration: "12s",
                  animationDirection: "reverse",
                }}
              ></div>
              <div
                className="absolute -ins-10 rounded-full border-1 border-fuchsia-400/20 animate-spin-fast"
                style={{ animationDuration: "8s" }}
              ></div>

              <div className="relative w-14 md:w-16 rounded-full transition-all duration-700 scale-125 hover:scale-150">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 p-0.5 animate-rotate-colors"></div>

                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-amber-300/50 via-purple-400/30 to-blue-300/40 "></div>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMC41IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjUiLz48L3N2Zz4=')] opacity-20"></div>
                </div>

                <div className="relative rounded-full bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 p-0.5 backdrop-blur-xl">
                  <div className="relative rounded-full overflow-hidden bg-gray-900">
                    <img
                      alt="Profile"
                      src={
                        user?.photoUrl ||
                        user.data?.photoUrl ||
                        "https://avatars.githubusercontent.com/u/192607541?v=4"
                      }
                      className="w-full h-full object-cover rounded-full transition-all duration-700 "
                    />
                  </div>
                </div>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gradient-to-br from-gray-900/85 via-gray-800/85 to-gray-900/85 rounded-2xl z-50 mt-3 w-[280px] md:w-[340px] p-3 shadow-2xl border border-white/10 backdrop-blur-xl animate-slide-down space-y-2 overflow-hidden transform transition-all duration-500"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-purple-900/20 to-gray-900/95 opacity-100"></div>
              </div>

              <div className="px-4 py-3 border-b border-white/10 mb-2 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mr-2 animate-pulse"></div>
                    <p className="text-xs text-amber-300/80 font-semibold tracking-wider uppercase">
                      {user.firstName}
                    </p>
                  </div>
                </div>
              </div>

              <li className="relative z-10">
                <Link
                  to="/profile"
                  className="flex text-green-300 text-lg justify-between items-center px-4 py-4 rounded-xl hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-cyan-400/20 hover:text-white transition-all duration-500 group relative overflow-hidden border border-white/5 hover:border-teal-400/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>

                  <div className="flex items-center relative z-10">
                    <div className="relative mr-3">
                      <div className="absolute -inset-2 bg-green-400/20 rounded-full blur-sm group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-full border border-green-400/30">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div>Profile</div>
                      <div className="text-xs text-green-400/50 mt-0.5">
                        View and edit your profile
                      </div>
                    </div>
                  </div>

                  <span className="relative opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex items-center">
                    <span className="absolute -left-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500 delay-100">
                      →
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 delay-150">
                      →
                    </span>
                  </span>
                </Link>
              </li>

              <li className="relative z-10">
                <Link
                  to="/request"
                  className="flex text-amber-400 text-lg justify-between items-center px-4 py-4 rounded-xl hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-rose-400/20 hover:text-white transition-all duration-500 group relative overflow-hidden border border-white/5 hover:border-amber-400/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-rose-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>

                  <div className="flex items-center relative z-10">
                    <div className="relative mr-3">
                      <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-sm group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-full border border-amber-400/30">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-amber-400 group-hover:scale-110 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div>Requests</div>
                      <div className="text-xs text-amber-400/50 mt-0.5">
                        Pending connection requests
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="relative opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex items-center ml-2">
                      <span className="absolute -left-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500 delay-100">
                        →
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 delay-150">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>

              <li className="relative z-10">
                <Link
                  to="/connections"
                  className="flex text-purple-300 text-lg justify-between items-center px-4 py-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-indigo-500/20 hover:text-white transition-all duration-500 group relative overflow-hidden border border-white/5 hover:border-purple-400/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>

                  <div className="flex items-center relative z-10">
                    <div className="relative mr-3">
                      <div className="absolute -inset-2 bg-purple-400/20 rounded-full blur-sm group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-full border border-purple-400/30">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-fuchsia-400/50 group-hover:scale-110 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="text-fuchsia-500 group-hover:text-white">
                        Your Connections
                      </div>
                      <div className="text-xs text-fuchsia-300 mt-0.5">
                        Manage your network
                      </div>
                    </div>
                  </div>

                  <span className="relative opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex items-center">
                    <span className="absolute -left-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500 delay-100">
                      →
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 delay-150">
                      →
                    </span>
                  </span>
                </Link>
              </li>

              <li className="border-t border-white/10 pt-2 mt-2 relative z-10">
                <a
                  onClick={handleLogout}
                  className="flex text-red-400 text-lg justify-between items-center px-4 py-4 rounded-xl hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-600/20 hover:text-white transition-all duration-500 group relative overflow-hidden cursor-pointer border border-white/5 hover:border-red-400/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>

                  <div className="flex items-center relative z-10">
                    <div className="relative mr-3">
                      <div className="absolute -inset-2 bg-red-400/20 rounded-full blur-sm group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-full border border-red-400/30">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-400 group-hover:scale-110 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div>Logout</div>
                      <div className="text-xs text-red-400/50 mt-0.5">
                        Sign out of your account
                      </div>
                    </div>
                  </div>

                  <span className="relative opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex items-center">
                    <span className="absolute -left-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500 delay-100">
                      →
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 delay-150">
                      →
                    </span>
                  </span>
                </a>
              </li>

              <div className="pt-2 mt-2 border-t border-white/10 text-center">
                <p className="text-xs text-amber-300/80">DevTinder </p>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          0% { opacity: 0; transform: translateY(-10px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-down { 
          animation: slide-down 0.2s ease-out forwards; 
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
