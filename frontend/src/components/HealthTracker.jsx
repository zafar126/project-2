import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getUserHealthData } from "../services/api.js";

export default function HealthTracker() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const healthData = await getUserHealthData(userId);
        setData(healthData);
      } catch (err) {
        setError("Failed to load health data.");
      } finally {
        setLoading(false);
      }
    };
    fetchHealthData();
  }, []);

  if (loading) return <div className="text-center p-8 pt-20">Loading...</div>;
  if (error) return <div className="text-center p-8 pt-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-4 pt-20 bg-[url('/public/bg-tracker.jpg')] bg-cover bg-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Health Progress Tracker</h2>
        
        {data.length > 0 ? (
          <>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                  <Line type="monotone" dataKey="sleep" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 text-center text-gray-700">
                <h3 className="text-lg font-semibold">Latest Health Data</h3>
                {/* You can add a table or list here to show latest values */}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No health data available. Start tracking your progress on the dashboard.</p>
        )}
      </div>
    </div>
  );
}