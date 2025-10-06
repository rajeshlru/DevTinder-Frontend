import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative inline-block mb-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-75 animate-pulse-slow"></div>
              <div className="w-28 h-28 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/30 rotate-3 hover:rotate-0 transition-transform duration-500 relative">
                <span className="text-5xl">💻</span>
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              About DevTinder
            </span>
          </h1>

          <p className="text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
            Where{" "}
            <span className="text-purple-300 font-semibold">
              amazing developers
            </span>{" "}
            connect,
            <span className="text-pink-300 font-semibold"> collaborate</span>,
            and create
            <span className="text-blue-300 font-semibold">
              {" "}
              extraordinary projects
            </span>{" "}
            together
          </p>
        </div>

        <div className="grid gap-8 mb-16 md:grid-cols-2 lg:gap-12">
          <div className="group relative bg-gradient-to-br from-gray-900/60 to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 hover:scale-[1.02] shadow-2xl shadow-purple-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10 flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-300 bg-clip-text text-transparent">
                My Mission
              </h3>
            </div>
            <p className="relative z-10 text-lg text-green-100/90 leading-relaxed font-light">
              We're revolutionizing how developers connect and collaborate.
              Every great project starts with the right partnership, and we're
              here to make those connections happen seamlessly.
              <span className="block mt-4 text-purple-300 font-medium italic">
                Real connections, real projects, real success.
              </span>
            </p>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-400/30 rounded-br-3xl"></div>
          </div>

          <div className="group relative bg-gradient-to-br from-gray-900/60 to-pink-900/40 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/30 hover:border-pink-400/60 transition-all duration-500 hover:scale-[1.02] shadow-2xl shadow-pink-500/20 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10 flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-rose-700 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-500/30">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                Our Community
              </h3>
            </div>
            <p className="relative z-10  text-lg leading-relaxed font-light">
              Join{" "}
              <span className="text-pink-700 font-semibold">
                thousands of developers
              </span>{" "}
              from around the globe who have found their perfect coding partners
              and launched successful projects together.
              <span className="block mt-4 text-pink-500 font-medium italic">
                You're not just joining a platform, you're joining a family.
              </span>
            </p>
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-pink-400/30 rounded-tl-3xl"></div>
          </div>
        </div>

        <Link to="/">
          <div className="text-center mt-16">
            <div className="text-2xl text-gray-300 mb-6 font-light">
              Ready to find your perfect coding partner?
            </div>
            <button className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50">
              <span className="mr-3">✨</span>
              Start Your Journey Today
              <span className="ml-3">🎯</span>
            </button>
          </div>
        </Link>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(25px) rotate(-180deg);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(100%) skewX(-12deg);
          }
        }
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 12s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
