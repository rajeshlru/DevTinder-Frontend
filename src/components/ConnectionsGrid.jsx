import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ConnectionsGrid = () => {
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnections([]);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-cyan-400/15 to-fuchsia-500/15"
              style={{
                width: Math.random() * 120 + 30 + "px",
                height: Math.random() * 120 + 30 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animation: `float ${
                  Math.random() * 6 + 4
                }s ease-in-out infinite both, pulse ${
                  Math.random() * 5 + 5
                }s infinite alternate`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}

          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          </div>

          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600/15 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        </div>

        <div className="relative z-10 text-center backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-fuchsia-500/10 px-12 py-16 rounded-3xl shadow-2xl border border-cyan-500/30 transform hover:scale-105 transition-all duration-700 group hover:shadow-cyan-500/20">
          <div className="absolute top-4 left-6 w-3 h-3 bg-cyan-400 rounded-full animate-float opacity-80"></div>
          <div className="absolute top-8 right-8 w-2 h-2 bg-fuchsia-400 rounded-full animate-float animation-delay-1000 opacity-70"></div>
          <div className="absolute bottom-6 left-10 w-2 h-2 bg-purple-400 rounded-full animate-float animation-delay-2000 opacity-60"></div>
          <div className="absolute bottom-10 right-6 w-3 h-3 bg-cyan-300 rounded-full animate-float animation-delay-1500 opacity-90"></div>
          <div className="absolute top-12 left-1/2 w-1.5 h-1.5 bg-purple-300 rounded-full animate-float animation-delay-800 opacity-50"></div>
          <div className="absolute bottom-12 right-12 w-2.5 h-2.5 bg-cyan-200 rounded-full animate-float animation-delay-1200 opacity-70"></div>

          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000 animate-pulse-slow"></div>

          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-cyan-400/30 rounded-full"></div>
              <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-4 border-t-cyan-400 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-b-4 border-b-fuchsia-500 rounded-full animate-spin-reverse animation-delay-700"></div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full animate-ping-slow"></div>

              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-300 rounded-full animate-orbit"></div>
              <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-fuchsia-400 rounded-full animate-orbit animation-delay-500"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full animate-orbit animation-delay-1000"></div>
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-200 rounded-full animate-orbit animation-delay-1500"></div>

              <div className="absolute -inset-6 border border-cyan-400/20 rounded-full animate-ping-slower"></div>
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-500 text-transparent bg-clip-text animate-gradient bg-300%">
            Loading Connections
          </h1>
          <p className="text-lg text-gray-300 animate-pulse">
            Fetching your network...
          </p>

          <div className="mt-8 w-full max-w-md bg-gray-700/30 rounded-full h-2.5 overflow-hidden backdrop-blur-sm">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full animate-progress-width relative">
              <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-3xl bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all duration-1000 opacity-0 group-hover:opacity-100"></div>

          <style jsx>{`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            @keyframes spin-reverse {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(-360deg);
              }
            }
            @keyframes ping-slow {
              0%,
              100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
              }
              50% {
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 0.7;
              }
            }
            @keyframes ping-slower {
              0% {
                transform: scale(1);
                opacity: 1;
              }
              50%,
              100% {
                transform: scale(2);
                opacity: 0;
              }
            }
            @keyframes orbit {
              0% {
                transform: rotate(0deg) translateX(20px) rotate(0deg);
              }
              100% {
                transform: rotate(360deg) translateX(20px) rotate(-360deg);
              }
            }
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-12px);
              }
            }
            @keyframes progress-width {
              0% {
                width: 0%;
              }
              50% {
                width: 70%;
              }
              100% {
                width: 100%;
              }
            }
            @keyframes gradient {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            @keyframes pulse-slow {
              0%,
              100% {
                opacity: 0.3;
              }
              50% {
                opacity: 0.6;
              }
            }
            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            .animate-spin {
              animation: spin 1.5s linear infinite;
            }
            .animate-spin-reverse {
              animation: spin-reverse 2s linear infinite;
            }
            .animate-ping-slow {
              animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
            }
            .animate-ping-slower {
              animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite;
            }
            .animate-orbit {
              animation: orbit 3s linear infinite;
            }
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
            .animate-progress-width {
              animation: progress-width 2s ease-in-out infinite;
            }
            .animate-gradient {
              animation: gradient 3s ease infinite;
            }
            .animate-pulse-slow {
              animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            .animate-shimmer {
              animation: shimmer 2s infinite;
            }
            .animation-delay-500 {
              animation-delay: 0.5s;
            }
            .animation-delay-700 {
              animation-delay: 0.7s;
            }
            .animation-delay-800 {
              animation-delay: 0.8s;
            }
            .animation-delay-1000 {
              animation-delay: 1s;
            }
            .animation-delay-1200 {
              animation-delay: 1.2s;
            }
            .animation-delay-1500 {
              animation-delay: 1.5s;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .bg-300% {
              background-size: 300% 300%;
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-cyan-400/10 to-fuchsia-500/10"
              style={{
                width: Math.random() * 150 + 40 + "px",
                height: Math.random() * 150 + 40 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animation: `float ${
                  Math.random() * 6 + 4
                }s ease-in-out infinite both, pulse ${
                  Math.random() * 5 + 5
                }s infinite alternate`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}

          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          </div>

          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        </div>

        <div className="z-10 text-center backdrop-blur-xl bg-white/5 px-12 py-10 rounded-3xl shadow-2xl border border-white/10 transform hover:scale-105 transition-transform duration-700 hover:shadow-cyan-500/10">
          <div className="absolute top-4 left-6 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-float opacity-70"></div>
          <div className="absolute top-8 right-8 w-2 h-2 bg-fuchsia-400 rounded-full animate-float animation-delay-1000 opacity-60"></div>
          <div className="absolute bottom-6 left-10 w-2 h-2 bg-purple-400 rounded-full animate-float animation-delay-2000 opacity-50"></div>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>

              <div className="absolute -inset-3 border border-cyan-400/30 rounded-full animate-ping-slower"></div>
              <div className="absolute -inset-5 border border-purple-500/20 rounded-full animate-ping-slower animation-delay-1000"></div>

              <div className="absolute -top-2 -right-2">
                <span className="flex h-7 w-7">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-7 w-7 bg-cyan-500"></span>
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text animate-gradient bg-300%">
            Connections
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            No connections available yet.
          </p>

          <div className="mb-8">
            <p className="text-gray-400 mb-6">
              Start building your network by adding new connections
            </p>
            <button className="group relative bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 overflow-hidden">
              <span className="relative z-10">
                <Link to="/">Add New Connection</Link>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-fuchsia-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse {
            0% {
              opacity: 0.2;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
            }
            100% {
              opacity: 0.2;
              transform: scale(1.1);
            }
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
          }
          @keyframes ping-slower {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50%,
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-ping-slower {
            animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-gradient {
            animation: gradient 3s ease infinite;
          }
          .bg-300% {
            background-size: 300% 300%;
          }
          .animation-delay-500 {
            animation-delay: 0.5s;
          }
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4"></div>
  );
};

export default ConnectionsGrid;
