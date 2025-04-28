import { useEffect } from 'react';

declare global {
  interface Window {
    Twitch: any;
  }
}

export function LivePage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.twitch.tv/embed/v1.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      if (window.Twitch && window.Twitch.Embed) {
        new window.Twitch.Embed('twitch-embed', {
          width: '100%',
          height: 300,
          channel: 'freezearrays',
          layout: 'video',
          autoplay: false,
        });
      }
    };
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Live</h2>
      <div id="twitch-embed" className="mx-auto w-full max-w-md" />
      <p className="mt-2 text-gray-600">
        The player above shows my live stream when I’m online, or an offline screen otherwise.
      </p>
    </div>
  );
}
