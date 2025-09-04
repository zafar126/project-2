import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Example function to call backend API
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDailyTip = async () => {
  // TODO: Implement API call to fetch a daily health tip from the backend.
  // Example:
  // const { data } = await api.get('/api/tips/daily');
  // return data.tip;
  return "Remember to drink at least 8 glasses of water today!";
};

export const getUserReports = async (userId) => {
  // TODO: Implement API call to fetch all reports for a specific user.
  // Example:
  // const { data } = await api.get(`/api/reports/${userId}`);
  // return data.reports;
  return [
    { id: 1, date: "2024-05-10", type: "Blood Report" },
    { id: 2, date: "2024-04-22", type: "Skin Report" },
  ];
};

export const getUserHealthData = async (userId) => {
  // TODO: Implement API call to fetch user's health tracking data.
  // Example:
  // const { data } = await api.get(`/api/health-data/${userId}`);
  // return data.data;
  return [
    { date: "Jan 1", weight: 70, sleep: 7.5 },
    { date: "Jan 8", weight: 69, sleep: 8.0 },
    { date: "Jan 15", weight: 68, sleep: 7.0 },
  ];
};

export const getDietPlan = async (userId) => {
  // TODO: Implement API call to get a personalized diet plan based on user's reports.
  // Example:
  // const { data } = await api.get(`/api/diet-plan/${userId}`);
  // return data.plan;
  return {
    meals: [
      { name: "Breakfast", description: "Oatmeal with fruits and nuts.", recipes: ["Oats, milk, banana, almonds"] },
      { name: "Lunch", description: "Lentil soup with brown rice.", recipes: ["Lentils, vegetables, brown rice"] },
    ],
  };
};