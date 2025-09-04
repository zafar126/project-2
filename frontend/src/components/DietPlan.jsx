import React, { useState, useEffect } from "react";
import { getDietPlan } from "../services/api.js";

export default function DietPlan() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const dietPlan = await getDietPlan(userId);
        setPlan(dietPlan);
      } catch (err) {
        setError("Failed to load diet plan.");
      } finally {
        setLoading(false);
      }
    };
    fetchDietPlan();
  }, []);

  if (loading) return <div className="text-center p-8 pt-20">Loading...</div>;
  if (error) return <div className="text-center p-8 pt-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-4 pt-20 bg-[url('/public/bg-diet.jpg')] bg-cover bg-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Your Personalized Diet Plan</h2>
        {plan ? (
          <div className="space-y-6">
            {plan.meals.map((meal, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{meal.name}</h3>
                <p className="text-gray-600">{meal.description}</p>
                <ul className="list-disc list-inside mt-3">
                  {meal.recipes.map((recipe, i) => (
                    <li key={i} className="text-gray-700">{recipe}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No diet plan generated. Please scan your reports on the dashboard.</p>
        )}
      </div>
    </div>
  );
}