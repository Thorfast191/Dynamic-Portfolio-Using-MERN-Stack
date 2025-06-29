import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Myself = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-white p-4">Loading...</div>;
  }

  return (
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
    </div>
  );
};

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
  );

export default Myself;
