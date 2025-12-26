import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Rocket,
  Satellite,
  Sparkles,
  Zap,
  Orbit,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Myself = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/users/me", {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyProfile();
  }, []);

  // Handle link clicks to avoid nesting anchor tags
  const handleLinkClick = (e, url) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Handle resume download
  const handleResumeClick = (e, url) => {
    e.stopPropagation();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sky-300 font-tech-mono text-sm">
              LOADING...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="w-full  flex flex-col md:flex-row gap-8 p-4 md:p-8 items-center justify-center">
      {/* Left Section - Avatar */}
      <div className="w-full md:w-1/3 flex items-center justify-center p-4">
        <div className="relative w-full h-full rounded-lg border-4 border-white dark:border-gray-800 overflow-hidden shadow-2xl bg-gray-200 dark:bg-gray-700">
          {user?.avatar?.url ? (
            <img
              src={user.avatar.url}
              alt="User Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl font-bold text-gray-600 dark:text-gray-300">
              {user?.fullName?.charAt(0) || "U"}
            </div>
          )}
          {/* Online Indicator */}
          {user && (
            <div className="absolute bottom-4 right-4 online-indicator">
              <span className="bg-green-400 rounded-full w-7 h-7 border-4 border-white dark:border-gray-800 block shadow-md animate-pulse"></span>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Content */}
      <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-800 dark:text-white">
            {user.fullName}
          </h1>

          <div className="mb-6 text-2xl md:text-3xl text-gray-600 dark:text-gray-400">
            <Typewriter
              words={["FULLSTACK DEVELOPER", "YOUTUBER", "FREELANCER"]}
              loop={50}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
        </div>

        {user.aboutMe && (
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl text-center text-gray-700 dark:text-gray-300 mb-8">
            {user.aboutMe}
          </p>
        )}

        <div className="flex flex-wrap gap-6 justify-center">
          <SocialLink
            url={user.instagramURL}
            icon={<Instagram size={36} />}
            color="text-pink-500 hover:text-pink-600"
          />
          <SocialLink
            url={user.facebookURL}
            icon={<Facebook size={36} />}
            color="text-blue-600 hover:text-blue-700"
          />
          <SocialLink
            url={user.linkedInURL}
            icon={<Linkedin size={36} />}
            color="text-blue-500 hover:text-blue-600"
          />
          <SocialLink
            url={user.twitterURL}
            icon={<Twitter size={36} />}
            color="text-blue-400 hover:text-blue-500"
          />
          <SocialLink
            url="https://www.youtube.com/@CodeWithZeeshu"
            icon={<Youtube size={36} />}
            color="text-red-500 hover:text-red-600"
          />
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          <SocialButton
            url={user.githubURL}
            icon={<Github size={24} />}
            text="GitHub"
          />
          <SocialButton
            url={user.resume?.url}
            icon={<ExternalLink size={24} />}
            text="View Resume"
            disabled={!user.resume?.url}
          />
        </div>
      </div>
=======
    <div className="relative w-full max-w-6xl mx-auto px-4 py-8 md:py-16">
      {/* Cosmic background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbiting particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-sky-300/10 animate-orbit"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              animationDuration: `${Math.random() * 20 + 20}s`,
              animationDelay: `${Math.random() * 5}s`,
              top: "40%",
              left: "40%",
            }}
          />
        ))}

        {/* Energy pulses */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64">
          <div
            className="absolute inset-0 border-2 border-sky-500/20 rounded-full animate-ping"
            style={{ animationDuration: "4s" }}
          />
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64">
          <div
            className="absolute inset-0 border-2 border-blue-500/20 rounded-full animate-ping"
            style={{ animationDuration: "3.5s", animationDelay: "1s" }}
          />
        </div>
      </div>

      {/* Main container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Section - Avatar & Intro */}
        <div className="relative">
          {/* Cosmic energy field */}
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-transparent blur-xl opacity-50" />

          {/* Avatar Container */}
          <div className="relative mb-8 avatar-container">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto">
              {/* Orbital rings */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 border-2 border-sky-500/30 rounded-full animate-spin"
                  style={{ animationDuration: "20s" }}
                />
                <div
                  className="absolute inset-8 border-2 border-blue-500/20 rounded-full animate-spin"
                  style={{
                    animationDuration: "15s",
                    animationDirection: "reverse",
                  }}
                />
                <div
                  className="absolute inset-16 border-2 border-purple-500/10 rounded-full animate-spin"
                  style={{ animationDuration: "25s" }}
                />
              </div>

              {/* Main avatar */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-sky-500/50 shadow-2xl shadow-sky-900/30 group">
                {user?.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt="User Avatar"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center text-6xl font-bold text-sky-300">
                          ${user?.fullName?.charAt(0) || "U"}
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center text-6xl font-bold text-sky-300">
                    {user?.fullName?.charAt(0) || "U"}
                  </div>
                )}

                {/* Online Indicator */}
                <div className="absolute bottom-4 right-4 online-indicator z-100">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-8 h-8 border-4 border-gray-900 block shadow-lg animate-pulse"></span>
                  <div
                    className="absolute inset-0 rounded-full bg-green-400/30 animate-ping"
                    style={{ animationDuration: "2s" }}
                  />
                </div>
              </div>

              {/* Floating icon */}
              <Rocket
                className="absolute -top-4 -right-4 text-sky-400 animate-bounce"
                size={32}
              />
              <Satellite
                className="absolute -bottom-4 -left-4 text-blue-400 animate-spin"
                size={28}
                style={{ animationDuration: "8s" }}
              />
            </div>
          </div>

          {/* Name & Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-tech-heading tracking-wider">
              <span className="text-white">HEY, I'M </span>
              <span className="text-tubeLight-effect">{user.fullName}</span>
            </h1>

            {/* Typewriter with cosmic effect */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-transparent via-sky-500/10 to-transparent animate-pulse" />
              <div className="text-xl sm:text-2xl font-tech-mono text-sky-300 relative z-10 py-3 px-6 rounded-lg bg-gray-900/50 border border-sky-500/30">
                <Typewriter
                  words={[
                    "FULLSTACK DEVELOPER",
                    "SPACE ENTHUSIAST",
                    "YOUTUBER",
                    "FREELANCER",
                    "CODE EXPLORER",
                  ]}
                  loop={50}
                  cursor
                  cursorStyle="█"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </div>
              <Sparkles
                className="absolute -top-2 left-4 text-yellow-300 animate-pulse"
                size={16}
              />
              <Zap
                className="absolute -top-2 right-4 text-sky-300 animate-pulse"
                size={16}
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>

          {/* About Me */}
          {user.aboutMe && (
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-sky-500/5 to-blue-500/5 blur-sm" />
              <p className="text-lg leading-relaxed text-gray-300 font-tech-body p-6 bg-gray-900/50 rounded-xl border border-sky-500/20 relative z-10">
                {user.aboutMe}
              </p>
              <Orbit
                className="absolute -bottom-4 -right-4 text-sky-400/30 animate-spin"
                size={40}
                style={{ animationDuration: "30s" }}
              />
            </div>
          )}
        </div>

        {/* Right Section - Social & Actions */}
        <div className="relative">
          {/* Cosmic connection lines */}
          <div className="absolute left-0 top-1/2 w-8 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

          <div className="glass-space rounded-2xl p-8 border border-sky-500/20 shadow-xl">
            {/* Section title */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-sky-300 font-tech-heading tracking-wider mb-2">
                CONNECT WITH ME
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent mx-auto rounded-full" />
            </div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-10">
              <SocialLink
                url={user.instagramURL}
                icon={<Instagram />}
                label="Instagram"
                color="pink"
              />
              <SocialLink
                url={user.facebookURL}
                icon={<Facebook />}
                label="Facebook"
                color="blue"
              />
              <SocialLink
                url={user.linkedInURL}
                icon={<Linkedin />}
                label="LinkedIn"
                color="blue"
              />
              <SocialLink
                url={user.twitterURL}
                icon={<Twitter />}
                label="Twitter"
                color="sky"
              />
              <SocialLink
                url="https://www.youtube.com/@CodeWithZeeshu"
                icon={<Youtube />}
                label="YouTube"
                color="red"
              />
              <SocialLink
                url={user.githubURL}
                icon={<Github />}
                label="GitHub"
                color="gray"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-gray-300 font-tech-body mb-4">
                  Ready to launch a project into orbit?
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  {user.githubURL && (
                    <button
                      onClick={(e) => handleLinkClick(e, user.githubURL)}
                      className="relative rounded-full px-8 py-6 gap-3 text-lg font-tech-heading tracking-wider bg-gradient-to-br from-gray-800 to-gray-900 border border-sky-500/30 hover:scale-105 hover:shadow-xl hover:shadow-sky-900/30 transition-all duration-300 flex items-center"
                    >
                      <Github size={20} className="text-white" />
                      <span className="text-white">GITHUB PROFILE</span>
                      <Sparkles
                        className="absolute -top-2 -right-2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        size={12}
                      />
                    </button>
                  )}
                  {user.resume?.url && (
                    <button
                      onClick={(e) => handleResumeClick(e, user.resume.url)}
                      className="relative rounded-full px-8 py-6 gap-3 text-lg font-tech-heading tracking-wider bg-gradient-to-br from-sky-700 to-blue-800 border border-sky-500/30 hover:scale-105 hover:shadow-xl hover:shadow-sky-900/30 transition-all duration-300 flex items-center text-white"
                    >
                      <ExternalLink size={20} className="text-white" />
                      <span className="text-white font-bold">VIEW RESUME</span>
                      <Sparkles
                        className="absolute -top-2 -right-2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        size={12}
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Stats or Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-sky-500/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sky-300 font-tech-heading">
                    ∞
                  </div>
                  <div className="text-xs text-gray-400 font-tech-mono">
                    POSSIBILITIES
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sky-300 font-tech-heading">
                    24/7
                  </div>
                  <div className="text-xs text-gray-400 font-tech-mono">
                    AVAILABILITY
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Energy pulse effect */}
          <div className="absolute -bottom-4 -right-4 w-16 h-16">
            <div
              className="absolute inset-0 border-2 border-sky-400/30 rounded-full animate-ping"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute inset-4 border-2 border-blue-400/20 rounded-full animate-ping"
              style={{ animationDuration: "4s", animationDelay: "0.5s" }}
            />
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }

        .animate-orbit {
          animation: orbit linear infinite;
        }

        /* Avatar hover effect */
        .avatar-container:hover .avatar-ring {
          animation-duration: 5s;
        }

        /* Typewriter cursor blink */
        .react-simple-typewriter {
          display: inline-block;
        }

        .react-simple-typewriter::after {
          content: "█";
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
>>>>>>> 4a73a3b (updated)
    </div>
  );
};

<<<<<<< HEAD
const SocialLink = ({ url, icon, color }) =>
  url && (
    <Link
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${color} transition-all duration-300 hover:-translate-y-1`}
    >
      {icon}
    </Link>
  );

const SocialButton = ({ url, icon, text, disabled }) =>
  url &&
  !disabled && (
    <Link to={url} target="_blank" rel="noopener noreferrer">
      <Button className="rounded-full px-8 py-4 gap-3 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 text-lg transition-transform hover:scale-105">
        {icon}
        <span>{text}</span>
      </Button>
    </Link>
=======
// Fixed Social Link Component
const SocialLink = ({ url, icon, label, color }) => {
  const getIconColor = (color) => {
    switch (color) {
      case "pink":
        return "text-pink-500";
      case "blue":
        return "text-blue-500";
      case "sky":
        return "text-sky-400";
      case "red":
        return "text-red-500";
      case "gray":
        return "text-gray-300";
      default:
        return "text-sky-300";
    }
  };

  const getHoverColor = (color) => {
    switch (color) {
      case "pink":
        return "group-hover:text-pink-400";
      case "blue":
        return "group-hover:text-blue-400";
      case "sky":
        return "group-hover:text-sky-300";
      case "red":
        return "group-hover:text-red-400";
      case "gray":
        return "group-hover:text-gray-200";
      default:
        return "group-hover:text-sky-200";
    }
  };

  return (
    url && (
      <div className="relative group">
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(url, "_blank", "noopener,noreferrer");
          }}
          className="relative flex flex-col items-center justify-center p-4 rounded-lg bg-gray-900/50 border border-sky-500/20 group-hover:border-sky-400/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-sky-900/30 w-full"
          title={label}
        >
          {/* Icon */}
          <div
            className={`text-2xl mb-2 ${getIconColor(color)} ${getHoverColor(
              color
            )} transition-colors duration-300`}
          >
            {React.cloneElement(icon, { size: 28 })}
          </div>

          {/* Label */}
          <span className="text-xs font-tech-mono text-gray-400 group-hover:text-sky-300 transition-colors duration-300">
            {label}
          </span>

          {/* Connection dot */}
          <div className="absolute -bottom-1 w-2 h-2 rounded-full bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    )
>>>>>>> 4a73a3b (updated)
  );
};

export default Myself;
