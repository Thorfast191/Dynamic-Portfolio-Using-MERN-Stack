import Contact from "@/components/sub-components/Contact";
import MyApps from "@/components/sub-components/MyApps";
import Myself from "@/components/sub-components/Myself";
import Portfolio from "@/components/sub-components/Portfolio";
import Skills from "@/components/sub-components/Skills";
import Timeline from "@/components/sub-components/Timeline";
import Publications from "@/components/sub-components/Publications";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserCircle,
  Clock,
  Code,
  Briefcase,
  BookOpen,
  Smartphone,
  Mail,
  Rocket,
  Satellite,
  Sparkles,
  Zap,
} from "lucide-react";

const Home = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, []);

  const scrollToSection = (id) => {
    window.location.hash = id;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sectionCards = [
    {
      id: "myself",
      title: "PROFILE",
      desc: "About Me",
      icon: <UserCircle size={28} />,
      color: "from-sky-500 to-blue-500",
    },
    {
      id: "timeline",
      title: "JOURNEY",
      desc: "Professional Timeline",
      icon: <Clock size={28} />,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "skills",
      title: "SKILLS",
      desc: "Technical Capabilities",
      icon: <Code size={28} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "portfolio",
      title: "PROJECTS",
      desc: "Key Accomplishments",
      icon: <Briefcase size={28} />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "publications",
      title: "RESEARCH",
      desc: "Publications & Writings",
      icon: <BookOpen size={28} />,
      color: "from-red-500 to-rose-500",
    },
    {
      id: "apps",
      title: "APPS",
      desc: "Software Products",
      icon: <Smartphone size={28} />,
      color: "from-indigo-500 to-violet-500",
    },
    {
      id: "contact",
      title: "CONTACT",
      desc: "Get in Touch",
      icon: <Mail size={28} />,
      color: "from-blue-400 to-cyan-400",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <div className="relative min-h-screen">
      {/* Space Background Container */}
      <div className="fixed inset-0 overflow-hidden -z-50">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/80 to-gray-900 animate-gradient" />

        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Shooting stars */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute h-[1px] w-32 bg-gradient-to-r from-transparent via-sky-300 to-transparent animate-shooting-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-sky-300/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4}px`,
              height: `${Math.random() * 4}px`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Large cosmic orbs */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      {/* Subtle overlay for readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-gray-900/30 pointer-events-none -z-40" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 py-20 relative">
          {/* Cosmic center effect */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/20 to-transparent blur-3xl" />
            <div
              className="absolute inset-0 border-2 border-sky-500/20 rounded-full animate-ping"
              style={{ animationDuration: "4s" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-tech-heading tracking-wider">
              <span className="text-white">WELCOME TO </span>
              <span className="text-tubeLight-effect">MY SPACE</span>
            </h1>

            {/* Subtitle with typewriter effect */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-transparent via-sky-500/10 to-transparent animate-pulse" />
              <p className="text-xl sm:text-2xl text-gray-300 font-tech-body relative z-10 py-4 px-6 rounded-lg bg-gray-900/30 border border-sky-500/30">
                <span className="text-sky-300 font-tech-mono">
                  {"<"}SPACE_ENTHUSIAST/{">"}
                </span>{" "}
                •{" "}
                <span className="text-sky-300 font-tech-mono">
                  {"<"}CODE_EXPLORER/{">"}
                </span>{" "}
                •{" "}
                <span className="text-sky-300 font-tech-mono">
                  {"<"}DIGITAL_CREATOR/{">"}
                </span>
              </p>
            </div>

            {/* Floating icons */}
            <Rocket
              className="absolute -top-8 left-1/4 text-sky-400 animate-bounce"
              size={32}
            />
            <Satellite
              className="absolute -top-8 right-1/4 text-blue-400 animate-spin"
              size={32}
              style={{ animationDuration: "8s" }}
            />
            <Sparkles
              className="absolute -bottom-8 left-1/3 text-yellow-300 animate-pulse"
              size={24}
            />
            <Zap
              className="absolute -bottom-8 right-1/3 text-sky-300 animate-pulse"
              size={24}
              style={{ animationDelay: "0.5s" }}
            />
          </motion.div>
        </div>

        {/* Navigation Cards */}
        <div className="mb-20 relative">
          {/* Section title */}
          <div className="text-center mb-12 relative">
            <h2 className="text-3xl font-bold text-sky-300 font-tech-heading tracking-wider mb-4">
              EXPLORE THE GALAXY
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent mx-auto rounded-full" />
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectionCards.map((item, i) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={i}
                whileHover={{ scale: 1.05, y: -8 }}
                onClick={() => scrollToSection(item.id)}
                className="relative group cursor-pointer"
              >
                {/* Glow effect */}
                <div
                  className={`absolute -inset-2 rounded-2xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500`}
                />

                <div className="glass-space rounded-xl p-6 border border-sky-500/30 shadow-lg group-hover:shadow-sky-900/40 transition-all duration-500 relative z-10 h-full flex flex-col items-center text-center">
                  {/* Icon container */}
                  <div className="mb-4">
                    <div
                      className={`p-3 rounded-full bg-gradient-to-br ${item.color} text-white`}
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white font-tech-heading mb-2 tracking-wider">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 font-tech-body text-sm mb-4">
                    {item.desc}
                  </p>

                  {/* Click indicator */}
                  <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sky-300 text-xs font-tech-mono animate-pulse">
                      CLICK TO EXPLORE →
                    </span>
                  </div>

                  {/* Connection line on hover */}
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cosmic connection lines */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-500/20 to-transparent -z-10" />
        </div>

        {/* Main Sections */}
        <div className="space-y-32">
          <motion.div
            id="myself"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Myself />
          </motion.div>

          <motion.div
            id="timeline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Timeline />
          </motion.div>

          <motion.div
            id="skills"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Skills />
          </motion.div>

          <motion.div
            id="portfolio"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Portfolio />
          </motion.div>

          <motion.div
            id="publications"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Publications />
          </motion.div>

          <motion.div
            id="apps"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <MyApps />
          </motion.div>

          <motion.div
            id="contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Contact />
          </motion.div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-br from-sky-600 to-blue-700 rounded-full shadow-lg hover:shadow-sky-900/50 transition-all duration-300 group z-50"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Rocket className="text-white group-hover:animate-bounce" size={24} />
        </motion.button>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0)
              rotate(var(--rotation, 45deg));
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px)
              rotate(var(--rotation, 45deg));
            opacity: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.1;
          }
        }

        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        .animate-shooting-star {
          animation: shooting-star 3s linear infinite;
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .glass-space {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Home;
