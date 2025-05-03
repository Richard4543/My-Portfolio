// import React from 'react';
import { FaTwitch, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-r from-[#cabcb1] to-white">
      {/* Main Content Container */}
      <div className="relative z-10 flex h-full">
        {/* Left Column: Welcome Text */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-xl text-center px-4">
            <h1 className="text-6xl font-bold mb-4 text-gray-800">Welcome</h1>
            <p className="text-xl text-gray-700">Hi, I'm Ricardo.</p>
          </div>
        </div>

        {/* Right Column: Background Image */}
        <div className="flex-1 relative">
          <div
            className="absolute inset-0 bg-cover bg-right"
            style={{ backgroundImage: 'url("/codeBunny.png")' }}
          ></div>
          {/* Optional: You can add an overlay if you want to blend the image with the gradient */}
          {/* <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white opacity-50"></div> */}
        </div>
      </div>

      {/* Vertical Social Media Icons on the Left (Desktop Only) */}
      <div className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-30 flex-col space-y-4">
        <a href="https://www.twitch.tv/freezearrays" className="text-gray-700 hover:text-gray-900">
          <FaTwitch size={20} />
        </a>
        <a href="https://github.com/Richard4543" className="text-gray-700 hover:text-gray-900">
          <FaGithub size={20} />
        </a>
        <a href="https://www.linkedin.com/in/ricardo-hernandez-cs/" className="text-gray-700 hover:text-gray-900">
          <FaLinkedin size={20} />
        </a>
        <a href="https://discord.gg/GdDKNnA2qh" className="text-gray-700 hover:text-gray-900">
          <FaDiscord size={20} />
        </a>
      </div>
    </div>
  );
}
