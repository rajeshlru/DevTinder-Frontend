import React, { useEffect, useState } from "react";

const ErrorAlert = ({ message, trigger }) => {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (message) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 600);
      return () => clearTimeout(timer);
    }
  }, [message, trigger]);

  if (!message) return null;

  return (
    <div className="w-full flex justify-center -mt- md:mt-4 px-[7.2px] md:px-7">
      <div
        className={`relative w-full max-w-lg flex items-center gap-3 
        border-2 border-red-500 text-red-800 
        px-4  py-3 md:py-3  rounded-xl shadow-xl overflow-hidden
        ${shake ? "animate-shake" : ""}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-red-100 to-red-200 animate-bgMove"></div>

        <div className="absolute inset-0 bg-white/60 "></div>

        <div className="flex-shrink-0 relative z-10 animate-wiggle ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"
            />
          </svg>
        </div>

        <p className="flex-1  text-[16.5px] font-bold leading-snug break-words relative z-10">
          {message}
        </p>

        <span className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-12 animate-shine"></span>
      </div>
      <style jsx>{`
        @keyframes bgMove {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .animate-bgMove {
          background-size: 200% 200%;
          animation: bgMove 6s linear infinite;
        }

        @keyframes shine {
          0% {
            left: -50%;
          }
          100% {
            left: 100%;
          }
        }
        .animate-shine {
          animation: shine 3s linear infinite;
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(-8deg);
          }
          50% {
            transform: rotate(8deg);
          }
        }
        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          50% {
            transform: translateX(10px);
          }
          75% {
            transform: translateX(-4px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ErrorAlert;
