// backend/utils/diseaseDB.js

export const DISEASES = {
  diabetes: {
    name: "Diabetes",
    keywords: ["diabetes", "high sugar", "hba1c", "glucose"],
    risks: ["Vision issues", "Kidney strain", "Nerve damage"],
    diet: {
      eat: ["Oats", "Bitter gourd", "Spinach", "Apple", "Lentils", "Nuts"],
      avoid: ["Sugar", "White bread", "Cola", "Sweets"],
    },
    sleep: "7–8 hours",
    lifestyle: ["30–45 min walk", "Hydration", "Stress control (yoga)"],
    vitaminsNeeded: ["Vitamin D", "Vitamin B12"],
    recommendedVeggies: ["Spinach", "Broccoli", "Beans"],
    doctor: "Endocrinologist",
    dailyRoutine: ["Check sugar levels morning/evening", "Light exercise", "Hydrate well"],
    recoveryTips: ["Avoid sugar spikes", "Follow diet chart"],
  },

  hypertension: {
    name: "High Blood Pressure",
    keywords: ["hypertension", "bp", "blood pressure", "systolic", "diastolic"],
    risks: ["Stroke", "Heart disease", "Kidney damage"],
    diet: {
      eat: ["Banana", "Garlic", "Avocado", "Leafy greens", "Oats"],
      avoid: ["Salt", "Fried foods", "Excess caffeine"],
    },
    sleep: "7–8 hours",
    lifestyle: ["Low-salt diet", "Breathing exercises", "Monitor BP"],
    vitaminsNeeded: ["Magnesium", "Potassium"],
    recommendedVeggies: ["Spinach", "Banana", "Avocado"],
    doctor: "Cardiologist",
    dailyRoutine: ["Morning walk", "Check BP twice a day", "Avoid stress"],
    recoveryTips: ["Reduce salt intake", "Exercise regularly"],
  },

  // ✅ Add more diseases below in the same format
};
