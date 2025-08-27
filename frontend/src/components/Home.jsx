import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import Chatbot from "./Chatbot.jsx";

export default function Home() {
  const nav = useNavigate();
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background Particles */}
      <div className="fixed inset-0 -z-10">
        <Particles
          id="tsparticles"
          options={{
            fpsLimit: 60,
            background: { color: { value: "transparent" } },
            particles: {
              number: { value: 80, density: { enable: true, area: 800 } },
              color: { value: ["#a78bfa", "#22d3ee", "#60a5fa"] },
              links: { enable: true, distance: 120, opacity: 0.2 },
              move: { enable: true, speed: 1.2 },
              opacity: {
                value: 0.6,
                anim: { enable: true, speed: 1, minimumValue: 0.2 },
              },
              size: { value: { min: 1, max: 3 } },
            },
            interactivity: {
              events: { onHover: { enable: true, mode: "repulse" } },
              modes: { repulse: { distance: 100 } },
            },
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-20 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Your Personal Healthcare Assistant
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Scan reports, get disease risk %, diet (fruits/veggies), sleep & lifestyle tips.{" "}
            <span className="font-medium text-gray-800">No medicine suggestions.</span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button
              onClick={() => nav("/scan")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
            >
              Scan Report
            </button>
            <a
              href="#how"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg shadow-md transition"
            >
              How it works
            </a>
          </div>
        </div>

        {/* Steps Section */}
        <div
          id="how"
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10"
        >
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <b className="text-lg">Scan</b>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Upload report image/PDF → OCR → detect keywords.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <b className="text-lg">Analyze</b>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Risk %, diet, sleep, lifestyle, risks.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <b className="text-lg">Chat</b>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Ask anything — chatbot remembers your history.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg transition z-[9999]"
        >
          💬 Need Help?
        </button>
      )}

      {/* Overlay + Chat Window */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex justify-end items-end sm:items-center">
          <Chatbot onClose={() => setShowChat(false)} />
        </div>
      )}
    </div>
  );
}
