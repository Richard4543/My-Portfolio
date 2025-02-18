// import React from 'react';
import { FaTwitch, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="relative bg-gray text-gray-800 pl-20">
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

      {/* Hero / Intro Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-8xl font-bold mb-4 sigmar-regular">About Me</h1>
          <p className="text-lg leading-relaxed mb-4">
            Hi, I’m Ricardo, a creative thinker and problem solver based in California. For a while,
            I’ve been working on personal projects, looking to show I have the ability to develop and deliver.
          </p>
          <p className="text-lg leading-relaxed">
            When I’m not coding, you’ll find me exploring working on automation projects, exploring the outdoors, playing golf, or even gaming (Join my Discord on the left).
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="/me.jpg"  // Ensure this image exists in your public folder
            alt="Profile"
            className="w-64 h-64 object-cover rounded-full mx-auto"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Column: Descriptions with Color-Coded Percentages */}
        <div className="flex flex-col items-start space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">
              Part Coder: <span className="text-blue-500">25%</span>
            </h2>
            <p className="text-gray-700">
              Developer (HTML/CSS, JavaScript, React, Tailwind, Python, Java, C).
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-2">
              Part Engineer: <span className="text-green-500">25%</span>
            </h2>
            <p className="text-gray-700">
              Automation (SCADA, PLCs), Robotics, Servers, Raspberry Pis.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-2">
              Part Gamer: <span className="text-purple-500">10%</span>
            </h2>
            <p className="text-gray-700">
              RPG, FPS, Open-World, Old/New Games.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-2">
              Other: <span className="text-red-500">40%</span>
            </h2>
            <p className="text-gray-700">
              Just going out, enjoying life.
            </p>
          </div>
        </div>

        {/* Right Column: Ring Style Circle with Conic-Gradient */}
        <div className="flex items-center justify-center">
          <div className="relative w-64 h-64 rounded-full">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  #3b82f6 0% 25%,      /* Blue for Part Coder (25%) */
                  #10b981 25% 50%,     /* Green for Part Engineer (25%) */
                  #8b5cf6 50% 60%,     /* Purple for Part Gamer (10%) */
                  #ef4444 60% 100%     /* Red for Other (40%) */
                )`,
              }}
            />
          </div>
        </div>
      </section>



      {/* Skills Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">My Skills</h2>
          <div className="space-y-4">
            {/* Example skill bars */}
            <SkillBar skill="Drinking Coffee" level={85} />
            <SkillBar skill="Coding" level={70} />
            <SkillBar skill="Gaming" level={95} />
            <SkillBar skill="Golf" level={90} />
            <SkillBar skill="Watching Movies/Shows" level={50} />
          </div>
        </div>
      </section>

      {/* Featured / Portfolio Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Here & There</h2>
        <p className="mb-8 text-gray-700">
          I'm happy I've gotten the chance to travel and do things, like golf
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <img
            src="/vacation.jpg"
            alt="Featured 1"
            className="w-64 h-64 object-cover rounded-full mx-auto"
          />
          <img
            src="stadium.jpg"
            alt="Featured 2"
            className="w-64 h-64 object-cover rounded-full mx-auto"
          />
          <img
            src="golf.jpg"
            alt="Featured 3"
            className="w-64 h-64 object-cover rounded-full mx-auto"
          />
        </div>
      </section>

      {/* Random Facts Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Random Facts</h2>
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            <li>I am currently trying to finish all shows/movies for Star Wars.</li>
            <li>I recently purchased my first grill and started to make some mean dishes - yummm.</li>
            <li>Not much of music listener</li>
            <li>I beta testing for games.</li>
            <li>I have a cute dog.</li>
            <li>I love to try new foods.</li>
            <li>I have yet to explore outside the U.S.</li>
            <li>Love to play golf when I get the chance.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/** A simple skill bar component for demonstration. */
function SkillBar({ skill, level }: { skill: string; level: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-medium text-gray-800">{skill}</span>
        <span className="text-gray-600">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}
