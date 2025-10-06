import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ErrorPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGoToProfile = () => {
    navigate("/profile");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-2 overflow-hidden">
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-blue-200 rounded-full opacity-60 animate-float"></div>
          <div
            className="absolute top-1/3 right-1/5 w-8 h-8 bg-purple-200 rounded-full opacity-40 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-pink-200 rounded-full opacity-50 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-7 h-7 bg-indigo-200 rounded-full opacity-30 animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>

          <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div
          className={`relative z-10 text-center transition-all duration-1000 transform ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="mb-1">
            <div className="relative inline-block">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-xl opacity-60"></div>
              <h1 className="text-8xl md:text-9xl font-black text-gray-800 relative">
                <span className="inline-block transform hover:scale-110 transition-transform duration-300">
                  4
                </span>
                <span>0</span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300">
                  4
                </span>
              </h1>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
              🚧 Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed max-w-md mx-auto">
              Looks like this page took a wrong turn. Don't worry, even the best
              explorers get lost sometimes!
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-6 shadow-md"></div>
          </div>

          <div className="mb-8">
            <div className="text-6xl mb-4 inline-block transform hover:rotate-12 transition-transform duration-500">
              <span className="inline-block animate-float filter drop-shadow-lg">
                🧭
              </span>
            </div>
            <p className="text-green-500 italic font-medium">
              Let's navigate you back to safety
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-8">
            <button
              onClick={handleGoHome}
              className="group relative px-12 py-6 bg-white/15 backdrop-blur-2xl border border-white/25 rounded-3xl font-bold text-white text-xl shadow-2xl hover:shadow-4xl transform hover:scale-105 active:scale-95 transition-all duration-700 overflow-hidden hover:border-blue-300/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/15 to-purple-500/0 rounded-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 delay-200"></div>

              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-3xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

              <div
                className="absolute top-3 left-4 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-float transition-all duration-500"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="absolute bottom-4 right-6 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-float transition-all duration-500"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/4 w-2 h-2 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-float transition-all duration-500"
                style={{ animationDelay: "0.5s" }}
              ></div>

              <div className="relative flex items-center justify-center gap-5">
                <div className="relative">
                  <div className="text-3xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 filter drop-shadow-lg">
                    🏠
                  </div>
                  <div className="absolute inset-0 text-3xl opacity-0 group-hover:opacity-30 group-hover:animate-ping transition-opacity duration-1000">
                    🏠
                  </div>
                </div>

                <span className="font-bold text-xl tracking-wider bg-gradient-to-r from-white to-white/80 bg-clip-text text-blue-500 group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-500">
                  Go Home
                </span>

                <div className="relative">
                  <span className="text-2xl group-hover:translate-x-3 group-hover:scale-125 group-hover:text-cyan-300 transition-all duration-500">
                    ⚡
                  </span>
                  <div className="absolute -inset-2 bg-cyan-400 rounded-full blur-sm opacity-0 group-hover:opacity-30 group-hover:animate-pulse transition-all duration-500"></div>
                </div>
              </div>

              <div className="absolute inset-4 border border-white/10 rounded-2xl group-hover:border-white/20 transition-all duration-500"></div>
            </button>

            <button
              onClick={handleGoToProfile}
              className="group relative px-12 py-6 bg-white/15 backdrop-blur-2xl border border-white/25 rounded-3xl font-bold text-white text-xl shadow-2xl hover:shadow-4xl transform hover:scale-105 active:scale-95 transition-all duration-700 overflow-hidden hover:border-purple-300/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-3xl opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/15 to-pink-500/0 rounded-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 delay-200"></div>

              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-300 to-pink-300 rounded-3xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

              <div
                className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-float transition-all duration-500"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-float transition-all duration-500"
                style={{ animationDelay: "0.4s" }}
              ></div>
              <div
                className="absolute top-1/2 right-1/4 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-float transition-all duration-500"
                style={{ animationDelay: "0.6s" }}
              ></div>

              <div className="relative flex items-center justify-center gap-5">
                <div className="relative">
                  <div className="text-3xl group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 filter drop-shadow-lg">
                    👤
                  </div>
                  <div className="absolute inset-0 text-3xl opacity-0 group-hover:opacity-30 group-hover:animate-ping transition-opacity duration-1000">
                    👤
                  </div>
                </div>

                <span className="font-bold text-xl text-orange-500 tracking-wider bg-gradient-to-r from-white to-white/80 bg-clip-text  group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-500">
                  Visit Profile
                </span>

                <div className="relative">
                  <span className="text-2xl group-hover:translate-x-3 group-hover:scale-125 group-hover:text-pink-400 transition-all duration-500">
                    ✨
                  </span>
                  <div className="absolute -inset-2 bg-pink-200 rounded-full blur-sm opacity-0 group-hover:opacity-30 group-hover:animate-pulse transition-all duration-500"></div>
                </div>
              </div>

              <div className="absolute inset-4 border border-white/10 rounded-2xl group-hover:border-white/20 transition-all duration-500"></div>
            </button>
          </div>

          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px) scale(1);
                opacity: 1;
              }
              33% {
                transform: translateY(-6px) scale(1.1);
                opacity: 0.8;
              }
              66% {
                transform: translateY(-3px) scale(1.05);
                opacity: 0.9;
              }
            }
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
          `}</style>

          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-3 shadow-2xl border border-white/50 max-w-md mx-auto">
            <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center justify-center gap-2">
              <span className="text-2xl">💡</span>
              Quick Tips
            </h3>
            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-gray-100 shadow-sm">
                <span className="flex items-center gap-2">
                  <span className="text-lg">🔍</span>
                  Check the URL
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-lg">🔄</span>
                  Refresh page
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-6 opacity-60">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div
              className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        <div className="absolute top-6 right-6 text-3xl opacity-20 animate-pulse">
          ❓
        </div>
        <div
          className="absolute top-6 left-6 text-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          🔍
        </div>
        <div
          className="absolute bottom-6 right-6 text-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          🚧
        </div>
        <div
          className="absolute bottom-6 left-6 text-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          📍
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-8px) rotate(2deg);
          }
          66% {
            transform: translateY(-4px) rotate(-1deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;
