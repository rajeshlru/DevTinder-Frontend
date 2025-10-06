import { Link } from "react-router-dom";
const ConnectionCard = ({ connections }) => {
  const groupedConnections = [];
  let i = 0;

  while (i < connections.length) {
    const takeCount = groupedConnections.length % 2 === 0 ? 3 : 2;
    groupedConnections.push(connections.slice(i, i + takeCount));
    i += takeCount;
  }

  return (
    <div className="relative min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center overflow-hidden">
      <h1 className="relative z-10 text-5xl md:text-6xl lg:text-7xl font-bold mb-16 md:mb-20 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 drop-shadow-lg">
        Connections
      </h1>

      <div className="relative w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center">
          {groupedConnections.map((rowConnections, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-1 ${
                rowConnections.length === 3
                  ? "md:grid-cols-3"
                  : "md:grid-cols-2"
              } gap-8 w-full ${rowIndex > 0 ? "mt-16 lg:mt-24" : ""}`}
            >
              {rowConnections.map(
                ({
                  _id,
                  firstName,
                  lastName,
                  photoUrl,
                  age,
                  gender,
                  about,
                }) => (
                  <div key={_id} className="flex flex-col items-center h-full">
                    <div className="group relative flex flex-col items-center text-center w-full h-full">
                      <div className="relative z-10">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-400/80 via-blue-500/60 to-fuchsia-500/70 blur opacity-50 transition-all duration-1000 group-hover:opacity-80 group-hover:scale-105"></div>
                        <img
                          src={photoUrl}
                          alt={`${firstName} `}
                          className="relative w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full object-cover border-4 border-black transition-all duration-700 group-hover:scale-110"
                        />
                      </div>

                      <div className="mt-6 md:mt-5 p-6 md:p-7 rounded-3xl bg-gradient-to-tr from-white/10 via-white/5 to-white/10 backdrop-blur-3xl border border-white/20 shadow-[0_1px_3px_rgba(0,255,255,0.05)] w-full max-w-md transform transition-all duration-700 group-hover:scale-105 group-hover:border-cyan-400/50 group-hover:shadow-[0_15px_40px_rgba(0,255,255,0.17)] relative overflow-hidden flex flex-col h-full">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-fuchsia-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

                        <h3 className="text-xl md:text-2xl font-extrabold text-green-400/80 mb-3 tracking-wide group-hover:text-cyan-300 bg-clip-text bg-gradient-to-r from-green-400 via-cyan-300 to-blue-400">
                          {firstName} {lastName}
                        </h3>

                        {age && gender && (
                          <p className="text-[15px] md:text-[16px] mt-1 font-normal tracking-wide bg-clip-text text-red-400 bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300">
                            {age} years • {gender}
                          </p>
                        )}

                        <div className="flex-grow flex flex-col justify-center">
                          <p className="mt-3 text-sm italic leading-relaxed tracking-wide relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-400 to-blue-200 line-clamp-3">
                            {about}
                          </p>
                        </div>

                        <Link
                          to={"/chat/" + _id}
                          className="flex-grow flex flex-col justify-center"
                        >
                          <button className="group relative inline-flex items-center justify-center px-6 py-3 mt-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-out bg-gradient-to-r from-purple-500 via-pink-400 to-blue-500 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 overflow-hidden">
                            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></span>

                            <span className="relative flex items-center space-x-2 z-10">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                              </svg>
                              <span>Message</span>
                            </span>
                          </button>
                        </Link>

                        <div className="absolute inset-0 rounded-3xl border border-cyan-400/10 pointer-events-none animate-pulse-slow"></div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
