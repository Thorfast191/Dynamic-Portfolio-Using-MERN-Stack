import React from "react";
<<<<<<< HEAD
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="py-10 px-4 sm:px-6 w-full max-w-6xl mx-auto mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 dark:via-blue-400 to-transparent mb-8"></div>

        <motion.h1
          className="text-tubeLight-effect text-2xl sm:text-3xl tracking-[10px] font-light mb-6 text-center"
          whileHover={{ scale: 1.05 }}
        >
          THANKS FOR SCROLLING
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {["github", "linkedin", "twitter", "instagram"].map((platform) => (
            <motion.a
              key={platform}
              href="#"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              whileHover={{ y: -5 }}
              aria-label={platform}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <text
                    x="12"
                    y="16"
                    textAnchor="middle"
                    fontSize="10"
                    fill="currentColor"
                  >
                    {platform.charAt(0).toUpperCase()}
                  </text>
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </motion.footer>
=======
import { Rocket, Stars, Sparkles, Satellite } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative p-5 mt-12 w-full max-w-[1050px] mx-auto overflow-hidden">
      {/* Shooting stars in background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] w-24 bg-gradient-to-r from-transparent via-sky-300 to-transparent animate-shooting-star-footer"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-sky-300/20 animate-float-footer"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4}px`,
              height: `${Math.random() * 4}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Cosmic divider line */}
      <div className="relative">
        {/* Glowing center effect */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-32">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent blur-xl" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <Rocket className="text-sky-400 animate-float" size={24} />
          </div>
        </div>

        {/* Animated divider */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent my-8">
          {/* Pulsing orbs along the line */}
          {[...Array(7)].map((_, i) => (
            <div
              key={`orb-${i}`}
              className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-sky-400 animate-pulse"
              style={{
                left: `${(i + 1) * 12.5}%`,
                animationDelay: `${i * 0.5}s`,
                boxShadow: "0 0 10px 2px rgba(56, 189, 248, 0.8)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Title with cosmic effect */}
        <div className="relative mb-6">
          <h1 className="text-[1.75rem] sm:text-[2.5rem] font-extrabold text-center font-tech-heading tracking-[0.15em] relative">
            <span className="text-tubeLight-effect">THANKS FOR</span>
            <span className="text-sky-300 ml-3">SCROLLING</span>

            {/* Sparkle icons */}
            <Sparkles
              className="absolute -top-4 -left-4 text-yellow-300 animate-pulse"
              size={20}
            />
            <Stars
              className="absolute -top-4 -right-4 text-sky-300 animate-spin"
              size={20}
              style={{ animationDuration: "3s" }}
            />
            <Satellite
              className="absolute -bottom-4 left-1/4 text-blue-300 animate-pulse"
              size={16}
            />
            <Sparkles
              className="absolute -bottom-4 right-1/4 text-yellow-300 animate-pulse"
              size={16}
              style={{ animationDelay: "0.5s" }}
            />
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-300 mt-4 font-tech-body">
            May your code compile on the first try 🚀
          </p>
        </div>

        {/* Cosmic signature */}
        <div className="flex flex-col items-center gap-6 mt-8">
          {/* Digital signature */}
          <div className="relative">
            <div className="text-xl font-tech-mono text-sky-400 tracking-wider animate-pulse">
              [ COMPILED_WITH_COFFEE.js ]
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-sky-500/10 to-transparent rounded-lg blur-sm" />
          </div>

          {/* Social links or additional info can go here */}
          <div className="flex items-center gap-6 text-sm font-tech-body text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Status: Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <span>Signal: Strong</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-sky-500/20">
          <p className="text-center text-xs font-tech-mono text-gray-500">
            © {new Date().getFullYear()} Interstellar Portfolio • Built with
            React & Tailwind CSS • Transmission Frequency: 24/7
          </p>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes shooting-star-footer {
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
            transform: translateX(200px) translateY(200px)
              rotate(var(--rotation, 45deg));
            opacity: 0;
          }
        }

        @keyframes float-footer {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          33% {
            transform: translateY(-10px) translateX(10px);
            opacity: 0.1;
          }
          66% {
            transform: translateY(5px) translateX(-5px);
            opacity: 0.3;
          }
        }

        .animate-shooting-star-footer {
          animation: shooting-star-footer 4s linear infinite;
        }

        .animate-float-footer {
          animation: float-footer 15s ease-in-out infinite;
        }

        /* Glitch effect for signature */
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        .animate-glitch {
          animation: glitch 0.5s infinite;
        }

        /* Binary rain effect */
        .binary-rain {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          opacity: 0.1;
          pointer-events: none;
        }

        .binary-digit {
          position: absolute;
          color: var(--neon-blue);
          font-family: "Share Tech Mono", monospace;
          font-size: 12px;
          animation: binary-fall linear infinite;
        }

        @keyframes binary-fall {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>

      {/* Optional: Binary rain effect - uncomment if you want it */}

      <div className="binary-rain">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="binary-digit"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>
    </footer>
>>>>>>> 4a73a3b (updated)
  );
};

export default Footer;
