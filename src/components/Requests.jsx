import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";
import { addConnection, addSingleConnection } from "../utils/connectionSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState({});
  const [activeCard, setActiveCard] = useState(null);

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

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data?.connectionRequest || []));
      dispatch(removeRequest());
    } catch (err) {
      console.error(err);
      setError("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (requestId, status) => {
    setProcessing((prev) => ({ ...prev, [requestId]: status }));

    try {
      const response = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        { requestId, status },
        { withCredentials: true }
      );

      fetchRequests();

      if (status === "accepted") {
        if (response.data && response.data.connection) {
          dispatch(addSingleConnection(response.data.connection));
        } else {
          fetchConnections();
        }
      }
    } catch (err) {
      console.error(err);
      setError(`Failed to ${status} request`);
    } finally {
      setProcessing((prev) => {
        const newState = { ...prev };
        delete newState[requestId];
        return newState;
      });
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}

          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg animate-orbit-slow">
            <div className="absolute inset-0.5 bg-orange-300/30 rounded-full"></div>
          </div>
          <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-lg animate-orbit-fast">
            <div className="absolute inset-0.5 bg-blue-300/30 rounded-full"></div>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto relative z-10">
          <div className="mb-12 relative">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-cyan-500 shadow-2xl"></div>

              <div className="absolute inset-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse shadow-lg flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 rounded-full animate-ping"></div>
              </div>

              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-lg animate-electron-orbit"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  <div className="w-1 h-1 bg-white rounded-full absolute top-1 left-1"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12 space-y-4">
            <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x mb-6">
              Quantum Loading
            </h2>
            <p className="text-xl text-white/80 font-light tracking-wide">
              Initializing connection matrix
            </p>
            <div className="flex justify-center items-center space-x-2">
              {[0, 1, 2].map((dot) => (
                <div
                  key={dot}
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${dot * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
            {[1, 2, 3, 4, 5, 6].map((card) => (
              <div
                key={card}
                className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 animate-pulse hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-2xl animate-pulse group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-500"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full animate-pulse group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-500"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full w-2/3 animate-pulse group-hover:from-green-600 group-hover:to-emerald-600 transition-all duration-500"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-2">
                      <div className="w-8 h-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full animate-pulse"></div>
                      <div className="w-6 h-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-20 h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl animate-pulse group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-500"></div>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 bg-clip-border animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                  <div className="absolute inset-1 rounded-3xl bg-gray-900"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 w-full max-w-md mx-auto">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex justify-between text-white/60 text-sm mb-2">
                <span>Syncing data</span>
                <span className="animate-pulse">•••</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 h-2 rounded-full animate-progress-grow shadow-lg shadow-cyan-500/25"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto shadow-md">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-7 text-lg">{error}</p>
          <button
            onClick={fetchRequests}
            className="px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-indigo-200 to-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-blue-200 to-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-300 rounded-full blur-3xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="absolute top-20 left-10 w-8 h-8 bg-indigo-300 rounded-lg rotate-45 opacity-60 animate-float">
          <div className="absolute inset-1 bg-white/30 rounded"></div>
        </div>
        <div className="absolute bottom-32 right-16 w-6 h-6 bg-purple-400 rounded-full opacity-50 animate-float delay-700">
          <div className="absolute inset-1 bg-white/30 rounded-full"></div>
        </div>
        <div className="absolute top-40 right-20 w-10 h-10 bg-blue-300 rotate-12 opacity-40 animate-float delay-1200">
          <div className="absolute inset-1 bg-white/30"></div>
        </div>

        <div className="text-center max-w-2xl mx-auto relative z-10">
          <div className="mb-10 relative">
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>

              <div className="absolute inset-4 bg-gradient-to-br from-white to-blue-50 rounded-full shadow-2xl border border-white/50 backdrop-blur-sm flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      ></path>
                    </svg>
                  </div>

                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="absolute w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg border border-white/20 animate-orbit"
                      style={{
                        animationDelay: `${i * 0.8}s`,
                        top: `${Math.sin((i * 2 * Math.PI) / 5) * 40 + 50}%`,
                        left: `${Math.cos((i * 2 * Math.PI) / 5) * 40 + 50}%`,
                      }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-indigo-300 rounded-full animate-float"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`,
                      opacity: 0.6,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              No Connection Requests
            </h2>
            <div className="space-y-3">
              <p className="text-xl text-gray-700 font-medium leading-relaxed">
                Your network is waiting to grow
              </p>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                When someone sends you a connection request, it will appear
                here. Start building your network by reaching out to others!
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative">Explore Network</span>
            </button>
            <button className="px-6 py-3 border-2 border-indigo-200 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300">
              Invite Connections
            </button>
          </div>

          <div className="flex justify-center space-x-3">
            {[0, 1, 2, 3, 4].map((delay) => (
              <div key={delay} className="relative w-4 h-4">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-ping opacity-60"
                  style={{ animationDelay: `${delay * 0.2}s` }}
                ></div>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-bounce"
                  style={{ animationDelay: `${delay * 0.2}s` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-100 via-indigo-100 to-purple-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 mt-16">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-5 relative z-10">
              Connection Requests
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-3 bg-indigo-200/60 rounded-full blur-md"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-xl mt-6">
            People who want to connect with you. Accept or decline their
            requests.
          </p>
          <div className="mt-4 flex justify-center items-center">
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
            <div className="w-4 h-4 rounded-full bg-indigo-400 mx-2"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((request, index) => {
            const {
              firstName,
              lastName,
              age,
              gender,
              photoUrl,
              _id,
              about,
              skills,
            } = request.fromUserId || {};

            return (
              <div
                key={_id}
                className={`relative  rounded-3xl overflow-hidden shadow-lg transition-all duration-500 transform hover:-translate-y-2  border border-white/50 backdrop-blur-sm bg-white/70
                  ${
                    activeCard === _id
                      ? "ring-0 ring-indigo-400/30 "
                      : "hover:shadow-xl"
                  }`}
                onMouseEnter={() => setActiveCard(_id)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  backgroundImage:
                    "radial-gradient(at top right, rgba(167, 139, 250, 0.1) 0%, transparent 50%), radial-gradient(at bottom left, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-indigo-200/30 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 -ml-12 -mb-12 bg-purple-200/30 rounded-full"></div>

                <div className="relative z-10 p-8 flex flex-col h-full">
                  <div className="flex flex-col items-center text-center flex-grow">
                    <div className="relative mb-6">
                      <div
                        className={`absolute -inset-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-70 blur-lg transition-all duration-700 ${
                          activeCard === _id ? "opacity-90 scale-110" : ""
                        }`}
                      ></div>
                      <div className="relative rounded-full p-1 bg-white shadow-lg">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-cyan-100 to-purple-100 p-1">
                          <img
                            src={photoUrl || "/default-avatar.png"}
                            alt={`${firstName} ${lastName}`}
                            className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {firstName} {lastName}
                    </h3>

                    {(age || gender) && (
                      <p className="text-green-600 mb-4 text-sm flex items-center justify-center">
                        <svg
                          className="w-4 h-4 mr-1 text-indigo-950"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          ></path>
                        </svg>
                        {age && `${age} years`} {age && gender && "•"} {gender}
                      </p>
                    )}

                    {about && (
                      <div className="mb-5 w-full px-2">
                        <p className="text-gray-800 text-sm leading-relaxed max-w-xs line-clamp-3 italic">
                          "{about}"
                        </p>
                      </div>
                    )}

                    {skills && skills.length > 0 && (
                      <div className="mb-6 w-full">
                        <h4 className="text-xs font-semibold text-orange-600 mb-3 uppercase tracking-wider flex items-center justify-center">
                          <svg
                            className="w-4 h-4 mr-2 text-indigo-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                          </svg>
                          Skills & Expertise
                        </h4>
                        <div className="flex flex-wrap justify-center gap-2">
                          {skills.slice(0, 4).map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-cyan-500 text-xs font-medium rounded-full shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md border border-indigo-100"
                            >
                              {skill}
                            </span>
                          ))}
                          {skills.length > 4 && (
                            <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                              +{skills.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4 mt-8 pt-5 border-t border-gray-100">
                    <button
                      onClick={() => handleResponse(request._id, "accepted")}
                      disabled={processing[request._id]}
                      className={`flex-1 py-4 rounded-2xl font-medium overflow-hidden relative group/btn transition-all duration-500 ${
                        processing[request._id] === "accepted"
                          ? "bg-gradient-to-r from-green-400 to-green-500 cursor-not-allowed shadow-lg shadow-green-300/50"
                          : "bg-gradient-to-r from-green-400 to-emerald-600 hover:scale-105 hover:shadow-2xl hover:shadow-green-300/60"
                      }`}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700">
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/20 rounded-full animate-ping"></div>
                        <div
                          className="absolute -bottom-4 -right-4 w-6 h-6 bg-white/30 rounded-full animate-ping"
                          style={{ animationDelay: "0.3s" }}
                        ></div>
                      </div>

                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000">
                        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                      </div>

                      <div className="relative z-10 flex items-center justify-center">
                        {processing[request._id] === "accepted" ? (
                          <div className="flex items-center justify-center text-white">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            <span className="text-sm font-medium">
                              Connecting...
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2 text-white transform group-hover/btn:scale-105 transition-transform duration-300">
                            <div className="relative">
                              <svg
                                className="w-6 h-6 transform group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-bounce"></div>
                            </div>
                            <span className="text-sm font-bold group-hover/btn:tracking-wider transition-all duration-300">
                              Accept
                            </span>
                          </div>
                        )}
                      </div>
                    </button>

                    <button
                      onClick={() => handleResponse(request._id, "rejected")}
                      disabled={processing[request._id]}
                      className={`flex-1 py-4 rounded-2xl font-medium overflow-hidden relative group/btn transition-all duration-500 ${
                        processing[request._id] === "rejected"
                          ? "bg-gradient-to-r from-rose-400 to-rose-500 cursor-not-allowed shadow-lg shadow-rose-300/50"
                          : "bg-gradient-to-r from-rose-400 to-red-600 hover:scale-105 hover:shadow-2xl hover:shadow-rose-300/60"
                      }`}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700">
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full animate-ping"></div>
                        <div
                          className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/30 rounded-full animate-ping"
                          style={{ animationDelay: "0.3s" }}
                        ></div>
                      </div>

                      <div className="absolute inset-0 translate-x-full group-hover/btn:-translate-x-full transition-transform duration-1000">
                        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"></div>
                      </div>

                      <div className="relative z-10 flex items-center justify-center">
                        {processing[request._id] === "rejected" ? (
                          <div className="flex items-center justify-center text-white">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            <span className="text-sm font-medium">
                              Declining...
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2 text-white transform group-hover/btn:scale-105 transition-transform duration-300">
                            <div className="relative">
                              <svg
                                className="w-6 h-6 transform group-hover/btn:scale-110 group-hover/btn:-rotate-12 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-bounce"></div>
                            </div>
                            <span className="text-sm font-bold group-hover/btn:tracking-wider transition-all duration-300">
                              Decline
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute transform rotate-45 bg-gradient-to-r from-indigo-100 to-purple-100 text-center w-32 -right-8 top-5 shadow-sm"></div>
                </div>

                <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
