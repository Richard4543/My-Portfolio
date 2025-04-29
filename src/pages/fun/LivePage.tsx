import { useEffect } from 'react';

export function LivePage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://embed.twitch.tv/embed/v1.js";
    script.async = true;
    script.onload = () => {
      new (window as any).Twitch.Embed("twitch-embed", {
        width: '100%',
        height: 600,
        channel: "freezearrays", // Replace this if your channel name changes
        layout: "video-with-chat", // Shows the stream and chat side by side
        autoplay: false, // Set true to autoplay the stream when users land
        parent: ["hernandezricardo.com"],
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center text-center overflow-auto p-6"
      style={{
        backgroundImage: "url('/pacman.gif')",
        backgroundSize: '100px 100px',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-xl w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-purple-600 mb-6">🎮 My Twitch Stream 🎮</h1>

        {/* Twitch embed will load here */}
        <div id="twitch-embed"></div>

        {/* Buttons for Twitch & Discord */}
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="https://www.twitch.tv/freezearrays"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
          >
            Visit Twitch
          </a>
          <a
            href="https://discord.gg/GdDKNnA2qh"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Join Discord
          </a>
        </div>
      </div>
    </div>
  );
}
