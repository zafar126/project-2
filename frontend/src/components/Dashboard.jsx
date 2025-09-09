import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Briefcase, Heart, BookOpen, Utensils, Users, Ambulance } from 'lucide-react';
import { getDailyTip, getUserReports } from '../services/api.js';

export default function Dashboard() {
  const [user, setUser] = useState(null);
   const [reports, setReports] = useState([]);
  const [dailyTip, setDailyTip] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      const fetchInitialData = async () => {
        try {
          const tip = await getDailyTip();
          setDailyTip(tip);
          const userReports = await getUserReports(JSON.parse(storedUser).id);
          setReports(userReports);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      };
      fetchInitialData();
    }
  }, []);

  const featureCards = [
    { title: 'Scan Reports', icon: <BookOpen />, path: '/scan', desc: 'Upload and analyze your medical reports.' },
    { title: 'Diet Plan', icon: <Utensils />, path: '/diet-plan', desc: 'Get a personalized diet and recipe plan.' },
    { title: 'Health Tracker', icon: <Heart />, path: '/tracker', desc: 'Track your health progress and vital data.' },
    { title: 'Find Doctors', icon: <Briefcase />, path: '/doctors', desc: 'Find and consult with specialist doctors.' },
    { title: 'Community Forum', icon: <Users />, path: '/forum', desc: 'Share experiences and tips with others.' },
    { title: 'Ambulance', icon: <Ambulance />, path: '/emergency', desc: 'Emergency service with one click.' },
  ];

  if (!user) {
    return <div className="p-4 pt-20 text-center">Please log in to view your dashboard.</div>;
  }

  return (
    <div className="min-h-screen p-4 pt-20 bg-[url('/public/bg-dashboard.jpg')] bg-cover bg-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user.name || user.email}!</h2>
        <p className="text-sm text-gray-600 mb-6">Your personal healthcare hub.</p>

        {dailyTip && (
          <div className="bg-blue-100 text-blue-800 p-4 rounded-lg mb-6">
            <span className="font-semibold">Daily Tip:</span> {dailyTip}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {featureCards.map((card, index) => (
            <Link key={index} to={card.path} className="bg-gray-50 hover:bg-blue-50 transition p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="p-3 bg-blue-500 text-white rounded-full mb-3">{card.icon}</div>
              <h3 className="font-semibold">{card.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{card.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Your Recent Reports</h3>
          {reports.length > 0 ? (
            <ul className="space-y-3">
              {reports.map((report, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
                  <span>Report from {new Date(report.date).toLocaleDateString()}</span>
                  <Link to={`/report/${report.id}`} className="text-blue-600 hover:underline">View</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No reports found. <Link to="/scan" className="text-blue-600 hover:underline">Scan your first report.</Link></p>
          )}
        </div>
      </div>
    </div>
  );
}