const BackgroundBlobs = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="relative min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 overflow-hidden"></div>

    {[
      {
        size: "w-72 h-72",
        position: "top-0 left-0",
        gradient: "from-purple-700 via-pink-600 to-indigo-500",
        opacity: "opacity-30",
        delay: 0,
      },
      {
        size: "w-64 h-64",
        position: "top-1/3 right-0",
        gradient: "from-indigo-700 via-cyan-500 to-purple-600",
        opacity: "opacity-25",
        delay: 2,
      },
      {
        size: "w-80 h-80",
        position: "bottom-0 left-1/4",
        gradient: "from-pink-500 via-purple-700 to-indigo-900",
        opacity: "opacity-20",
        delay: 4,
      },
      {
        size: "w-60 h-60",
        position: "top-2/3 left-1/3",
        gradient: "from-indigo-500 via-purple-600 to-pink-400",
        opacity: "opacity-15",
        delay: 6,
      },
      {
        size: "w-48 h-48",
        position: "bottom-20 right-10",
        gradient: "from-pink-400 via-purple-500 to-indigo-700",
        opacity: "opacity-20",
        delay: 8,
      },
    ].map((blob, i) => (
      <div
        key={i}
        className={`absolute ${blob.position} ${blob.size} bg-gradient-to-tr ${
          blob.gradient
        } ${blob.opacity} rounded-full blur-3xl animate-blob animation-delay-${
          blob.delay * 1000
        }`}
      ></div>
    ))}

    <style>{`
      @keyframes blob {
        0% { transform: translate(0px,0px) scale(1); }
        25% { transform: translate(25px,-20px) scale(1.05); }
        50% { transform: translate(-25px,15px) scale(0.95); }
        75% { transform: translate(15px,25px) scale(1.03); }
        100% { transform: translate(0px,0px) scale(1); }
      }
      .animate-blob { animation: blob 25s infinite alternate ease-in-out; }
      .animation-delay-0 { animation-delay: 0s; }
      .animation-delay-2000 { animation-delay: 2s; }
      .animation-delay-4000 { animation-delay: 4s; }
      .animation-delay-6000 { animation-delay: 6s; }
      .animation-delay-8000 { animation-delay: 8s; }
    `}</style>
  </div>
);

export default BackgroundBlobs;
