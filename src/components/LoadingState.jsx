const LoadingState = () => {
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
        <div className="absolute inset-0 bg-grid-pattern bg-center bg-8 bg-fixed"></div>
      </div>

      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 opacity-70 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto p-8 rounded-3xl bg-gradient-to-br from-gray-900/70 via-gray-800/50 to-purple-900/40 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        <div className="relative mx-auto mb-8 w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute w-12 h-12 bg-cyan-400/20 rounded-full animate-ping"></div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">
          Building Your Network
        </h2>
        <p className="text-cyan-200 mb-6">
          We're gathering your connections from across the cosmos
        </p>

        <div className="flex justify-center space-x-2">
          {[0, 0.2, 0.4].map((delay) => (
            <div
              key={delay}
              className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}s` }}
            ></div>
          ))}
        </div>

        <div className="absolute -inset-4 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full border border-cyan-400/30 rounded-3xl animate-pulse-slow"></div>
          <div
            className="absolute top-2 left-2 w-full h-full border border-fuchsia-500/20 rounded-3xl animate-pulse-slow"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
