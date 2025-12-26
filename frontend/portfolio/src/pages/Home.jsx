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
      title: "About Me",
      desc: "Background and expertise",
      icon: <UserCircle size={28} />,
    },
    {
      id: "timeline",
      title: "Journey",
      desc: "Professional timeline",
      icon: <Clock size={28} />,
    },
    {
      id: "skills",
      title: "Skills",
      desc: "Technical capabilities",
      icon: <Code size={28} />,
    },
    {
      id: "portfolio",
      title: "Projects",
      desc: "Key accomplishments",
      icon: <Briefcase size={28} />,
    },
    {
      id: "publications",
      title: "Publications",
      desc: "Research & writings",
      icon: <BookOpen size={28} />,
    },
    {
      id: "apps",
      title: "Applications",
      desc: "Software products",
      icon: <Smartphone size={28} />,
    },
    {
      id: "contact",
      title: "Contact",
      desc: "Get in touch",
      icon: <Mail size={28} />,
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
<<<<<<< HEAD
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-48 -z-10">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-50 to-transparent dark:from-indigo-900/20 dark:to-transparent"></div>
      </div>

      {/* Floating circles */}
      <div className="fixed top-1/4 left-[5%] w-48 h-48 rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl -z-20"></div>
      <div className="fixed bottom-1/3 right-[5%] w-64 h-64 rounded-full bg-indigo-100/30 dark:bg-indigo-900/10 blur-3xl -z-20"></div>

      {/* Side accent lines */}
      <div className="hidden lg:block fixed top-0 left-[5%] h-full w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
      <div className="hidden lg:block fixed top-0 right-[5%] h-full w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>

      {/* Compact Hero Section */}
      <div className="text-center mb-10 py-12 px-4 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 relative">
        {/* Decorative corner elements */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-blue-500 dark:border-blue-400"></div>
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-blue-500 dark:border-blue-400"></div>
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-blue-500 dark:border-blue-400"></div>
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-blue-500 dark:border-blue-400"></div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Professional{" "}
          <span className="text-blue-600 dark:text-blue-400">Portfolio</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Discover my professional journey and expertise
        </motion.p>
      </div>

      {/* Navigation Cards */}
      <div className="mb-10 relative">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Explore Sections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectionCards.map((item, i) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={i}
              whileHover={{ y: -5 }}
              onClick={() => scrollToSection(item.id)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-pointer transition-all duration-300 flex flex-col items-center text-center h-full border border-gray-100 dark:border-gray-700 relative group"
            >
              {/* Corner decoration */}
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-blue-500 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-blue-500 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="mb-3 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Sections with tighter spacing */}
      <div className="space-y-8 relative">
        {/* Decorative connector lines */}
        <div className="hidden lg:block absolute top-0 left-[10%] right-[10%] h-full -z-10">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-blue-200 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30"></div>
        </div>

        <motion.div
          id="myself"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <Myself />
        </motion.div>

        <motion.div
          id="timeline"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <Timeline />
        </motion.div>

        <motion.div
          id="skills"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <Skills />
        </motion.div>

        <motion.div
          id="portfolio"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <Portfolio />
        </motion.div>

        <motion.div
          id="publications"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <Publications />
        </motion.div>

        <motion.div
          id="apps"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <MyApps />
        </motion.div>

        <motion.div
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <Contact />
        </motion.div>
      </div>
    </div>
=======
    <>
      {/* Google Fonts Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap"
        rel="stylesheet"
      />

      {/* Space Background Container */}
      <div className="fixed inset-0 overflow-hidden z-[-10]">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 animate-gradient bg-[length:400%_400%]" />

        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
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
        {[...Array(3)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute h-[1px] w-32 bg-gradient-to-r from-transparent via-sky-300 to-transparent animate-shooting-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-sky-300/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 50 + 10}px`,
              height: `${Math.random() * 50 + 10}px`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Global styles for animations and fonts */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap");

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
            transform: translateX(0) translateY(0) rotate(45deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px) rotate(45deg);
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

        /* Font classes */
        .font-tech-heading {
          font-family: "Orbitron", sans-serif;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .font-tech-subheading {
          font-family: "Exo 2", sans-serif;
          font-weight: 500;
          letter-spacing: 0.03em;
        }

        .font-tech-body {
          font-family: "Exo 2", sans-serif;
          font-weight: 300;
          line-height: 1.6;
        }

        .font-tech-mono {
          font-family: "Share Tech Mono", monospace;
          letter-spacing: 0.05em;
        }

        /* Apply fonts to global elements within the component */
        .home-container h1,
        .home-container h2,
        .home-container h3,
        .home-container h4 {
          font-family: "Orbitron", sans-serif;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .home-container p,
        .home-container li,
        .home-container span:not(.font-tech-mono) {
          font-family: "Exo 2", sans-serif;
          font-weight: 300;
          line-height: 1.6;
        }

        .home-container code,
        .home-container pre,
        .tech-code {
          font-family: "Share Tech Mono", monospace;
          letter-spacing: 0.05em;
        }

        .animate-gradient {
          animation: gradient 15s ease infinite;
        }

        .animate-shooting-star {
          animation: shooting-star 3s linear infinite;
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        /* Holographic text effect for main headings */
        .holographic-text {
          background: linear-gradient(
            90deg,
            rgba(56, 189, 248, 0.9),
            rgba(125, 211, 252, 0.8),
            rgba(56, 189, 248, 0.9)
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: text-shimmer 3s linear infinite;
        }

        @keyframes text-shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>

      <article className="home-container min-w-[1200px] min-h-screen flex flex-col items-center justify-center gap-14 p-5 relative">
        {/* Subtle overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/40 pointer-events-none" />

        <div className="w-full max-w-full z-10">
          {" "}
          {/* Constrain content to viewport width */}
          <Myself />
        </div>

        <Timeline />
        <Skills />
        <Portfolio />
        <MyApps />
        <Contact />
      </article>
    </>
>>>>>>> 4a73a3b (updated)
  );
};

export default Home;
