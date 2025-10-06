import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect } from "react";

import axios from "axios";
import { motion } from "framer-motion";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const About = () => {
  const user = useSelector((store) => store.user);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");
  const [statusTimeout, setStatusTimeout] = useState(null);

  const [loading, setLoading] = useState(true);
  const [projects] = useState([
    {
      name: "Movies-GPT",
      description: "A movie recommendation app with GPT integration",
      language: "JavaScript",
      stargazers_count: 12,
      forks_count: 5,
      html_url: "https://github.com/rajeshlru/Movies-GPT",
      homepage: "https://movies-gpt-demo.netlify.app",
      customImage:
        "https://raw.githubusercontent.com/rajeshlru/Movies-GPT/refs/heads/main/LOGIN%20PAGE.png",
    },
    {
      name: "My-Youtube",
      description: "A YouTube clone with modern UI",
      language: "React",
      stargazers_count: 8,
      forks_count: 3,
      html_url: "https://github.com/rajeshlru/My-Youtube",
      homepage: "https://my-youtube-clone.netlify.app",
      customImage:
        "https://raw.githubusercontent.com/rajeshlru/My-Youtube/refs/heads/main/WhatsApp%20Image%202025-07-20%20at%2018.13.20_0282fc02.jpg",
    },
    {
      name: "Food-Ordering-App",
      description: "Food ordering application",
      language: "React",
      stargazers_count: 15,
      forks_count: 7,
      html_url: "https://github.com/rajeshlru/Namaste-React",
      homepage: "https://namaste-food-app.netlify.app",
      customImage:
        "https://raw.githubusercontent.com/rajeshlru/Namaste-React/refs/heads/main/Home%20page.png",
    },
  ]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/rajeshlru/repos?sort=created&per_page=10"
        );
        await response.json();
      } catch (error) {
        console.error("Error fetching GitHub projects:", error);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "projects") {
      fetchProjects();
    }
  }, [activeTab]);

  useEffect(() => {
    if (submitStatus) {
      if (statusTimeout) {
        clearTimeout(statusTimeout);
      }

      const timeoutId = setTimeout(() => {
        setSubmitStatus(null);
      }, 10000); // 10 seconds

      setStatusTimeout(timeoutId);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [submitStatus]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const dataToSend = {
        ...formData,
        photoUrl:
          user?.photoUrl ||
          "https://avatars.githubusercontent.com/u/212736108?v=4",
      };

      const response = await axios.post(BASE_URL + "/send-email", dataToSend);

      if (response.data.success) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          photoUrl: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const dismissStatus = () => {
    setSubmitStatus(null);
    if (statusTimeout) {
      clearTimeout(statusTimeout);
      setStatusTimeout(null);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative pt-[66px]">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-indigo-600 rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute top-2/3 left-2/3 w-32 h-32 bg-pink-500 rounded-full blur-2xl opacity-10"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
        />

        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-md opacity-70"></div>
              <div className="relative w-60 h-60 rounded-full overflow-hidden border-2 border-white/20">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4E03AQHaz37F7XaT0Q/profile-displayphoto-shrink_400_400/B4EZXAwiS2HUAg-/0/1742695705540?e=1759968000&v=beta&t=NSYU-KEp5gDVJCEgGoixUUSCTAo23tQrALdx5aOpIY4"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl font-extrabold sm:text-5xl lg:text-6xl">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Create
            </span>{" "}
            Together
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-200">
            Full Stack Developer & UI/UX Enthusiast
          </p>

          <div className="mt-10 flex justify-center space-x-4">
            {[
              { id: "contact", label: "Contact Me" },
              { id: "projects", label: "My Projects" },
              { id: "skills", label: "My Skills" },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/30"
                    : "bg-white/10 backdrop-blur-sm hover:bg-white/20"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {activeTab === "contact" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
              <motion.div variants={fadeIn} className="space-y-8">
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="relative group max-w-2xl w-full"
                >
                  <div className="relative bg-red-50/15 rounded-2xl p-8 shadow-2xl border border-white/10 backdrop-blur-xl overflow-hidden">
                    <h2 className="text-3xl font-bold mb-6 flex items-center bg-clip-text text-red-400/80">
                      <span className="w-3 h-3 bg-red-400 rounded-full mr-3 animate-pulse"></span>
                      About Me
                    </h2>

                    <div className="space-y-6 ">
                      <p className="text-lg text-purple-100  leading-relaxed">
                        I'm a passionate{" "}
                        <span className="text-fuchsia-400 font-medium">
                          Full-Stack Developer
                        </span>{" "}
                        with expertise in modern JavaScript frameworks,
                        responsive design, and creating exceptional user
                        experiences. I specialize in building scalable web
                        applications with clean, maintainable code.
                      </p>

                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-emerald-200 rounded-full mr-2"></div>
                          <span className="text-emerald-400">
                            React & Next.js
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                          <span className="text-purple-400">
                            Node.js & Express
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                          <span className="text-pink-400">Tailwind CSS</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-amber-200 rounded-full mr-2"></div>
                          <span className="text-amber-400">MongoDB</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-2xl"></div>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="bg-emerald-800/25 rounded-xl shadow-md border border-gray-100 p-8">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-comments text-2xl text-blue-600"></i>
                      </div>
                      <h2 className="text-2xl font-bold text-green-600">
                        Get In Touch
                      </h2>
                      <p className="text-gray-300 mt-2">
                        Let's start a conversation about your project
                      </p>
                    </div>

                    <div className="space-y-6">
                      {[
                        {
                          icon: "fa-envelope",
                          label: "Email",
                          value: "rajeshelluru143@gmail.com",
                          link: "mailto:rajeshelluru143@gmail.com",
                          bgColor: "bg-blue-100",
                          iconColor: "text-blue-600",
                          hoverColor: "hover:bg-blue-50",
                        },
                        {
                          icon: "fa-phone",
                          label: "Phone",
                          value: "+91 9346145244",
                          link: "tel:+91 9346145244",
                          bgColor: "bg-green-100",
                          iconColor: "text-green-600",
                          hoverColor: "hover:bg-green-50",
                        },
                        {
                          icon: "fa-map-marker-alt",
                          label: "Location",
                          value: "Nandyal, India",
                          link: "https://www.google.com/maps/place/28%2F780B3,+Ngo+Colony,+Lalitanagar,+Nandyala,+Andhra+Pradesh+518502/@15.4661925,78.4926906,417m/data=!3m1!1e3!4m6!3m5!1s0x3bb452b981c6cc71:0xd8369dfc58615974!8m2!3d15.4658306!4d78.4924868!16s%2Fg%2F11nnp_m20n?authuser=0&entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D",
                          bgColor: "bg-purple-100",
                          iconColor: "text-purple-600",
                          hoverColor: "hover:bg-purple-50",
                        },
                      ].map((item, index) => (
                        <motion.a
                          href={item.link}
                          key={index}
                          whileHover={{ x: 5 }}
                          className={`flex items-center p-4 rounded-lg border border-red-300 ${item.hoverColor} transition-all duration-300 group`}
                        >
                          <div
                            className={`flex-shrink-0 w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center mr-4`}
                          >
                            <i
                              className={`fas ${item.icon} ${item.iconColor}`}
                            ></i>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-orange-300 group-hover:text-blue-600 transition-colors">
                              {item.label}
                            </p>
                            <p className="text-emerald-700 group-hover:text-gray-800 transition-colors">
                              {item.value}
                            </p>
                          </div>
                          <i className="fas fa-chevron-right text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"></i>
                        </motion.a>
                      ))}
                    </div>
                    <h3 className="text-lg font-medium mt-8  text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300"></h3>
                    <div className="flex space-x-4 justify-center mb-4">
                      {[
                        {
                          icon: "fa-github",
                          color:
                            "hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 hover:text-white",
                          link: "https://github.com/rajeshlru",
                          tooltip: "GitHub",
                        },
                        {
                          icon: "fa-linkedin",
                          color:
                            "hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 hover:text-white",
                          link: "https://www.linkedin.com/in/rajesh-elluru-97ba6b356/",
                          tooltip: "LinkedIn",
                        },

                        {
                          icon: "fa-instagram",
                          color:
                            "hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-600 hover:text-white",
                          link: "https://instagram.com/rrajesh.h",
                          tooltip: "Instagram",
                        },
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -5, scale: 1.1 }}
                          className={`relative w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-xl backdrop-blur-sm transition-all duration-300 group ${social.color}`}
                          data-tooltip={social.tooltip}
                        >
                          <i
                            className={`fab ${social.icon} text-purple-300 group-hover:text-white transition-colors duration-300`}
                          ></i>
                          <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            {social.tooltip}
                          </span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeIn} className="relative">
                <div className=" bg-gradient-to-br from-red-200/10 via-green-50/15 to-emerald-300/10 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-green-200/80 px-8 py-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Let's Work Together
                    </h2>
                    <p className="text-gray-600 mt-1">
                      I'd love to hear about your project and how I can help
                    </p>
                  </div>

                  <div className="p-8">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                          <i className="fas fa-check text-2xl text-green-600"></i>
                        </div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">
                          Message Sent!
                        </h3>
                        <p className="text-gray-600">
                          Thanks for reaching out. I'll get back to you within
                          24 hours.
                        </p>
                        <button
                          onClick={() => setIsSubmitted(false)}
                          className="mt-6 px-5 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      <div className="max-w-2xl mx-auto p-6">
                        {submitStatus === "success" && (
                          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg relative">
                            <button
                              onClick={dismissStatus}
                              className="absolute top-2 right-2 text-green-700 hover:text-green-900"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                            <i className="fas fa-check-circle mr-2"></i>
                            Thank you! Your message has been sent successfully.
                          </div>
                        )}

                        {submitStatus === "error" && (
                          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg relative">
                            <button
                              onClick={dismissStatus}
                              className="absolute top-2 right-2 text-red-700 hover:text-red-900"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            Sorry, there was an error sending your message.
                            Please try again.
                          </div>
                        )}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                          <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                            <div className="relative group">
                              <label
                                htmlFor="firstName"
                                className="block font-medium mb-3 text-[16px] text-orange-500"
                              >
                                First Name
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                  <i className="fas fa-user text-green-500"></i>
                                </div>
                                <input
                                  id="firstName"
                                  name="firstName"
                                  type="text"
                                  required
                                  value={formData.firstName}
                                  onChange={handleChange}
                                  className="pl-10 pr-4 py-3 block w-full border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-0 transition-all duration-300 bg-transparent group-hover:border-blue-300"
                                  placeholder="Your first name"
                                />
                              </div>
                            </div>

                            <div className="relative group">
                              <label
                                htmlFor="lastName"
                                className="block font-medium mb-3 text-[16px] text-orange-500"
                              >
                                Last Name
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                  <i className="fas fa-signature text-green-500"></i>
                                </div>
                                <input
                                  id="lastName"
                                  name="lastName"
                                  type="text"
                                  required
                                  value={formData.lastName}
                                  onChange={handleChange}
                                  className="pl-10 pr-4 py-3 block w-full border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-0 transition-all duration-300 bg-transparent group-hover:border-blue-300"
                                  placeholder="Your last name"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                            <div className="relative group">
                              <label
                                htmlFor="email"
                                className="block font-medium mb-3 text-[16px] text-orange-500"
                              >
                                Email Address
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                  <i className="fas fa-envelope text-green-500"></i>
                                </div>
                                <input
                                  id="email"
                                  name="email"
                                  type="email"
                                  required
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="pl-10 pr-4 py-3 block w-full border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-0 transition-all duration-300 bg-transparent group-hover:border-blue-300"
                                  placeholder="your.email@example.com"
                                />
                              </div>
                            </div>

                            <div className="relative group">
                              <label
                                htmlFor="phone"
                                className="block text-[16px] font-medium mb-3 text-orange-500"
                              >
                                Phone Number
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                  <i className="fas fa-phone text-green-500"></i>
                                </div>
                                <input
                                  id="phone"
                                  name="phone"
                                  type="tel"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className="pl-10 pr-4 py-3 block w-full border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-0 transition-all duration-300 group-hover:border-blue-300 placeholder:text-gray-400 bg-transparent"
                                  placeholder="999-999-9999"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="relative group">
                            <label
                              htmlFor="message"
                              className="block font-medium mb-3 text-[16px] text-orange-500"
                            >
                              Your Message
                            </label>
                            <div className="relative">
                              <div className="absolute top-3 left-3 pointer-events-none z-10">
                                <i className="fas fa-comment text-green-500"></i>
                              </div>
                              <textarea
                                id="message"
                                name="message"
                                rows={5}
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className="pl-10 py-3 px-4 block w-full border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-0 transition-all duration-300 bg-transparent group-hover:border-blue-300 resize-none"
                                placeholder="Tell me about your project, timeline, and any specific requirements..."
                              ></textarea>
                            </div>
                          </div>

                          <div className="pt-2">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={`w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md transition-all duration-300 flex items-center justify-center group ${
                                isSubmitting
                                  ? "opacity-70 cursor-not-allowed"
                                  : "hover:from-blue-600 hover:to-blue-700"
                              }`}
                            >
                              {isSubmitting ? (
                                <>
                                  <span>Sending...</span>
                                  <i className="fas fa-spinner fa-spin ml-2"></i>
                                </>
                              ) : (
                                <>
                                  <span>Send Message</span>
                                  <i className="fas fa-paper-plane ml-2"></i>
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === "skills" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative bg-gradient-to-br from-gray-800/10 via-gray-900/20 to-gray-800/70 rounded-2xl p-8 shadow-xl border border-white/10 backdrop-blur-md overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiPjxwYXRoIGQ9Ik0wLDMwIGMzMCwwIDMwLDAgNjAsME0zMCwwIGMwLDMwIDAsMzAgMCw2MCIvPjwvZz48L3N2Zz4=')]"></div>
            </div>

            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-indigo-400/30"
                  animate={{
                    y: [0, -20, 0],
                    x: [0, i % 2 === 0 ? 10 : -10, 0],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            <h2 className="text-3xl font-bold text-center mb-12 relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 relative z-10">
                My Skills & Experience
              </span>
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <motion.div
                className="bg-gray-700/30 rounded-2xl p-6 border border-white/10 hover:border-indigo-400/30 transition-all duration-500 group relative overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-center mb-6 relative z-10">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 mb-3 shadow-lg shadow-indigo-500/20"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <i className="fas fa-paint-brush text-2xl text-white"></i>
                  </motion.div>
                  <h3 className="text-xl font-bold text-indigo-300 group-hover:text-indigo-200 transition-colors">
                    Frontend Development
                  </h3>
                </div>
                <div className="space-y-4 relative z-10">
                  {[
                    {
                      name: "React",
                      icon: "fab fa-react",
                      color: "text-cyan-400",
                    },
                    {
                      name: "Vue.js",
                      icon: "fab fa-vuejs",
                      color: "text-emerald-400",
                    },
                    {
                      name: "HTML5/CSS3",
                      icon: "fas fa-code",
                      color: "text-orange-400",
                    },
                    {
                      name: "JavaScript",
                      icon: "fab fa-js-square",
                      color: "text-yellow-300",
                    },
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-3 bg-gray-600/30 rounded-xl group-hover:bg-gray-600/40 transition-all duration-300 border border-transparent group-hover:border-indigo-400/10"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i
                        className={`${skill.icon} ${skill.color} text-xl mr-3`}
                      ></i>
                      <span className="text-purple-100">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-4 text-purple-200 text-sm text-center relative z-10">
                  Creating responsive, modern user interfaces with clean code
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-700/30 rounded-2xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-500 group relative overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-center mb-6 relative z-10">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-3 shadow-lg shadow-green-500/20"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <i className="fas fa-server text-2xl text-white"></i>
                  </motion.div>
                  <h3 className="text-xl font-bold text-green-300 group-hover:text-green-200 transition-colors">
                    Backend Development
                  </h3>
                </div>
                <div className="space-y-4 relative z-10">
                  {[
                    {
                      name: "Node.js",
                      icon: "fab fa-node-js",
                      color: "text-green-400",
                    },
                    {
                      name: "Express.js",
                      icon: "fas fa-layer-group",
                      color: "text-gray-300",
                    },
                    {
                      name: "RESTful APIs",
                      icon: "fas fa-cloud",
                      color: "text-blue-400",
                    },
                    {
                      name: "Authentication",
                      icon: "fas fa-lock",
                      color: "text-yellow-400",
                    },
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-3 bg-gray-600/30 rounded-xl group-hover:bg-gray-600/40 transition-all duration-300 border border-transparent "
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i
                        className={`${skill.icon} ${skill.color} text-xl mr-3`}
                      ></i>
                      <span className="text-purple-100">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-4 text-purple-200 text-sm text-center relative z-10">
                  Building scalable server-side applications and APIs
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-700/30 rounded-2xl p-6 border border-white/10 hover:border-pink-400/30 transition-all duration-500 group relative overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-center mb-6 relative z-10">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 mb-3 shadow-lg shadow-pink-500/20"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <i className="fas fa-database text-2xl text-white"></i>
                  </motion.div>
                  <h3 className="text-xl font-bold text-pink-300 group-hover:text-pink-200 transition-colors">
                    Database & Tools
                  </h3>
                </div>
                <div className="space-y-4 relative z-10">
                  {[
                    {
                      name: "MongoDB",
                      icon: "fas fa-database",
                      color: "text-green-500",
                    },
                    {
                      name: "Git",
                      icon: "fab fa-git-alt",
                      color: "text-red-400",
                    },
                    {
                      name: "npm/yarn",
                      icon: "fas fa-box",
                      color: "text-red-500",
                    },
                    {
                      name: "VS Code",
                      icon: "fas fa-code",
                      color: "text-blue-400",
                    },
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-3 bg-gray-600/30 rounded-xl group-hover:bg-gray-600/40 transition-all duration-300 border border-transparent group-hover:border-pink-400/10"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i
                        className={`${skill.icon} ${skill.color} text-xl mr-3`}
                      ></i>
                      <span className="text-purple-100">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-4 text-purple-200 text-sm text-center relative z-10">
                  Working with databases and development tools efficiently
                </p>
              </motion.div>
            </div>

            <div className="mt-12 relative z-10">
              <h3 className="text-xl font-bold mb-6 text-center text-indigo-300">
                Technologies I Work With
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    name: "React",
                    icon: "fab fa-react",
                    color: "text-cyan-400",
                    description: "Frontend Library",
                  },
                  {
                    name: "Vue.js",
                    icon: "fab fa-vuejs",
                    color: "text-emerald-400",
                    description: "Frontend Framework",
                  },
                  {
                    name: "Node.js",
                    icon: "fab fa-node-js",
                    color: "text-green-400",
                    description: "Runtime Environment",
                  },
                  {
                    name: "MongoDB",
                    icon: "fas fa-database",
                    color: "text-green-500",
                    description: "NoSQL Database",
                  },
                  {
                    name: "HTML5",
                    icon: "fab fa-html5",
                    color: "text-orange-400",
                    description: "Markup Language",
                  },
                  {
                    name: "CSS3",
                    icon: "fab fa-css3-alt",
                    color: "text-blue-400",
                    description: "Styling",
                  },
                  {
                    name: "JavaScript",
                    icon: "fab fa-js-square",
                    color: "text-yellow-300",
                    description: "Programming Language",
                  },
                  {
                    name: "Git",
                    icon: "fab fa-git-alt",
                    color: "text-red-400",
                    description: "Version Control",
                  },
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="flex flex-col items-center p-4 bg-gray-700/30 rounded-xl border border-white/10 hover:border-indigo-400/30 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <i
                      className={`${tech.icon} ${tech.color} text-4xl mb-3 relative z-10`}
                    ></i>
                    <span className="text-white font-medium relative z-10">
                      {tech.name}
                    </span>
                    <span className="text-purple-300 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                      {tech.description}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "projects" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className=" bg-gradient-to-br from-gray-50/10 to-gray-900/20 rounded-2xl p-8 shadow-xl border border-white/40 backdrop-blur-lg"
          >
            <h2 className="text-3xl font-bold text-center mb-12"></h2>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto">
                <motion.h1
                  className="text-4xl font-bold text-white text-center mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  My Projects
                </motion.h1>
                <motion.p
                  className="text-purple-300 text-center mb-12 max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  A collection of my recent work showcasing modern development
                  practices and technologies.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => {
                    const imageUrls = project.customImage
                      ? [project.customImage]
                      : [
                          `https://raw.githubusercontent.com/rajeshlru/${project.name}/main/screenshot.png`,
                          `https://raw.githubusercontent.com/rajeshlru/${project.name}/main/images/screenshot.png`,
                          `https://raw.githubusercontent.com/rajeshlru/${project.name}/main/assets/screenshot.png`,
                          `https://raw.githubusercontent.com/rajeshlru/${project.name}/main/img/screenshot.png`,
                          `https://raw.githubusercontent.com/rajeshlru/${project.name}/main/screenshot.jpg`,
                          `https://raw.githubusercontent.com/rajeshlru/${project.name}/main/images/screenshot.jpg`,
                          `https://raw.githubusercontent.com/rajeshlru/${project.name}/main/preview.png`,
                        ];

                    let liveDemoUrl = "";
                    if (index === 0) {
                      liveDemoUrl = "https://myflixx-moviesgpt.netlify.app/";
                    } else if (index === 1) {
                      liveDemoUrl = "https://my-youtube.vercel.app/";
                    } else if (index === 2) {
                      liveDemoUrl = "https://fodelivery.netlify.app/";
                    }

                    return (
                      <motion.div
                        key={index}
                        className="bg-gray-700/30 rounded-xl hover:scale-105 overflow-hidden border border-white/10 group hover:border-indigo-400/30 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="h-48 relative overflow-hidden">
                          <img
                            src={imageUrls[0]}
                            alt={project.name}
                            className="w-full h-full object-cover text-red-800"
                            onError={(e) => {
                              if (project.customImage) return;

                              const img = e.target;
                              const currentSrc = img.src;
                              const currentIndex =
                                imageUrls.indexOf(currentSrc);

                              if (currentIndex < imageUrls.length - 1) {
                                img.src = imageUrls[currentIndex + 1];
                              } else {
                                img.style.display = "none";
                                const fallback = img.nextSibling;
                                if (fallback) {
                                  fallback.style.display = "block";

                                  const initial = project.name
                                    .charAt(0)
                                    .toUpperCase();
                                  const initialElement =
                                    document.createElement("div");
                                  initialElement.className =
                                    "absolute inset-0 flex items-center justify-center text-4xl font-bold text-white opacity-60";
                                  initialElement.textContent = initial;
                                  fallback.appendChild(initialElement);
                                }
                              }
                            }}
                          />

                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 hidden">
                            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <i className="fab fa-github text-5xl text-white opacity-30"></i>
                            </div>
                          </div>

                          {liveDemoUrl && (
                            <div className="absolute top-3 right-3">
                              <motion.a
                                href={liveDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/80 text-green-300 border border-green-500/30 backdrop-blur-sm"
                              >
                                <i className="fas fa-external-link-alt mr-1 text-xs"></i>
                                Live Demo
                              </motion.a>
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-red-400 mb-2">
                            {project.name
                              .replace(/-/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </h3>
                          <p className="text-purple-200 mb-4 line-clamp-1">
                            {project.description ||
                              "A project showcasing modern development practices."}
                          </p>

                          <div className="flex items-center justify-between mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/50 text-indigo-300">
                              React
                            </span>

                            <div className="flex space-x-3 text-purple-300">
                              <span className="flex items-center text-sm">
                                <i className="fas fa-star mr-1 text-yellow-400"></i>
                                {project.stargazers_count || 0}
                              </span>
                              <span className="flex items-center text-sm">
                                <i className="fas fa-code-branch mr-1 text-blue-400"></i>
                                {project.forks_count || 0}
                              </span>
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <motion.a
                              href={project.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ x: 5 }}
                              className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600/30 text-white hover:bg-indigo-500/40 transition-colors text-sm backdrop-blur-sm"
                            >
                              <i className="fab fa-github mr-2"></i>
                              Code
                            </motion.a>

                            {liveDemoUrl && (
                              <motion.a
                                href={liveDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 5 }}
                                className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-600/30 text-white hover:bg-green-500/40 transition-colors text-sm backdrop-blur-sm"
                              >
                                <i className="fas fa-external-link-alt mr-2"></i>
                                Demo
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="text-center mt-12">
              <motion.a
                href="https://github.com/rajeshlru"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
              >
                <i className="fab fa-github mr-2"></i>
                View All Projects on GitHub
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default About;
