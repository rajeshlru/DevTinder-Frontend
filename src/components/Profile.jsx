import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { addConnection } from "../utils/connectionSlice";

const Profile = () => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(
    "Initializing your digital identity"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        dispatch(addConnection(res?.data?.connections || []));
      } catch (err) {
        console.error("Failed to fetch connections", err);
      }
    };

    fetchConnections();
  }, [dispatch]);

  useEffect(() => {
    const signupFlag = sessionStorage.getItem("signupSuccess");
    if (signupFlag === "true") {
      setShowWelcomeMessage(true);
      sessionStorage.removeItem("signupSuccess");
    }
  }, []);

  useEffect(() => {
    const messages = [
      "Compiling developer essence...",
      "Syncing with the code matrix...",
      "Loading tech DNA sequence...",
      "Assembling digital persona...",
      "Finalizing cyber profile...",
      "Optimizing developer aura...",
      "Calibrating skill metrics...",
      "Uploading to the dev cloud...",
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      setLoadingMessage(messages[messageIndex]);
      messageIndex = (messageIndex + 1) % messages.length;
    }, 2500);

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
        setIsLoading(false);
        clearInterval(messageInterval);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setIsLoading(false);
        clearInterval(messageInterval);
      }
    };

    if (!user || !user.firstName) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
      clearInterval(messageInterval);
    }

    return () => clearInterval(messageInterval);
  }, [user, dispatch]);

  const handleOkayClick = () => {
    setShowWelcomeMessage(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400/30 text-xs font-mono animate-binary-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl animate-pulse-medium"></div>
        <div className="absolute top-2/3 left-1/2 w-28 h-28 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-fast"></div>

        <div className="text-center z-10 bg-gray-900/60 backdrop-blur-2xl rounded-3xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
          <div className="absolute inset-0 rounded-3xl border border-cyan-500/50 shadow-lg shadow-cyan-500/10 animate-neon-pulse"></div>

          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 animate-circuit-line"></div>
          <div className="absolute bottom-0 right-0 w-1 h-full bg-cyan-500/50 animate-circuit-line-vertical"></div>

          <div className="relative mb-10">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-500 via-purple-600 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 relative">
              <div className="w-28 h-28 bg-gray-900 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center animate-holo-pulse">
                  <svg
                    className="w-12 h-12 text-white"
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
            </div>

            <div className="absolute -top-4 -left-4 w-40 h-40 border-2 border-cyan-500/30 rounded-full animate-spin-slow"></div>
            <div className="absolute -top-6 -left-6 w-44 h-44 border-2 border-purple-500/30 rounded-full animate-spin-medium"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 border-2 border-emerald-500/30 rounded-full animate-spin-fast"></div>

            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-orbital-rotate"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  transformOrigin: `center`,
                }}
              ></div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 mb-6 animate-text-shimmer">
            {loadingMessage}
          </h2>

          <div className="relative w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto mb-8">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-progress-expand"></div>
            <div className="absolute -top-1 -left-2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            {["Skills", "Projects", "Experience"].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto bg-cyan-900/50 rounded-lg flex items-center justify-center border border-cyan-500/30 mb-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping-slow"></div>
                </div>
                <p className="text-cyan-300 text-sm">{stat}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-1 mb-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-gray-800/70 border border-cyan-500/30 rounded flex items-center justify-center font-mono text-cyan-400 animate-binary-flash"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {i % 2 === 0 ? "1" : "0"}
              </div>
            ))}
          </div>

          <p className="text-cyan-300/70 text-sm font-mono">
            Status:{" "}
            <span className="text-cyan-400">Connecting to DevNetwork</span>
          </p>
        </div>

        <div className="absolute top-1/4 right-1/4 text-3xl animate-float-tech">
          {"</>"}
        </div>
        <div
          className="absolute bottom-1/4 left-1/4 text-3xl animate-float-tech"
          style={{ animationDelay: "1.5s" }}
        >
          {"{}"}
        </div>
        <div
          className="absolute top-1/2 right-1/3 text-3xl animate-float-tech"
          style={{ animationDelay: "2.5s" }}
        >
          {"<>"}
        </div>

        <div className="absolute top-10 left-10 opacity-30">
          <div className="w-16 h-16 border-t-2 border-l-2 border-cyan-500"></div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-30">
          <div className="w-16 h-16 border-b-2 border-r-2 border-cyan-500"></div>
        </div>

        <style>
          {`
            @keyframes progress-expand {
              0% { width: 0%; opacity: 0.5; }
              50% { width: 60%; opacity: 1; }
              100% { width: 100%; opacity: 0.5; }
            }
            .animate-progress-expand {
              animation: progress-expand 2.5s ease-in-out infinite;
            }
            @keyframes float-tech {
              0%, 100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.7; }
              50% { transform: translateY(-25px) rotate(10deg) scale(1.2); opacity: 1; }
            }
            .animate-float-tech {
              animation: float-tech 8s ease-in-out infinite;
            }
            @keyframes binary-fall {
              0% { transform: translateY(-100px); opacity: 0; }
              5% { opacity: 0.7; }
              95% { opacity: 0.7; }
              100% { transform: translateY(100vh); opacity: 0; }
            }
            @keyframes orbital-rotate {
              0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
              100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
            }
            @keyframes neon-pulse {
              0%, 100% { box-shadow: 0 0 5px rgba(34, 211, 238, 0.3), 0 0 10px rgba(34, 211, 238, 0.2); }
              50% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.5), 0 0 30px rgba(34, 211, 238, 0.3); }
            }
            @keyframes circuit-line {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            @keyframes circuit-line-vertical {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100%); }
            }
            @keyframes holo-pulse {
              0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.5); }
              50% { box-shadow: 0 0 40px rgba(34, 211, 238, 0.8), 0 0 60px rgba(168, 85, 247, 0.5); }
            }
            @keyframes text-shimmer {
              0% { background-position: -100% 0; }
              100% { background-position: 200% 0; }
            }
            @keyframes binary-flash {
              0%, 100% { opacity: 0.3; background-color: rgba(17, 24, 39, 0.7); }
              50% { opacity: 1; background-color: rgba(34, 211, 238, 0.3); }
            }
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes spin-medium {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            @keyframes spin-fast {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes ping-slow {
              0% { transform: scale(1); opacity: 1; }
              100% { transform: scale(3); opacity: 0; }
            }
            .bg-grid-pattern {
              background-image: linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px);
              background-size: 30px 30px;
            }
            .animate-binary-fall {
              animation: binary-fall linear infinite;
            }
            .animate-orbital-rotate {
              animation: orbital-rotate 4s linear infinite;
            }
            .animate-neon-pulse {
              animation: neon-pulse 3s ease-in-out infinite;
            }
            .animate-circuit-line {
              animation: circuit-line 3s linear infinite;
            }
            .animate-circuit-line-vertical {
              animation: circuit-line-vertical 4s linear infinite;
            }
            .animate-holo-pulse {
              animation: holo-pulse 2s ease-in-out infinite;
            }
            .animate-text-shimmer {
              background-size: 200% auto;
              animation: text-shimmer 3s linear infinite;
            }
            .animate-binary-flash {
              animation: binary-flash 1.5s ease-in-out infinite;
            }
            .animate-spin-slow {
              animation: spin-slow 15s linear infinite;
            }
            .animate-spin-medium {
              animation: spin-medium 12s linear infinite;
            }
            .animate-spin-fast {
              animation: spin-fast 8s linear infinite;
            }
            .animate-ping-slow {
              animation: ping-slow 2s ease-out infinite;
            }
            .animate-pulse-slow {
              animation: pulse 8s ease-in-out infinite;
            }
            .animate-pulse-medium {
              animation: pulse 6s ease-in-out infinite;
            }
            .animate-pulse-fast {
              animation: pulse 4s ease-in-out infinite;
            }
          `}
        </style>
      </div>
    );
  }

  if (showWelcomeMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400/20 text-xs font-mono animate-binary-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 7}s`,
                opacity: `${0.2 + Math.random() * 0.3}`,
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-grid-pattern opacity-15"></div>

        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse-medium"></div>
        <div className="absolute top-2/3 left-1/2 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-fast"></div>
        <div
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-52 h-52 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-medium"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative transform perspective-1000 hover:rotate-x-5 transition-transform duration-700">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-purple-600/10 to-emerald-500/10 rounded-3xl blur-xl opacity-70 animate-pulse-medium"></div>

          <div className="text-center z-20 bg-gray-900/80 backdrop-blur-2xl rounded-3xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 relative overflow-hidden max-w-2xl w-full transform transition-all duration-500 hover:shadow-cyan-500/40 hover:border-cyan-500/50">
            <div className="absolute inset-0 rounded-3xl border border-cyan-500/50 shadow-lg shadow-cyan-500/10 animate-neon-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-circuit-line"></div>
            <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-circuit-line-vertical"></div>

            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-orbital-rotate opacity-70"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  transformOrigin: `center`,
                  top: "50%",
                  left: "50%",
                }}
              ></div>
            ))}

            <div className="absolute -top-4 -left-4 w-40 h-40 border-2 border-cyan-500/20 rounded-full animate-spin-slow"></div>
            <div className="absolute -top-6 -right-6 w-44 h-44 border-2 border-purple-500/20 rounded-full animate-spin-medium"></div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 border-2 border-emerald-500/20 rounded-full animate-spin-fast"></div>
            <div
              className="absolute -bottom-6 -right-6 w-36 h-36 border-2 border-blue-500/20 rounded-full animate-spin-slow"
              style={{ animationDelay: "3s" }}
            ></div>

            <div className="relative mb-10 transform transition-transform duration-500 hover:scale-105">
              <div className="w-40 h-40 mx-auto bg-gradient-to-br from-cyan-500 via-purple-600 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 relative mb-8 transform transition-all duration-500 hover:scale-110">
                <div className="w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center animate-holo-pulse relative">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping-slow opacity-70"
                        style={{
                          animationDelay: `${i * 0.3}s`,
                          top: "50%",
                          left: "50%",
                          transform: `rotate(${
                            i * 45
                          }deg) translateX(30px) rotate(-${i * 45}deg)`,
                        }}
                      ></div>
                    ))}

                    <svg
                      className="w-16 h-16 text-white relative z-10"
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
                </div>
              </div>

              <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 mb-6 animate-text-shimmer">
                Welcome to <span className="text-white">DevNetwork</span>!
              </h2>

              <p className="text-cyan-100 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                Your digital identity has been successfully created. Let's craft
                your developer profile to unlock the full potential of our
                community.
              </p>
            </div>

            <button
              onClick={handleOkayClick}
              className="relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30 z-10 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                Begin Profile Setup
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>

              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute -inset-2 bg-cyan-500/30 rounded-xl blur-md group-hover:bg-cyan-500/50 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            </button>

            <p className="text-cyan-300/70 text-sm mt-6 animate-pulse">
              Join thousands of developers shaping the future
            </p>
          </div>
        </div>

        <div className="absolute top-1/4 right-1/4 text-3xl text-cyan-400/30 animate-float-tech">
          {"</>"}
        </div>
        <div
          className="absolute bottom-1/4 left-1/4 text-3xl text-purple-400/30 animate-float-tech"
          style={{ animationDelay: "1.5s" }}
        >
          {"{}"}
        </div>
        <div
          className="absolute top-1/2 right-1/3 text-3xl text-emerald-400/30 animate-float-tech"
          style={{ animationDelay: "2.5s" }}
        >
          {"<>"}
        </div>
        <div
          className="absolute top-1/3 left-1/4 text-2xl text-blue-400/20 animate-float-tech"
          style={{ animationDelay: "0.5s", fontSize: "2rem" }}
        >
          {"[]"}
        </div>
        <div
          className="absolute bottom-1/3 right-1/3 text-2xl text-indigo-400/20 animate-float-tech"
          style={{ animationDelay: "3s", fontSize: "2rem" }}
        >
          {"()"}
        </div>

        <div className="absolute top-10 left-10 opacity-30">
          <div className="w-16 h-16 border-t-2 border-l-2 border-cyan-500 rounded-tl-lg"></div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-30">
          <div className="w-16 h-16 border-b-2 border-r-2 border-cyan-500 rounded-br-lg"></div>
        </div>
        <div className="absolute top-10 right-10 opacity-30">
          <div className="w-16 h-16 border-t-2 border-r-2 border-purple-500 rounded-tr-lg"></div>
        </div>
        <div className="absolute bottom-10 left-10 opacity-30">
          <div className="w-16 h-16 border-b-2 border-l-2 border-emerald-500 rounded-bl-lg"></div>
        </div>

        <style>
          {`
          .perspective-1000 {
            perspective: 1000px;
          }
          .rotate-x-5 {
            transform: rotateX(5deg);
          }
          @keyframes ping-slow {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
          }
          .animate-ping-slow {
            animation: ping-slow 2s ease-out infinite;
          }
        `}
        </style>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <EditProfile user={user || {}} />
    </div>
  );
};

export default Profile;
