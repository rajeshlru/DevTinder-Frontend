import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import GeminiAIAssistant from "./GeminiAIAssistant";

const SOCKET_SERVER_URL = BASE_URL;
const formatLastSeen = (lastSeen) => {
  if (!lastSeen) return "recently";

  const now = new Date();
  const lastSeenDate = new Date(lastSeen);
  const diffInMinutes = Math.floor((now - lastSeenDate) / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays === 1) return "yesterday";
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return lastSeenDate.toLocaleDateString();
};
const Chat = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const [isLoadingTargetUser, setIsLoadingTargetUser] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchTargetUser = async () => {
      if (!targetUserId) {
        setIsLoadingTargetUser(false);
        return;
      }

      try {
        setIsLoadingTargetUser(true);
        const response = await fetch(`${BASE_URL}/${targetUserId}`);
        if (response.ok) {
          const userData = await response.json();
          setTargetUser(userData);
        }
      } catch (error) {
        console.error("Error fetching target user:", error);
      } finally {
        setIsLoadingTargetUser(false);
      }
    };

    fetchTargetUser();
  }, [targetUserId]);

  useEffect(() => {
    if (!user?._id) return;

    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Socket connected!", newSocket.id);
      setIsConnected(true);

      newSocket.emit("joinChat", {
        userId: user._id,
        firstName: user.firstName,
        targetUserId,
      });

      newSocket.emit("userOnline", { userId: user._id });

      newSocket.emit("getUserOnlineStatus", { targetUserId });
    });

    newSocket.on("userOnlineStatus", (data) => {
      console.log("📡 Online status update:", data);
      if (data.userId === targetUserId) {
        setTargetUser((prev) =>
          prev
            ? {
                ...prev,
                isOnline: data.isOnline,
                lastSeen: data.lastSeen,
              }
            : null
        );
      }
    });

    newSocket.on("userWentOnline", (data) => {
      console.log("🟢 User came online:", data);
      if (data.userId === targetUserId) {
        setTargetUser((prev) =>
          prev
            ? {
                ...prev,
                isOnline: true,
                lastSeen: null,
              }
            : null
        );
      }
    });

    newSocket.on("userWentOffline", (data) => {
      console.log("🔴 User went offline:", data);
      if (data.userId === targetUserId) {
        setTargetUser((prev) =>
          prev
            ? {
                ...prev,
                isOnline: false,
                lastSeen: data.lastSeen || new Date().toISOString(),
              }
            : null
        );
      }
    });

    newSocket.on("messageReceived", (message) => {
      console.log("📥 Message received:", message);

      setMessages((prev) => {
        const messageExists = prev.some((msg) => msg._id === message._id);
        if (messageExists) {
          console.log("⚠️ Duplicate message detected, skipping:", message._id);
          return prev;
        }
        return [...prev, message];
      });
    });

    newSocket.on("typing", (data) => {
      console.log("⌨️ Received typing event:", data);
      console.log("⌨️ Current user ID:", user._id);
      console.log("⌨️ Typing user ID:", data.userId);

      if (data.userId !== user._id) {
        console.log("⌨️ Setting isTyping to TRUE");
        setIsTyping(true);
        if (typingTimeout) clearTimeout(typingTimeout);
        const timeout = setTimeout(() => {
          console.log("⌨️ Auto-setting isTyping to FALSE after timeout");
          setIsTyping(false);
        }, 3000);
        setTypingTimeout(timeout);
      }
    });

    newSocket.on("stopTyping", (data) => {
      console.log("🛑 Received stopTyping event:", data);
      if (data.userId !== user._id) {
        console.log("🛑 Setting isTyping to FALSE");
        setIsTyping(false);
        if (typingTimeout) {
          clearTimeout(typingTimeout);
          setTypingTimeout(null);
        }
      }
    });

    newSocket.on("messageError", (errorData) => {
      console.error("❌ Failed to send message:", errorData);
      alert("Failed to send message. Please try again.");
    });

    newSocket.on("messageDelivered", (data) => {
      console.log("✅ Message delivered:", data);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected!");
      setIsConnected(false);

      if (user?._id) {
        newSocket.emit("userOffline", {
          userId: user._id,
          lastSeen: new Date().toISOString(),
        });
      }
    });

    return () => {
      console.log("🧹 Cleaning up socket connection.");

      if (typingTimeout) clearTimeout(typingTimeout);

      if (user?._id && newSocket.connected) {
        newSocket.emit("userOffline", {
          userId: user._id,
          lastSeen: new Date().toISOString(),
        });
      }

      newSocket.disconnect();
      setSocket(null);
    };
  }, [user?._id, user?.firstName, targetUserId]);

  useEffect(() => {
    if (!socket) return;

    const handleMessageReceived = (message) => {
      console.log("📥 Message received in handler:", message);

      setMessages((prev) => {
        const messageExists = prev.some(
          (msg) =>
            msg._id === message._id ||
            (msg.text === message.text &&
              msg.sender?._id === message.sender?._id &&
              new Date(msg.timestamp).getTime() ===
                new Date(message.timestamp).getTime())
        );

        if (messageExists) {
          console.log("⚠️ Duplicate message prevented:", message._id);
          return prev;
        }
        return [...prev, message];
      });
    };

    const handleChatHistory = (data) => {
      console.log("📚 Chat history received:", data);
      if (data.messages) {
        setMessages(data.messages);
      } else {
        setMessages(data);
      }
    };

    socket.on("messageReceived", handleMessageReceived);
    socket.on("chatHistory", handleChatHistory);

    return () => {
      socket.off("messageReceived", handleMessageReceived);
      socket.off("chatHistory", handleChatHistory);
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !socket) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId: user._id,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");

    if (socket) {
      socket.emit("stopTyping", {
        userId: user._id,
        targetUserId,
      });
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewMessage(value);

    if (socket) {
      if (value.length > 0) {
        socket.emit("typing", {
          userId: user._id,
          targetUserId,
        });
      } else {
        socket.emit("stopTyping", {
          userId: user._id,
          targetUserId,
        });
      }
    }
  };

  if (!user?._id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="text-center bg-white/10 backdrop-blur-lg p-12 rounded-3xl shadow-2xl max-w-md w-full border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10"></div>
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-4">
              Join the Conversation
            </h2>
            <p className="text-blue-100/80 text-lg mb-8 leading-relaxed">
              Sign in to connect with friends and start chatting instantly
            </p>
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-4 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden">
              <span className="relative z-10">Begin Chatting</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
        <div className="text-center bg-white/10 backdrop-blur-lg p-14 rounded-3xl shadow-2xl max-w-md w-full border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10"></div>
          <div className="relative">
            <div className="relative flex justify-center items-center mb-10">
              <div className="absolute animate-ping h-24 w-24 rounded-full bg-purple-400/30"></div>
              <div className="absolute animate-pulse h-20 w-20 rounded-full bg-pink-400/20"></div>
              <div className="relative animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-r-2 border-l-1 border-white/80">
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <div className="absolute text-white text-2xl font-light tracking-widest">
                ⚡
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
              Establishing Connection
            </h2>
            <div className="space-y-3">
              <p className="text-white/90 text-lg font-light">
                Creating secure channel
              </p>
              <p className="text-white/70 text-sm">Almost ready to begin</p>
              <div className="pt-4">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black/90 to-black/90 flex items-center justify-center pt-16 font-sans">
      <div className="w-full max-w-4xl h-[90vh] flex flex-col bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/60">
        <div className="bg-gradient-to-r from-white to-blue-200/80 border-b border-blue-100/50 px-6 py-3 flex items-center justify-between shadow-sm shadow-blue-100/30 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg shadow-blue-500/30">
                {isLoadingTargetUser ? (
                  <div className="animate-pulse bg-gradient-to-r from-blue-400 to-purple-400 w-full h-full rounded-2xl"></div>
                ) : targetUser?.user?.photoUrl ? (
                  <img
                    src={targetUser.user.photoUrl}
                    alt={targetUser.user.firstName || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-xl">
                    {targetUser?.user?.firstName?.charAt(0)?.toUpperCase() ||
                      "C"}
                  </span>
                )}
              </div>
              {targetUser?.isOnline ? (
                <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-400 border-3 border-white shadow-lg shadow-green-400/50"></span>
              ) : (
                <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-gray-400 border-3 border-white shadow-lg shadow-gray-400/30"></span>
              )}
            </div>
            <div className="space-y-1">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-950 bg-clip-text text-transparent">
                {isLoadingTargetUser ? (
                  <div className="animate-pulse bg-gradient-to-r from-gray-300 to-gray-200 h-6 w-40 rounded-lg"></div>
                ) : targetUser ? (
                  `${targetUser.user.firstName} ${
                    targetUser.user.lastName || ""
                  }`
                ) : (
                  "Chat Room"
                )}
              </h1>
              <div className="flex items-center space-x-2">
                {targetUser?.isOnline ? (
                  <>
                    <p className="text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Online
                    </p>
                  </>
                ) : targetUser?.isOnline === false ? (
                  <>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <p className="text-sm font-semibold bg-gradient-to-r from-gray-500 to-gray-600 bg-clip-text text-transparent">
                      Offline • Last seen{" "}
                      {targetUser?.lastSeen
                        ? formatLastSeen(targetUser.lastSeen)
                        : "recently"}
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <GeminiAIAssistant />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide p-8 space-y-6 bg-gradient-to-b from-purple-200 to-blue-100/30">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6 py-16">
              <div className="relative mb-8">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-100/80 to-purple-100/80 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-200/50 backdrop-blur-sm">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full shadow-lg animate-bounce"></div>
                <div
                  className="absolute -bottom-2 -left-2 w-5 h-5 bg-pink-400 rounded-full shadow-lg animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>

              <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                No Messages Yet
              </h3>

              <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed font-medium">
                Start a conversation and make this space come alive with your
                words! 🌟
              </p>

              <div className="flex items-center space-x-4 text-gray-500 animate-pulse">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-blue-500 animate-bounce"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Send your first message
                  </span>
                </div>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={msg._id || index}
                className={`flex items-end gap-3 ${
                  msg.sender?._id === user._id ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender?._id !== user._id && (
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex-shrink-0 shadow-lg overflow-hidden">
                    <img
                      src={
                        msg.sender?.photoUrl ||
                        targetUser?.user?.photoUrl ||
                        `https://ui-avatars.com/api/?name=${
                          msg.sender?.firstName ||
                          targetUser?.user?.firstName ||
                          "User"
                        }&background=random`
                      }
                      alt={
                        msg.sender?.firstName ||
                        targetUser?.user?.firstName ||
                        "User"
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div
                  className={`max-w-xs md:max-w-md px-5 py-4 rounded-3xl shadow-lg backdrop-blur-sm ${
                    msg.sender?._id === user._id
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-lg shadow-blue-500/30"
                      : "bg-white/90 text-gray-800 rounded-bl-lg shadow-purple-500/20 border border-white/50"
                  } transform transition-all duration-300 hover:scale-105`}
                >
                  <div className="flex items-baseline gap-2 mb-2">
                    <span
                      className={`text-xs font-bold ${
                        msg.sender?._id === user._id
                          ? "text-emerald-950"
                          : "text-purple-600/90"
                      }`}
                    >
                      {msg.sender?.firstName || msg.firstName}
                    </span>
                  </div>
                  <div className="flex gap-5">
                    <p className="text-sm leading-relaxed font-medium">
                      {msg.text}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p
                        className={`text-xs ${
                          msg.sender?._id === user._id
                            ? "text-blue-200/90"
                            : "text-gray-500/90"
                        }`}
                      >
                        {msg.timestamp
                          ? new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : new Date().toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                      </p>
                    </div>
                  </div>
                </div>

                {msg.sender?._id === user._id && (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex-shrink-0 shadow-lg overflow-hidden">
                    <img
                      src={
                        msg.sender?.photoUrl ||
                        user?.photoUrl ||
                        `https://ui-avatars.com/api/?name=${user.firstName}&background=random`
                      }
                      alt={user.firstName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex items-end gap- justify-start ">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={
                    targetUser?.user?.photoUrl ||
                    `https://ui-avatars.com/api/?name=${targetUser?.user?.firstName}&background=random`
                  }
                  alt="Typing user"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white/90 px-5 py-4 rounded-3xl rounded-bl-lg shadow-lg shadow-purple-500/20 border border-white/50">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    typing...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-gradient-to-l from-green-100/60 to-green-100/60 border-t border-green-100/80 p-6 flex-shrink-0 shadow-lg shadow-blue-100/30">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center space-x-4"
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-3 text-gray-500 hover:text-yellow-500 rounded-2xl hover:bg-yellow-50/80 transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-lg"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              {showEmojiPicker && (
                <div className="absolute bottom-full mb-3 left-0 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl shadow-yellow-500/20 border border-yellow-100/50 p-5 w-96 z-10">
                  <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto">
                    {[
                      "😀",
                      "😂",
                      "🥰",
                      "😎",
                      "🔥",
                      "👍",
                      "❤️",
                      "🎉",
                      "🙏",
                      "💯",
                      "✨",
                      "🤔",
                      "😭",
                      "🥺",
                      "🙈",
                      "💀",
                      "👋",
                      "🎶",
                      "🍕",
                      "☕",
                      "⭐",
                      "🌈",
                      "🚀",
                      "💪",
                      "😊",
                      "🤩",
                      "😍",
                      "😘",
                      "😜",
                      "🤗",
                      "🎯",
                      "🌟",
                    ].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => {
                          setNewMessage((prev) => prev + emoji);
                          setShowEmojiPicker(false);
                        }}
                        className="text-2xl hover:bg-yellow-50/80 rounded-xl p-2 transition-all duration-200 transform hover:scale-125 hover:rotate-12"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-yellow-100/50 text-xs text-gray-500 text-center font-medium">
                    Click an emoji to express yourself! ✨
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 relative">
              <input
                type="text"
                className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-0 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-300/50 focus:bg-white text-gray-800 placeholder-gray-500 transition-all duration-300 shadow-lg shadow-blue-100/30 text-lg font-medium"
                value={newMessage}
                onChange={handleInputChange}
                placeholder="Type your message... 💫"
                disabled={isLoadingTargetUser}
                autoComplete="off"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

            <button
              type="submit"
              disabled={!newMessage.trim() || !socket}
              className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-3 focus:ring-blue-400/50 focus:ring-offset-2 transition-all duration-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-110 active:scale-95 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-purple-500/40"
            >
              <svg
                className="w-6 h-6 transform rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
