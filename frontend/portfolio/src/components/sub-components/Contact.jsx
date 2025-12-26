import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
<<<<<<< HEAD
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
=======
import { Send, Satellite, Radio, SatelliteDish } from "lucide-react";
>>>>>>> 4a73a3b (updated)

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/message/send",
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      setSenderName("");
      setSubject("");
      setMessage("");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section - Consistent with other pages */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Contact Me
        </h1>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full" />
      </div>

      <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 max-w-2xl mx-auto">
        <form onSubmit={handleMessage} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <Label className="text-lg font-medium text-gray-900 dark:text-gray-200">
                Your Name
              </Label>
              <Input
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="John Doe"
                className="py-5 px-4 text-base"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-lg font-medium text-gray-900 dark:text-gray-200">
                Subject
              </Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Regarding your portfolio"
                className="py-5 px-4 text-base"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-lg font-medium text-gray-900 dark:text-gray-200">
                Message
              </Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="min-h-[150px] py-4 px-4 text-base"
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            {!loading ? (
              <Button
                className="w-full sm:w-48 py-6 text-base font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                type="submit"
              >
                SEND MESSAGE
              </Button>
            ) : (
              <Button
                className="w-full sm:w-48 py-6 text-base font-medium"
                disabled
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
=======
    <>
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Satellite dish animations */}
        <div className="absolute -top-20 left-10 w-24 h-24 opacity-50">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 border-2 border-sky-500/30 rounded-full animate-ping"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute inset-4 border-2 border-sky-400/40 rounded-full animate-ping"
              style={{ animationDuration: "4s" }}
            />
            <SatelliteDish
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sky-400"
              size={32}
            />
          </div>
        </div>

        <div className="absolute -top-20 right-10 w-24 h-24 opacity-50">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-ping"
              style={{ animationDuration: "2.5s" }}
            />
            <div
              className="absolute inset-4 border-2 border-blue-400/40 rounded-full animate-ping"
              style={{ animationDuration: "3.5s" }}
            />
            <Radio
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400"
              size={32}
            />
          </div>
        </div>

        {/* Title section with lightning effects */}
        <div className="relative mb-12">
          {/* Background lightning bolts */}
          <div className="absolute -top-12 left-1/4 w-20 h-16">
            <div className="absolute top-0 left-1/2 w-[2px] h-10 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-lightning" />
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-lightning-bolt" />
          </div>

          <div className="absolute -top-12 right-1/4 w-20 h-16">
            <div
              className="absolute top-0 right-1/2 w-[2px] h-10 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-lightning"
              style={{ animationDelay: "0.8s" }}
            />
            <div
              className="absolute top-6 right-1/2 transform translate-x-1/2 w-16 h-[1px] bg-gradient-to-l from-transparent via-sky-400 to-transparent animate-lightning-bolt"
              style={{ animationDelay: "1.3s" }}
            />
          </div>

          <div className="relative">
            <h1 className="flex gap-4 items-center text-[1.85rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] mx-auto w-fit font-tech-heading tracking-[0.2em]">
              <span className="text-tubeLight-effect">CONTACT</span>
              <span className="text-sky-300 font-extrabold">ME</span>
            </h1>

            {/* Electric energy field behind title */}
            <div className="absolute -inset-6 sm:-inset-8 rounded-2xl bg-gradient-to-r from-transparent via-sky-500/10 to-transparent animate-pulse z-[-1]" />

            {/* Spark particles around title */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-sky-400 rounded-full animate-spark"
                style={{
                  top: `${Math.random() * 120 - 10}%`,
                  left: `${Math.random() * 120 - 10}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  boxShadow: "0 0 10px 2px rgba(56, 189, 248, 0.8)",
                }}
              />
            ))}

            {/* Transmission signal line */}
            <div className="absolute w-full h-1 top-12 sm:top-14 md:top-16 lg:top-20 z-[-1]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="relative">
          {/* Grid background effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-900/30 via-blue-900/20 to-gray-900/30 border border-sky-500/20 shadow-xl pointer-events-none">
            {/* Circuit pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
              <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
              <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500 to-transparent" />
              <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500 to-transparent" />
            </div>
          </div>

          <form
            onSubmit={handleMessage}
            className="relative z-10 flex flex-col gap-8 p-6 sm:p-8"
          >
            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name field */}
              <div className="space-y-3 group">
                <Label className="text-lg font-tech-subheading text-sky-300 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  YOUR NAME
                </Label>
                <div className="relative">
                  <Input
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Enter your name"
                    className="glass-space border border-sky-500/30 bg-gray-900/50 text-white placeholder:text-gray-400 h-12 px-4 rounded-lg focus:border-sky-400 focus:ring-2 focus:ring-sky-500/30 transition-all duration-300 group-hover:border-sky-400/50"
                    required
                  />
                  <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Subject field */}
              <div className="space-y-3 group">
                <Label className="text-lg font-tech-subheading text-sky-300 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  MISSION OBJECTIVE
                </Label>
                <div className="relative">
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject of your message"
                    className="glass-space border border-sky-500/30 bg-gray-900/50 text-white placeholder:text-gray-400 h-12 px-4 rounded-lg focus:border-sky-400 focus:ring-2 focus:ring-sky-500/30 transition-all duration-300 group-hover:border-sky-400/50"
                    required
                  />
                  <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Message field */}
            <div className="space-y-3 group">
              <Label className="text-lg font-tech-subheading text-sky-300 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                TRANSMISSION MESSAGE
              </Label>
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="glass-space border border-sky-500/30 bg-gray-900/50 text-white placeholder:text-gray-400 w-full px-4 py-3 rounded-lg focus:border-sky-400 focus:ring-2 focus:ring-sky-500/30 transition-all duration-300 group-hover:border-sky-400/50 min-h-[120px] resize-y"
                  rows="4"
                  required
                />
                <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Character counter */}
              <div className="flex justify-end">
                <span className="text-xs font-tech-mono text-sky-400">
                  {message.length}/500
                </span>
              </div>
            </div>

            {/* Data transmission animation */}
            <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent animate-shimmer" />
              <div className="absolute inset-0 flex">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="h-full w-4 bg-gradient-to-r from-sky-400 to-blue-400 animate-transmission"
                    style={{
                      animationDelay: `${i * 0.5}s`,
                      marginRight: "40px",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-center pt-4">
              {!loading ? (
                <Button
                  type="submit"
                  className="btn-space px-10 py-7 text-lg font-tech-heading tracking-wider relative group overflow-hidden"
>>>>>>> 4a73a3b (updated)
                >
                  {/* Button glow */}
                  <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-sky-500/0 via-sky-500/20 to-sky-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                  {/* Button content */}
                  <div className="flex items-center gap-3 relative z-10">
                    <Send className="group-hover:animate-pulse" />
                    <span>TRANSMIT MESSAGE</span>
                    <Satellite
                      className="group-hover:animate-spin"
                      style={{ animationDuration: "2s" }}
                    />
                  </div>

                  {/* Data stream lines */}
                  <div className="absolute -left-4 top-1/2 w-4 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -right-4 top-1/2 w-4 h-[1px] bg-gradient-to-l from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Sparkle dots */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-0 w-1 h-1 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                      style={{
                        left: `${25 * (i + 1)}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </Button>
              ) : (
                <div className="relative">
                  <button
                    disabled
                    type="button"
                    className="btn-space px-10 py-7 text-lg font-tech-heading tracking-wider relative overflow-hidden flex items-center gap-3"
                  >
                    {/* Transmission animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/30 to-sky-500/0 animate-shimmer" />

                    <div className="relative z-10 flex items-center gap-3">
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-6 h-6 text-sky-300 animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="rgba(56, 189, 248, 0.2)"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>TRANSMITTING...</span>
                      <Satellite
                        className="animate-spin"
                        style={{ animationDuration: "3s" }}
                      />
                    </div>
                  </button>

                  {/* Data transmission dots */}
                  <div className="absolute -top-2 left-1/4 w-1 h-1 bg-sky-400 rounded-full animate-pulse" />
                  <div
                    className="absolute -top-2 left-1/2 w-1 h-1 bg-sky-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <div
                    className="absolute -top-2 left-3/4 w-1 h-1 bg-sky-400 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
<<<<<<< HEAD
                </svg>
                Sending...
              </Button>
            )}
          </div>
        </form>
      </Card>

      <div className="mt-16 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        <p className="mb-4">You can also reach me directly at:</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <div className="flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>your.email@example.com</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>+1 (123) 456-7890</span>
          </div>
        </div>
=======
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Space communication info */}
        <div className="mt-12 text-center font-tech-body text-gray-300">
          <p className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Transmission frequency: 24/7
          </p>
          <p className="text-sm text-gray-400">
            Your message will be received via secure space communication
            protocol
          </p>
        </div>

        {/* Add custom animations */}
        <style jsx>{`
          @keyframes transmission {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            10%,
            90% {
              opacity: 1;
            }
            100% {
              transform: translateX(100vw);
              opacity: 0;
            }
          }

          .animate-transmission {
            animation: transmission 3s linear infinite;
          }

          textarea {
            font-family: "Exo 2", sans-serif;
          }

          textarea:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.3);
          }

          /* Custom scrollbar for textarea */
          textarea::-webkit-scrollbar {
            width: 8px;
          }

          textarea::-webkit-scrollbar-track {
            background: rgba(12, 27, 51, 0.3);
            border-radius: 4px;
          }

          textarea::-webkit-scrollbar-thumb {
            background: linear-gradient(
              to bottom,
              var(--space-blue),
              var(--neon-blue)
            );
            border-radius: 4px;
          }
        `}</style>
>>>>>>> 4a73a3b (updated)
      </div>
    </div>
  );
};

export default Contact;
