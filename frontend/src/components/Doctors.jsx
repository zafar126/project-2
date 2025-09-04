// import React, { useState } from "react";

// const doctors = [
//   { 
//     name: "Dr. Meera Shah", 
//     spec: "Dentist", 
//     treats: {
//       en: "Treats teeth problems – cavities, braces, gum disease, tooth replacement.",
//       hi: "दाँतों का इलाज – कीड़े लगे दाँत, मसूड़ों की समस्या, दाँत लगवाना।",
//       ur: "دانتوں کا علاج – کیڑا لگنا، مسوڑھوں کی بیماری، دانت لگوانا۔"
//     },
//     img: "https://randomuser.me/api/portraits/women/44.jpg" 
//   },
//   { 
//     name: "Dr. Arjun Verma", 
//     spec: "Cardiologist", 
//     treats: {
//       en: "Treats heart problems – heart attack, blood pressure, cholesterol, ECG.",
//       hi: "दिल का इलाज – हार्ट अटैक, ब्लड प्रेशर, कोलेस्ट्रॉल, ईसीजी।",
//       ur: "دل کا علاج – دل کا دورہ، بلڈ پریشر، کولیسٹرول، ای سی جی۔"
//     },
//     img: "https://randomuser.me/api/portraits/men/46.jpg" 
//   },
//   { 
//     name: "Dr. Sara Khan", 
//     spec: "Dermatologist", 
//     treats: {
//       en: "Treats skin & hair issues – pimples, allergies, rashes, hair fall.",
//       hi: "त्वचा और बालों का इलाज – मुंहासे, एलर्जी, दाने, बाल झड़ना।",
//       ur: "جلد اور بالوں کا علاج – مہاسے، الرجی، دانے، بال جھڑنا۔"
//     },
//     img: "https://randomuser.me/api/portraits/women/65.jpg" 
//   },
//   { 
//     name: "Dr. Kabir Rao", 
//     spec: "Neurologist", 
//     treats: {
//       en: "Treats brain & nerve issues – migraines, epilepsy, strokes, memory loss.",
//       hi: "दिमाग और नसों का इलाज – माइग्रेन, मिर्गी, लकवा, याददाश्त की समस्या।",
//       ur: "دماغ اور اعصاب کا علاج – مائیگرین، مرگی، فالج، یادداشت کی کمی۔"
//     },
//     img: "https://randomuser.me/api/portraits/men/72.jpg" 
//   },
//   { 
//     name: "Dr. Neha Patil", 
//     spec: "Nutritionist", 
//     treats: {
//       en: "Helps with diet, fitness, weight loss, and healthy lifestyle.",
//       hi: "डाइट, फिटनेस, वजन कम करना और हेल्दी जीवनशैली में मदद।",
//       ur: "غذا، فٹنس، وزن کم کرنے اور صحت مند طرز زندگی میں مدد۔"
//     },
//     img: "https://randomuser.me/api/portraits/women/68.jpg" 
//   },
//   { 
//     name: "Dr. Ramesh Iyer", 
//     spec: "Orthopedic", 
//     treats: {
//       en: "Treats bones & joints – fractures, arthritis, knee pain, back pain.",
//       hi: "हड्डियों और जोड़ों का इलाज – फ्रैक्चर, गठिया, घुटनों का दर्द, पीठ दर्द।",
//       ur: "ہڈیوں اور جوڑوں کا علاج – فریکچر، گٹھیا، گھٹنوں کا درد، کمر درد۔"
//     },
//     img: "https://randomuser.me/api/portraits/men/75.jpg" 
//   },
//   { 
//     name: "Dr. Aisha Siddiqui", 
//     spec: "Gynecologist", 
//     treats: {
//       en: "Treats women’s health – pregnancy care, PCOS, periods, fertility.",
//       hi: "महिला स्वास्थ्य – गर्भावस्था देखभाल, पीसीओएस, मासिक धर्म समस्या, प्रजनन।",
//       ur: "خواتین کی صحت – حمل کی دیکھ بھال، پی سی او ایس، حیض کی مسائل، بانجھ پن۔"
//     },
//     img: "https://randomuser.me/api/portraits/women/71.jpg" 
//   },
//   { 
//     name: "Dr. Vikram Singh", 
//     spec: "Pediatrician", 
//     treats: {
//       en: "Takes care of children’s health – vaccines, growth, common illnesses.",
//       hi: "बच्चों का स्वास्थ्य – टीके, विकास, सामान्य बीमारियाँ।",
//       ur: "بچوں کی صحت – ویکسین، نشوونما، عام بیماریاں۔"
//     },
//     img: "https://randomuser.me/api/portraits/men/64.jpg" 
//   },
//   { 
//     name: "Dr. Priya Nair", 
//     spec: "Psychiatrist", 
//     treats: {
//       en: "Helps with mental health – stress, depression, anxiety, therapy.",
//       hi: "मानसिक स्वास्थ्य – तनाव, अवसाद, चिंता, थेरेपी।",
//       ur: "ذہنی صحت – تناؤ، ڈپریشن، بے چینی، تھراپی۔"
//     },
//     img: "https://randomuser.me/api/portraits/women/55.jpg" 
//   },
//   { 
//     name: "Dr. Sameer Gupta", 
//     spec: "General Physician", 
//     treats: {
//       en: "Treats common illnesses – fever, flu, cold, infections.",
//       hi: "सामान्य बीमारियाँ – बुखार, सर्दी-ज़ुकाम, संक्रमण।",
//       ur: "عام بیماریاں – بخار، نزلہ زکام، انفیکشن۔"
//     },
//     img: "https://randomuser.me/api/portraits/men/47.jpg" 
//   },
//   { 
//     name: "Dr. Pooja Sharma", 
//     spec: "ENT Specialist", 
//     treats: {
//       en: "Treats ear, nose, throat issues – sinus, ear infection, tonsils.",
//       hi: "कान, नाक, गले की समस्या – साइनस, कान का संक्रमण, टॉन्सिल।",
//       ur: "کان، ناک، گلے کا علاج – سائنس، کان کا انفیکشن، ٹانسل۔"
//     },
//     img: "https://randomuser.me/api/portraits/women/53.jpg" 
//   },
//   { 
//     name: "Dr. Nitin Chawla", 
//     spec: "Oncologist", 
//     treats: {
//       en: "Specialist for cancer – chemotherapy, tumor treatment.",
//       hi: "कैंसर विशेषज्ञ – कीमोथेरेपी, ट्यूमर का इलाज।",
//       ur: "کینسر کے ماہر – کیموتھراپی، ٹیومر کا علاج۔"
//     },
//     img: "https://randomuser.me/api/portraits/men/50.jpg" 
//   },
//   { 
//     name: "Dr. Farah Ali", 
//     spec: "Endocrinologist", 
//     treats: {
//       en: "Treats hormone issues – diabetes, thyroid, PCOD.",
//       hi: "हार्मोन समस्या – डायबिटीज, थायरॉयड, पीसीओडी।",
//       ur: "ہارمون کے مسائل – ذیابیطس، تھائرائڈ، پی سی او ڈی۔"
//     },
//     img: "https://randomuser.me/api/portraits/women/60.jpg" 
//   },
//   { 
//     name: "Dr. Manish Kumar", 
//     spec: "Urologist", 
//     treats: {
//       en: "Treats kidney & urinary problems – stones, infections.",
//       hi: "गुर्दे और मूत्र की समस्या – पथरी, संक्रमण।",
//       ur: "گردے اور پیشاب کی بیماری – پتھری، انفیکشن۔"
//     },
//     img: "https://randomuser.me/api/portraits/men/59.jpg" 
//   },
//   { 
//     name: "Dr. Shalini Roy", 
//     spec: "Ophthalmologist", 
//     treats: {
//       en: "Treats eye problems – vision, cataract, glasses, LASIK.",
//       hi: "आंखों का इलाज – दृष्टि, मोतियाबिंद, चश्मा, लेसिक।",
//       ur: "آنکھوں کا علاج – نظر، موتیا بند، چشمہ، لیزک۔"
//     },
//     img: "https://randomuser.me/api/portraits/women/64.jpg" 
//   }
// ];

