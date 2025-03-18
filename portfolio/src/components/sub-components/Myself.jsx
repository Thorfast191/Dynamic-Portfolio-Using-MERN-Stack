// Myself.jsx
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
    <div className="w-full p-4">
      {/* Avatar & Online Status */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative avatar-container">
          {user?.avatar?.url ? (
            <img
              src={user.avatar.url}
              alt="User Avatar"
              className="avatar-image"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="avatar-image bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
              {user?.fullName?.charAt(0) || "U"}
            </div>
          )}
          <div className="online-indicator"></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-green-400 rounded-full h-2 w-2"></span>
          <p className="text-gray-600 dark:text-gray-300">Online</p>
        </div>
      </div>

      {/* Name & Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
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

      {/* Social Links */}
      <div className="flex flex-wrap gap-4 mb-8">
        <SocialLink
          url={user.instagramURL}
          icon={<Instagram />}
          color="text-pink-500"
        />
        <SocialLink
          url={user.facebookURL}
          icon={<Facebook />}
          color="text-blue-600"
        />
        <SocialLink
          url={user.linkedInURL}
          icon={<Linkedin />}
          color="text-blue-500"
        />
        <SocialLink
          url={user.twitterURL}
          icon={<Twitter />}
          color="text-blue-400"
        />
        <SocialLink
          url="https://www.youtube.com/@CodeWithZeeshu"
          icon={<Youtube />}
          color="text-red-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <SocialButton url={user.githubURL} icon={<Github />} text="GitHub" />
        <SocialButton
          url={user.resume?.url}
          icon={<ExternalLink />}
          text="Resume"
          disabled={!user.resume?.url}
        />
      </div>

      {/* About Section */}
      {user.aboutMe && (
        <p className="text-lg leading-relaxed max-w-3xl text-gray-700 dark:text-gray-300">
          {user.aboutMe}
        </p>
      )}
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
      className={`${color} hover:scale-125 transition-transform duration-200`}
    >
      {icon}
    </Link>
  );

// Social Button Component
const SocialButton = ({ url, icon, text, disabled }) =>
  url &&
  !disabled && (
    <Link to={url} target="_blank" rel="noopener noreferrer">
      <Button className="rounded-full px-6 py-3 gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
        {icon}
        <span>{text}</span>
      </Button>
    </Link>
  );

export default Myself;
