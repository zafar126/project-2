import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import Chatbot from "./Chatbot.jsx";
import { useTranslation } from "react-i18next";
import {
  FileScan,
  Handshake,
  HeartPulse,
  Utensils,
  Users,
  Ambulance,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleCtaClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const featureHighlights = [
    {
      icon: <FileScan size={32} />,
      title: t("Scan Reports"),
      description: t(
        "Upload and get detailed analysis of your medical documents."
      ),
      link: "/scan",
    },
    {
      icon: <Handshake size={32} />,
      title: t("Donation & Help"),
      description: t("Donate blood or money to help others in need."),
      link: "/donate",
    },
    {
      icon: <HeartPulse size={32} />,
      title: t("Health Tracker"),
      description: t("Monitor your vital signs, sleep, and activity over time."),
      link: "/tracker",
    },
    {
      icon: <Utensils size={32} />,
      title: t("Personalized Diet"),
      description: t("Receive custom diet plans based on your health reports."),
      link: "/diet-plan",
    },
    {
      icon: <Users size={32} />,
      title: t("Community Forum"),
      description: t("Connect with others, share experiences, and get support."),
      link: "/forum",
    },
    {
      icon: <Ambulance size={32} />,
      title: t("Emergency Services"),
      description: t("Quick access to emergency ambulance services."),
      link: "/emergency",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-black text-white flex flex-col justify-center items-center py-12 px-4 overflow-hidden">
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

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl w-full bg-black/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 text-center my-8">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">
          {t("Your Personal Healthcare Assistant")}
        </h1>
        <p className="text-lg md:text-xl font-light mb-8 max-w-3xl mx-auto animate-fade-in-up">
          {t(
            "Scan reports, get disease risk percentages, personalized diet plans, sleep & lifestyle tips. "
          )}
          <span className="font-semibold text-red-300">
            {t("No medicine suggestions.")}
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={handleCtaClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transition duration-300 transform hover:scale-105 animate-bounce-in"
          >
            {isLoggedIn ? t("Go to Dashboard") : t("Get Started Now")}
          </button>
          <button
            onClick={() => navigate("/donate")}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transition duration-300 transform hover:scale-105"
          >
            {t("Donate & Help")}
          </button>
          <button
            onClick={() => setShowChat(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transition duration-300 transform hover:scale-105"
          >
            {t("Open Chatbot")}
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {featureHighlights.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.link)}
              className="cursor-pointer bg-white/10 p-6 rounded-xl shadow-md flex flex-col items-center hover:bg-white/20 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="text-blue-300 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chatbot Popup */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex justify-center items-end sm:items-center px-2">
          <Chatbot onClose={() => setShowChat(false)} />
        </div>
      )}
    </div>
  );
}
