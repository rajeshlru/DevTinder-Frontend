import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GeminiAIAssistant = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef(null);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    const savedApiKey =
      localStorage.getItem("gemini_api_key") ||
      import.meta.env.VITE_GEMINI_API_KEY;
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setDebugInfo("API key loaded from localStorage");
    } else {
      setShowApiKeyInput(true);
      setDebugInfo("No API key found");
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isAssistantOpen && messages.length === 0 && apiKey) {
      setMessages([
        {
          id: 1,
          text: "Hello! I'm your Gemini AI assistant. How can I assist you today? 🚀",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isAssistantOpen, messages.length, apiKey]);

  const getGeminiResponse = async (userMessage) => {
    if (!apiKey) {
      throw new Error("API key not configured");
    }

    setDebugInfo(`Sending request to Gemini API...`);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      setDebugInfo("Model initialized, generating content...");

      const result = await model.generateContent(userMessage);
      const response = await result.response;

      setDebugInfo("Response received successfully");
      return response.text();
    } catch (error) {
      setDebugInfo(`API Error: ${error.message}`);
      throw error;
    }
  };

  const sendMessage = async (text) => {
    const trimmedText = text.trim();
    if (!trimmedText || !apiKey) {
      setDebugInfo("No message text or API key");
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: trimmedText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setDebugInfo("Sending message...");

    try {
      const aiResponse = await getGeminiResponse(trimmedText);
      const assistantMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setConsecutiveErrors(0);
      setDebugInfo("Message sent successfully");
      setIsLoading(false);
    } catch (error) {
      console.error("API call failed:", error);
      const newErrorCount = consecutiveErrors + 1;
      setConsecutiveErrors(newErrorCount);
      setDebugInfo(
        `API call failed: ${error.message}. Error count: ${newErrorCount}`
      );

      setTimeout(() => {
        let fallbackText;
        const greetings = ["hi", "hello", "hey", "yo", "greetings"];
        const lowerCaseText = trimmedText.toLowerCase();

        if (newErrorCount > 2) {
          fallbackText =
            "I seem to be having some trouble connecting to the AI service. Please check your API key and try again. 🙏";
          setConsecutiveErrors(0);
        } else if (greetings.some((greet) => lowerCaseText.includes(greet))) {
          fallbackText = "Hello! How can I assist you today? 😊";
        } else {
          fallbackText = `I'm currently analyzing your question about "${trimmedText}". Let me think about that...`;
        }

        const fallbackMessage = {
          id: Date.now() + 1,
          text: fallbackText,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, fallbackMessage]);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    const newApiKey = e.target.apiKey.value.trim();
    if (newApiKey) {
      setApiKey(newApiKey);
      localStorage.setItem("gemini_api_key", newApiKey);
      setShowApiKeyInput(false);
      setDebugInfo("API key saved successfully");
      setMessages([
        {
          id: Date.now(),
          text: "✅ API key configured! You can now chat with the assistant.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const clearApiKey = () => {
    setApiKey("");
    localStorage.removeItem("gemini_api_key");
    setShowApiKeyInput(true);
    setMessages([]);
    setDebugInfo("API key cleared");
  };

  const quickActions = [
    {
      label: "💡 Explain React",
      prompt: "Explain React.js to me like I'm five.",
    },
    {
      label: "📝 Write a function",
      prompt: "Write a javascript function to reverse a string",
    },
    {
      label: "🔍 Suggest ideas",
      prompt: "Suggest three project ideas for a web developer portfolio.",
    },
  ];

  return (
    <div className="relative font-sans">
      <button
        onClick={() => setIsAssistantOpen(!isAssistantOpen)}
        className="relative flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 group"
      >
        <span className="text-lg">🤖</span>
        <span className="font-medium">AI Assistant</span>
        <div
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
            apiKey ? "bg-green-400 animate-pulse" : "bg-yellow-400"
          }`}
        ></div>
      </button>

      {isAssistantOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 h-[500px] bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🤖</span>
              <div>
                <h3 className="font-bold">Gemini AI Assistant</h3>
                <p className="text-xs text-purple-100">
                  {apiKey ? "Ready" : "API Key Required"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {apiKey && (
                <>
                  <button
                    onClick={clearApiKey}
                    className="text-xs bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                    title="Clear API key"
                  >
                    🔑
                  </button>
                </>
              )}
              <button
                onClick={() => setIsAssistantOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {showApiKeyInput && (
            <div className="p-4 bg-yellow-50 border-b border-yellow-200">
              <div className="text-sm text-yellow-800 mb-2">
                <strong>Gemini API Key Setup</strong>
                <p className="text-xs mt-1">
                  Get your free key from{" "}
                  <a
                    href="https://aistudio.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                  >
                    Google AI Studio
                  </a>
                </p>
                <p className="text-xs mt-1 text-yellow-700">
                  Make sure to enable the Gemini API in your Google Cloud
                  Console
                </p>
              </div>
              <form onSubmit={handleApiKeySubmit} className="space-y-2">
                <input
                  type="password"
                  name="apiKey"
                  placeholder="Enter your Gemini API key..."
                  className="w-full px-3 py-2 border border-yellow-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Save API Key
                </button>
              </form>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl p-3 ${
                    msg.isUser
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.text}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      msg.isUser ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {apiKey && !showApiKeyInput && (
            <>
              <div className="px-4 py-2 border-t border-gray-200 bg-gray-50/50">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(action.prompt)}
                      disabled={isLoading}
                      className="text-xs bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && sendMessage(inputMessage)
                    }
                    placeholder="Ask Gemini AI anything..."
                    className="flex-1 bg-gray-100 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => sendMessage(inputMessage)}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-2 rounded-xl transition-colors disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiAIAssistant;
