import React from "react";

const LoginLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>

        <p className="text-white text-lg font-semibold typewriter">
          Logging you in... Please wait ✨
        </p>
      </div>

      <style jsx>{`
        /* Spinner animation */
        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Typewriter text */
        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid rgba(255, 255, 255, 0.8);
          animation: typing 2s steps(30, end), blink 0.8s step-end infinite;
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginLoader;
