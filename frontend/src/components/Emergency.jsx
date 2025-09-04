import React from 'react';
import { Ambulance, PhoneCall } from 'lucide-react';

export default function Emergency() {
  const handleCall = () => {
    window.location.href = "tel:108";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20 bg-[url('/public/bg-emergency.jpg')] bg-cover bg-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center">
        <div className="bg-red-500 text-white p-6 rounded-full inline-block mb-6 animate-pulse">
          <Ambulance size={64} />
        </div>
        <h2 className="text-3xl font-bold text-red-700 mb-2">Emergency Service</h2>
        <p className="text-gray-600 mb-6">
          In case of a medical emergency, you can call an ambulance instantly.
        </p>
        <button
          onClick={handleCall}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition flex items-center justify-center gap-2 mx-auto"
        >
          <PhoneCall size={20} /> Call Ambulance (108)
        </button>
      </div>
    </div>
  );
}