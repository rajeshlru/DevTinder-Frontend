import { useNavigate, Link } from "react-router-dom";

const EmptyState = () => {
  const navigate = useNavigate();

  const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/5 to-transparent animate-pulse blur-3xl" />
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 4}s`,
            opacity: Math.random(),
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-network-pattern bg-cover bg-center"></div>
      </div>

      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 opacity-80 animate-float-slow"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => {
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const endX = Math.random() * 100;
          const endY = Math.random() * 100;

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse-slow"
              style={{
                top: `${startY}%`,
                left: `${startX}%`,
                width: `${Math.sqrt(
                  Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
                )}%`,
                height: "1px",
                transform: `rotate(${
                  Math.atan2(endY - startY, endX - startX) * (180 / Math.PI)
                }deg)`,
                transformOrigin: "0 0",
                animationDelay: `${i * 0.7}s`,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto p-8 rounded-3xl bg-gradient-to-br from-gray-900/70 via-gray-800/50 to-purple-900/40 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        <div className="relative mx-auto mb-8 w-40 h-40">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 animate-pulse-slow opacity-80"></div>
          <div className="absolute inset-4 rounded-full bg-black flex items-center justify-center">
            <svg
              className="w-20 h-20 text-orange-400 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <div className="absolute w-16 h-16 bg-cyan-400/20 rounded-full animate-ping-slow"></div>
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">
          Your Network Awaits
        </h2>
        <p className="text-cyan-200 mb-6">
          You haven't made any connections yet. Start building your community!
        </p>

        <button
          onClick={() => navigate("/")}
          className="relative px-8  py-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-fuchsia-600 rounded-2xl font-bold text-white overflow-hidden group transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40"
          role="button"
          aria-label="Make your first connection"
          style={{ border: "2px solid rgba(34, 211, 238, 0.4)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <Link to="/">
            <span className="relative z-10 flex items-center justify-center cursor-pointer transition-all">
              <svg
                className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform text-red-950 hover:text-7xl"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Go to Feed to make Connection
            </span>
          </Link>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Click to get started
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
          </div>
        </button>

        <div className="absolute -inset-4 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full border border-cyan-400/30 rounded-3xl animate-pulse-slow"></div>
          <div
            className="absolute top-2 left-2 w-full h-full border border-fuchsia-500/20 rounded-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
