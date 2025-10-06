import React from "react";
import { Link } from "react-router-dom";

const HowItWorksPage = () => {
  const steps = [
    {
      number: "01",
      icon: "👤",
      title: "Create Your Profile",
      description:
        "Showcase your skills, projects, and coding preferences in a beautiful developer profile.",
      features: [
        "Skill tags",
        "Project portfolio",
        "Tech stack",
        "Availability",
      ],
    },
    {
      number: "02",
      icon: "🎯",
      title: "Set Preferences",
      description:
        "Define what you're looking for in a coding partner and project collaboration.",
      features: [
        "Technical interests",
        "Skill level matching",
        "Project types",
        "Communication style",
      ],
    },
    {
      number: "03",
      icon: "💬",
      title: "Connect & Chat",
      description:
        "Start meaningful conversations with your matches in our secure messaging platform.",
      features: ["Secure messaging", "Code sharing", "Project planning"],
    },
    {
      number: "04",
      icon: "🚀",
      title: "Build Together",
      description:
        "Collaborate on projects using our integrated tools and version control.",
      features: [
        "Git integration",
        "Task management",
        "File sharing",
        "Progress tracking",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-950 via-slate-700 to-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🔄</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-300 bg-clip-text text-transparent">
            How DevMatch Works
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Simple steps to find your perfect coding partner and start building
            amazing projects together
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 transform -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-center mb-16 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-2xl">
                <span className="text-2xl">{step.icon}</span>
              </div>

              <div
                className={`md:w-5/12 ${
                  index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                } ml-16 md:ml-0`}
              >
                <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-purple-600 mr-3">
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-200 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-red-400">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link to="/">
          <div className="text-center mt-20">
            <div
              className="bg-gradient-to-r from-transparent via-red-600/30 to-transparent
             rounded-3xl p-8 border border-purple-500/30"
            >
              <h2 className="text-3xl font-bold mb-4">
                Ready to Find Your Coding Partner?
              </h2>
              <p className="text-gray-300 mb-6">
                Join thousands of developers already building amazing things
                together
              </p>
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                Get Started Now
              </button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HowItWorksPage;
