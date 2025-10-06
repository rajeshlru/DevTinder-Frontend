import React from "react";
import { Link } from "react-router-dom";

const TermsPage = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: "📝",
      content:
        "By accessing and using DevMatch, you accept and agree to be bound by the terms and provisions of this agreement.",
      points: [
        "You must be at least 18 years old to use our services",
        "You agree to use the platform for genuine developer connections",
        "You accept our community guidelines and code of conduct",
      ],
    },
    {
      title: "User Responsibilities",
      icon: "👥",
      content:
        "As a user of DevMatch, you have certain responsibilities to maintain a safe and productive environment.",
      points: [
        "Provide accurate and truthful information in your profile",
        "Maintain professional conduct in all interactions",
        "Respect intellectual property rights of other users",
        "Report any suspicious or inappropriate behavior",
      ],
    },
    {
      title: "Prohibited Activities",
      icon: "🚨",
      content:
        "To ensure a safe environment, certain activities are strictly prohibited on our platform.",
      points: [
        "Harassment, bullying, or hate speech of any kind",
        "Spamming or unsolicited commercial messages",
        "Sharing inappropriate or explicit content",
        "Impersonation or false representation",
        "Any illegal activities or violations of laws",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 bg-[linear-gradient(30deg,#f0f9ff_12%,transparent_12.5%,transparent_87%,#f0f9ff_87.5%,#f0f9ff),linear-gradient(150deg,#f0f9ff_12%,transparent_12.5%,transparent_87%,#f0f9ff_87.5%,#f0f9ff),linear-gradient(30deg,#f0f9ff_12%,transparent_12.5%,transparent_87%,#f0f9ff_87.5%,#f0f9ff),linear-gradient(150deg,#f0f9ff_12%,transparent_12.5%,transparent_87%,#f0f9ff_87.5%,#f0f9ff),linear-gradient(60deg,#f0f9ff77_25%,transparent_25.5%,transparent_75%,#f0f9ff77_75%,#f0f9ff77),linear-gradient(60deg,#f0f9ff77_25%,transparent_25.5%,transparent_75%,#f0f9ff77_75%,#f0f9ff77)] bg-[size:80px_140px] [background-position:0_0,0_0,40px_70px,40px_70px,0_0,40px_70px] opacity-50"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-xl mb-6 border border-slate-200">
            <span className="text-4xl">📋</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Last updated: January 15, 2024. Please read these terms carefully
            before using DevMatch.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">💡</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Important Notice
              </h3>
              <p className="text-amber-700 leading-relaxed">
                By using DevMatch, you agree to these terms. If you disagree
                with any part of these terms, you may not access our services.
                We recommend reviewing these terms periodically for updates.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 mb-16">
          {sections.map((section, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-slate-200">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="text-2xl">{section.icon}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-semibold text-slate-800">
                        {section.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                      {section.content}
                    </p>

                    <ul className="space-y-3">
                      {section.points.map((point, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2.5 flex-shrink-0"></div>
                          <span className="text-slate-700 leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            © 2024 DevTinder. All rights reserved. |
            <Link to="" className="text-blue-600 hover:text-blue-700 ml-2">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
