import React from "react";
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
  );
};

export default Footer;
