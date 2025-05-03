// HomePage.tsx
"use client";
import SunMoonAnimations from "../../components/SunMoonAnimation";
import React, { useEffect, useState } from 'react';
import { FaTwitch, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';

interface Fact {
  text: string;
}

export default function HomePage() {
  const [fact, setFact] = useState('');
  const [moonPhase, setMoonPhase] = useState('');
  const [isDay, setIsDay] = useState(true);
  const [time, setTime] = useState(new Date().getHours());
  const [autoTime, setAutoTime] = useState(true);

  useEffect(() => {
    if (autoTime) {
      const updateRealTime = () => {
        const hour = new Date().getHours();
        setTime(hour);
        setIsDay(hour >= 6 && hour < 18);
      };
      updateRealTime();
      const interval = setInterval(updateRealTime, 1000);
      return () => clearInterval(interval);
    }
  }, [autoTime]);

  useEffect(() => {
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
      .then(res => res.json())
      .then((data: Fact) => setFact(data.text))
      .catch(() => setFact('Could not load a fun fact.'));

    const timestamp = Math.floor(Date.now() / 1000);
    fetch(`https://api.farmsense.net/v1/moonphases/?d=${timestamp}`)
      .then(res => res.json())
      .then((data: any) => setMoonPhase(data[0]?.Phase || 'Unavailable'))
      .catch(() => setMoonPhase('Unavailable'));
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value, 10);
    setTime(newTime);
    setIsDay(newTime >= 6 && newTime < 18);
    setAutoTime(false);
  };

  const toggleTimeMode = () => {
    setAutoTime(prev => !prev);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <SunMoonAnimations />
      <div id="world" className="fixed inset-0 w-full h-full z-10"></div>

      <aside className="hidden md:flex fixed left-4 top-1/2 transform -translate-y-1/2 flex-col space-y-4 z-20 text-gray-800">
        <a href="https://www.twitch.tv/freezearrays" className="hover:text-indigo-500"><FaTwitch size={24} /></a>
        <a href="https://github.com/Richard4543" className="hover:text-gray-900"><FaGithub size={24} /></a>
        <a href="https://www.linkedin.com/in/ricardo-hernandez-cs/" className="hover:text-blue-500"><FaLinkedin size={24} /></a>
        <a href="https://discord.gg/GdDKNnA2qh" className="hover:text-purple-500"><FaDiscord size={24} /></a>
      </aside>

{/* bg-black bg-opacity-70 */}
      <section className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className=" p-9 rounded-xl shadow-xl max-w-md text-center">
          <h1 className="text-9xl font-bold text-gray-800">Welcome</h1>
          <p className="text-4xl text-gray-700">Hi, I'm Ricardo.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-4 relative z-10">
        <div className="bg-gray-800 text-white p-6 rounded-lg hover:bg-gray-700 transition-shadow shadow-xl">
          <h2 className="text-2xl font-semibold mb-2">🚀 Latest Project</h2>
          <p>Tag Generator: Quickly generate Tags, UDTs, and sample tags for Ignition 8.1.x.</p>
          <a href="/mywork" className="text-indigo-400 hover:underline">View Details →</a>
        </div>
        <div className="bg-gray-800 text-white p-6 rounded-lg hover:bg-gray-700 transition-shadow shadow-xl">
          <h2 className="text-2xl font-semibold mb-2">🎮 Join My Discord</h2>
          <p>Chat, collaborate, and hang out in my Discord server!</p>
          <a
            href="https://discord.gg/GdDKNnA2qh"
            target="_blank"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition"
          >
            Join Now
          </a>
        </div>
        <div className="bg-gray-800 text-white p-6 rounded-lg hover:bg-gray-700 transition-shadow shadow-xl">
          <h2 className="text-2xl font-semibold mb-2">💡 Fun Fact</h2>
          <p>"{fact}"</p>
          <h2 className="text-2xl font-semibold mt-4 mb-2">🌙 Moon Phase</h2>
          <p>{moonPhase}</p>
        </div>
      </section>
    </div>
  );
}
