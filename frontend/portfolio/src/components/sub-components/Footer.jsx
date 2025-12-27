import React from "react";
import { Rocket, Stars, Sparkles, Satellite } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="relative p-5 mt-12 w-full max-w-[1050px] mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Rocket className="text-sky-400" size={24} />
          </motion.div>
        </div>

        {/* Animated divider */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent my-8">
          {/* Pulsing orbs along the line */}
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-sky-400"
              style={{
                left: `${(i + 1) * 12.5}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Title with cosmic effect */}
        <div className="relative mb-6">
          <motion.h1
            className="text-[1.75rem] sm:text-[2.5rem] font-extrabold text-center font-tech-heading tracking-[0.15em] relative"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-tubeLight-effect">THANKS FOR</span>
            <span className="text-sky-300 ml-3">SCROLLING</span>

            {/* Sparkle icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              <Sparkles
                className="absolute -top-4 -left-4 text-yellow-300"
                size={20}
              />
            </motion.div>
            <Stars
              className="absolute -top-4 -right-4 text-sky-300"
              size={20}
            />
            <Satellite
              className="absolute -bottom-4 left-1/4 text-blue-300"
              size={16}
            />
            <Sparkles
              className="absolute -bottom-4 right-1/4 text-yellow-300"
              size={16}
            />
          </motion.h1>

          {/* Subtitle */}
          <p className="text-center text-gray-300 mt-4 font-tech-body">
            May your code compile on the first try 🚀
          </p>
        </div>

        {/* Cosmic signature */}
        <div className="flex flex-col items-center gap-6 mt-8">
          {/* Digital signature */}
          <motion.div className="relative" whileHover={{ scale: 1.05 }}>
            <div className="text-xl font-tech-mono text-sky-400 tracking-wider">
              [ COMPILED_WITH_COFFEE.js ]
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-sky-500/10 to-transparent rounded-lg blur-sm" />
          </motion.div>

          {/* Status indicators */}
          <div className="flex items-center gap-6 text-sm font-tech-body text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Status: Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
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

      {/* Binary rain effect */}
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

      {/* CSS styles */}
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

        @keyframes binary-fall {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .animate-shooting-star-footer {
          animation: shooting-star-footer 4s linear infinite;
        }

        .animate-float-footer {
          animation: float-footer 15s ease-in-out infinite;
        }

        .binary-rain {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          opacity: 0.1;
          pointer-events: none;
          z-index: 1;
        }

        .binary-digit {
          position: absolute;
          color: rgb(125 211 252);
          font-family: monospace;
          font-size: 12px;
          animation: binary-fall linear infinite;
        }
      `}</style>
    </motion.footer>
  );
};

export default Footer;
