const ErrorState = ({ error, fetchConnections }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white flex items-center justify-center overflow-hidden relative">
      <AnimatedBackground />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-crack-pattern bg-cover"></div>
      </div>

      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-pink-600 opacity-70 animate-fall"
            style={{
              top: `-10%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto p-8 rounded-3xl bg-gradient-to-br from-gray-900/70 via-gray-800/50 to-purple-900/40 backdrop-blur-2xl border border-red-500/30 shadow-2xl shadow-red-500/20">
        <div className="relative mx-auto mb-8 w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-pink-600 animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
            <svg
              className="w-16 h-16 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M10 4L8 6M6 8L4 10M4 14L6 16M8 18L10 20M14 20L16 18M18 16L20 14M20 10L18 8M16 6L14 4M14 4L10 20M10 20L14 20M10 20L6 16M14 4L18 8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute w-12 h-12 bg-red-500/20 rounded-full animate-ping"></div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-600">
          Connection Lost
        </h2>
        <p className="text-red-200 mb-6">{error}</p>

        <button
          onClick={fetchConnections}
          className="relative px-6 py-3 bg-gradient-to-r from-cyan-600 to-fuchsia-600 rounded-xl font-medium overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
          <span className="relative z-10 flex items-center">
            <svg
              className="w-5 h-5 mr-2 animate-spin-slow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Reconnect Now
          </span>
        </button>

        <div className="absolute -inset-4 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full border border-red-500/30 rounded-3xl animate-pulse-fast"></div>
        </div>
      </div>
    </div>
  );
};
export default ErrorState;
