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
    <div className="flex flex-col w-full h-screen gap-8 p-8">
      {/* Left Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-white text-2xl rounded-lg shadow-lg py-10">
        {/* Avatar Container */}
        <div className="relative mb-8 avatar-container">
          <div className="w-52 h-52 rounded-full border-8 border-white overflow-hidden relative mx-auto">
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
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-6xl font-bold text-gray-600">
                {user?.fullName?.charAt(0) || "U"}
              </div>
            )}
            {/* Online Indicator */}
            {user && (
              <div className="absolute bottom-2 left-2 online-indicator z-100">
                <span className="bg-green-400 rounded-full w-7 h-7 border-4 border-white block shadow-md animate-pulse"></span>
              </div>
            )}
          </div>
        </div>

        {/* Name & Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Hey, I'm {user.fullName}
        </h1>

        <div className="text-tubeLight-effect mb-8">
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

        {/* About Me */}
        {user.aboutMe && (
          <p className="text-xl leading-relaxed max-w-2xl text-gray-700 dark:text-gray-300 px-4 text-center">
            {user.aboutMe}
          </p>
        )}
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-white text-2xl rounded-lg shadow-lg py-10">
        {/* Social Links */}
        <div className="flex flex-wrap gap-6 mb-10">
          <SocialLink
            url={user.instagramURL}
            icon={<Instagram size={32} />}
            color="text-pink-500"
          />
          <SocialLink
            url={user.facebookURL}
            icon={<Facebook size={32} />}
            color="text-blue-600"
          />
          <SocialLink
            url={user.linkedInURL}
            icon={<Linkedin size={32} />}
            color="text-blue-500"
          />
          <SocialLink
            url={user.twitterURL}
            icon={<Twitter size={32} />}
            color="text-blue-400"
          />
          <SocialLink
            url="https://www.youtube.com/@CodeWithZeeshu"
            icon={<Youtube size={32} />}
            color="text-red-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-6 mb-10">
          <SocialButton
            url={user.githubURL}
            icon={<Github size={24} />}
            text="GitHub"
          />
          <SocialButton
            url={user.resume?.url}
            icon={<ExternalLink size={24} />}
            text="Resume"
            disabled={!user.resume?.url}
          />
        </div>
      </div>
    </div>
  );
};

// Social Link Component
const SocialLink = ({ url, icon, color }) =>
  url && (
    <Link
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${color} hover:scale-125 transition-transform duration-300`}
    >
      {icon}
    </Link>
  );

// Social Button Component
const SocialButton = ({ url, icon, text, disabled }) =>
  url &&
  !disabled && (
    <Link to={url} target="_blank" rel="noopener noreferrer">
      <Button className="rounded-full px-8 py-4 gap-3 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 text-lg">
        {icon}
        <span>{text}</span>
      </Button>
    </Link>
  );

export default Myself;
