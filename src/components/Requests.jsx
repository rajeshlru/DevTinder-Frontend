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
      <div className="min-h-screen bg-black  flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md mx-auto">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-green-800 mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text ">
            Loading Connections
          </h2>
          <p className="text-gray-200 text-lg">
            We're gathering your connection requests...
          </p>
        </div>

        <div className="mt-12 w-full max-w-md">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md mb-5 animate-pulse border border-white/30"
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-gradient-to-r from-gray-200 to-gray-300 h-14 w-14"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-9 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-16"></div>
                  <div className="h-9 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-16"></div>
                </div>
              </div>
            </div>
          ))}
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
                </div>
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
            <Link to="/">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative">Explore Network</span>
              </button>
            </Link>
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
