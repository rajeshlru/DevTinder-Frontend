import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900  text-white overflow-hidden">
      <div className="relative max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 mb-12">
          <div className="md:w-1/2">
            <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6 animate-gradient bg-300% animate-pulse">
                DevTinder
              </h3>
              <p className="text-gray-300 mb-6 max-w-md text-lg leading-relaxed font-light">
                Connecting developers worldwide. Find your perfect coding
                partner, collaborate on projects, and build amazing things
                together.
              </p>
              <div className="flex flex-col space-y-4 text-gray-300">
                <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white">📞</span>
                  </div>
                  <span className="font-medium">+91 9346145244</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500">
              <h4 className="text-xl font-bold mb-6 text-white relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></span>
              </h4>
              <ul className="space-y-3">
                <li className="group">
                  <Link
                    to="/aboutpage"
                    className="flex items-center text-gray-300 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    About Us
                  </Link>
                </li>
                <li className="group">
                  <Link
                    to="/how-it-works"
                    className="flex items-center text-gray-300 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    How It Works
                  </Link>
                </li>
                <li className="group">
                  <Link
                    to="/terms"
                    className="flex items-center text-gray-300 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Terms & Conditions
                  </Link>
                </li>
                <li className="group">
                  <Link
                    to="/community-guidelines"
                    className="flex items-center text-gray-300 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Community Guidelines
                  </Link>
                </li>
                <li className="group">
                  <Link
                    to="/privacy-policy"
                    className="flex items-center text-gray-300 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 ">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex space-x-4">
              <a
                href="https://github.com/rajeshlru"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center text-white transform transition-all duration-500 shadow-lg hover:scale-110 hover:shadow-gray-500/30 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-900"
                title="GitHub"
              >
                <svg
                  className="w-5 h-5 transform transition-transform duration-300 group-hover:scale-125"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <div className="absolute inset-0 rounded-xl border border-gray-600/50 group-hover:border-gray-400/70 transition-all duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </a>

              <a
                href="https://www.linkedin.com/in/rajesh-elluru-97ba6b356/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white transform transition-all duration-500 shadow-lg hover:scale-110 hover:shadow-blue-400/30 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600"
                title="LinkedIn"
              >
                <svg
                  className="w-5 h-5 transform transition-transform duration-300 group-hover:scale-125"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <div className="absolute inset-0 rounded-xl border border-blue-500/50 group-hover:border-blue-300/70 transition-all duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </a>

              <a
                href="https://www.instagram.com/rrajesj.h/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-400 rounded-xl flex items-center justify-center text-white transform transition-all duration-500 shadow-lg hover:scale-110 hover:shadow-pink-400/30"
                title="Instagram"
              >
                <svg
                  className="w-5 h-5 transform transition-transform duration-300 group-hover:scale-125"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <div className="absolute inset-0 rounded-xl border border-pink-400/50 group-hover:border-pink-200/70 transition-all duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </a>

              <a
                href="mailto:rajeshelluru143@gmail.com"
                className="group relative w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white transform transition-all duration-500 shadow-lg hover:scale-110 hover:shadow-red-400/30 hover:bg-gradient-to-br hover:from-red-400 hover:to-red-500"
                title="Email"
              >
                <svg
                  className="w-5 h-5 transform transition-transform duration-300 group-hover:scale-125"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
                </svg>
                <div className="absolute inset-0 rounded-xl border border-red-400/50 group-hover:border-red-200/70 transition-all duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </a>
            </div>

            <div className="text-center lg:text-right">
              <p className="text-gray-300 text-sm font-light bg-black/40 backdrop-blur-lg rounded-full px-6 py-3 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10">
                © {currentYear}{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                  DevMatch
                </span>
                . All rights reserved.
                <span className="text-purple-400 ml-2">
                  ✨ Made with passion
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
