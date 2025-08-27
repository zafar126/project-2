import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      title: "Healthcare Assistant",
      cta: "Scan Report",
      login: "Login",
      register: "Register",
      needHelp: "Do you need help?",
    },
  },
  hi: {
    translation: {
      title: "हेल्थकेयर असिस्टेंट",
      cta: "रिपोर्ट स्कैन करें",
      login: "लॉगिन",
      register: "रजिस्टर",
      needHelp: "क्या आपको मदद चाहिए?",
    },
  },
  ur: {
    translation: {
      title: "ہیلتھ کیئر اسسٹنٹ",
      cta: "رپورٹ اسکین کریں",
      login: "لاگ ان",
      register: "رجسٹر",
      needHelp: "کیا آپ کو مدد چاہیے؟",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lng") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
