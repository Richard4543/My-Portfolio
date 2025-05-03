// src/pages/homepage/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { FaTwitch, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import '../Sky.css';

interface Fact { text: string; }

export default function HomePage() {
  const [fact, setFact] = useState('');
  const [moonPhase, setMoonPhase] = useState('');
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDay(hour >= 6 && hour < 18);

    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
      .then(res => res.json())
      .then((data: Fact) => setFact(data.text))
      .catch(() => setFact('Could not load a fun fact.'));

    const timestamp = Math.floor(Date.now() / 1000);
    fetch(`https://api.farmsense.net/v1/moonphases/?d=${timestamp}`)
      .then(res => res.json())
      .then((data: any) => setMoonPhase(data[0]?.Phase || 'Unavailable'))
      .catch(() => setMoonPhase('Unavailable'));
  }, []);

  return (
    // Wrapper with gradient background
    <div className="relative overflow-x-hidden bg-gradient-to-r from-[#cabcb1] to-white min-h-screen">
      {/* Sky animation behind everything */}
      <div id="world" className="fixed inset-0 -z-10" />

      {/* All content in front */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center">
          <div className="mx-auto text-center px-4">
            <div className="inline-block bg-white bg-opacity-60 p-6 rounded-lg">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">Welcome</h1>
              <p className="text-xl text-gray-800">Hi, I&apos;m Ricardo.</p>
            </div>
          </div>
        </section>

        {/* Main Content Cards */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-4">
          <div className="bg-gray-800 text-white shadow-lg rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold mb-2">🚀 Latest Project</h2>
            <p className="mb-4">Tag Generator: Quickly generate Tags, UDTs, and sample tags for Ignition 8.1.x.</p>
            <a href="/mywork" className="text-indigo-400 hover:underline">View Details →</a>
          </div>
          <div className="bg-gray-800 text-white shadow-lg rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold mb-2">🎮 Join My Discord</h2>
            <p className="mb-4">Chat, collaborate, and hang out in my Discord server!</p>
            <a
              href="https://discord.gg/GdDKNnA2qh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition-colors"
            >
              Join Now
            </a>
          </div>
          <div className="bg-gray-800 text-white shadow-lg rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold mb-2">💡 Fun Fact</h2>
            <p className="italic mb-4">"{fact}"</p>
            <h2 className="text-2xl font-semibold mb-2">🌙 Moon Phase</h2>
            <p>{moonPhase}</p>
          </div>
        </section>

        {/* Social Sidebar */}
        <aside className="hidden md:flex fixed left-4 top-1/2 transform -translate-y-1/2 flex-col space-y-4 z-30 text-gray-700">
          <a href="https://www.twitch.tv/freezearrays" className="hover:text-indigo-500"><FaTwitch size={24} /></a>
          <a href="https://github.com/Richard4543" className="hover:text-gray-900"><FaGithub size={24} /></a>
          <a href="https://www.linkedin.com/in/ricardo-hernandez-cs/" className="hover:text-blue-500"><FaLinkedin size={24} /></a>
          <a href="https://discord.gg/GdDKNnA2qh" className="hover:text-purple-500"><FaDiscord size={24} /></a>
        </aside>
      </div>
    </div>
  );
}