// export default function Doctors() {
//   const [lang] = useState(localStorage.getItem("lng") || "en");

//   return (
//     <div className="container mx-auto p-4 pt-20">
//       <h2 className="text-2xl font-bold text-center mb-6">
//         {lang === "en" && "Specialist Doctors"}
//         {lang === "hi" && "विशेषज्ञ डॉक्टर"}
//         {lang === "ur" && "ماہر ڈاکٹر"}
//       </h2>

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {doctors.map((d, i) => (
//           <div
//             key={i}
//             className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
//           >
//             <img
//               src={d.img}
//               alt={d.name}
//               className="w-full h-40 object-cover rounded-xl mb-4"
//             />
//             <h3 className="text-lg font-semibold">{d.name}</h3>
//             <div className="px-3 py-1 mt-2 text-sm bg-blue-100 text-blue-700 rounded-full">
//               {d.spec}
//             </div>
//             <p className="mt-3 text-gray-600 text-sm">{d.treats[lang]}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Video, MessageCircle } from "lucide-react";

const doctors = [
  { name: "Dr. Meera Shah", spec: "Dentist", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Dr. Arjun Verma", spec: "Cardiologist", img: "https://randomuser.me/api/portraits/men/46.jpg" },
  { name: "Dr. Sara Khan", spec: "Dermatologist", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Dr. Kabir Rao", spec: "Neurologist", img: "https://randomuser.me/api/portraits/men/72.jpg" },
  { name: "Dr. Neha Patil", spec: "Nutritionist", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Dr. Ramesh Iyer", spec: "Orthopedic", img: "https://randomuser.me/api/portraits/men/75.jpg" },
];

export default function Doctors() {
  const [lang] = useState(localStorage.getItem("lng") || "en");

  return (
    <div className="min-h-screen p-4 pt-20 bg-[url('/public/bg-doctors.jpg')] bg-cover bg-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          {lang === "en" && "Specialist Doctors"}
          {lang === "hi" && "विशेषज्ञ डॉक्टर"}
          {lang === "ur" && "ماہر ڈاکٹر"}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-2xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <img
                src={d.img}
                alt={d.name}
                className="w-24 h-24 object-cover rounded-full mb-4 border-2 border-blue-500"
              />
              <h3 className="text-lg font-semibold">{d.name}</h3>
              <div className="px-3 py-1 mt-2 text-sm bg-blue-100 text-blue-700 rounded-full">
                {d.spec}
              </div>
              <div className="flex justify-center gap-3 mt-4">
                <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  <Video size={16} /> Call
                </button>
                <button className="flex items-center gap-1 bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  <MessageCircle size={16} /> Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}