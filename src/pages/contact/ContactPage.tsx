import React from 'react';

export default function ContactPage() {
  const email = "ricardohernandez4543@gmail.com";

  const handleEmailClick = () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        // Open the user's mail client with a pre-filled subject (optional)
        window.location.href = `mailto:${email}?subject=Portfolio - Hello!`;
      })
      .catch((err) => {
        console.error("Failed to copy email: ", err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Me</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LinkedIn Card */}
          <div 
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
            onClick={() => window.open('https://www.linkedin.com/in/ricardo-hernandez-cs/', '_blank')}
          >
            <h2 className="text-2xl font-semibold mb-4">LinkedIn</h2>
            <p className="text-gray-600 text-center">
              Connect with me on LinkedIn to view my professional journey.
            </p>
          </div>
          {/* Email Card */}
          <div 
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
            onClick={handleEmailClick}
          >
            <h2 className="text-2xl font-semibold mb-4">Email</h2>
            <p className="text-gray-600 text-center">
              Click here to copy my email address and open your mail client.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
