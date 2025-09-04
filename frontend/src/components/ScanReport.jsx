// import React, { useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import { Download, Upload, Loader2 } from "lucide-react";

// export default function ScanReport() {
//   const [file, setFile] = useState(null);
//   const [text, setText] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [lang, setLang] = useState(localStorage.getItem("lng") || "en");

//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

//   const t = {
//     en: {
//       title: "Scan Your Medical Report",
//       or: "— or — paste text below",
//       upload: "Upload & Analyze",
//       analyze: "Analyze Text",
//       noCondition: "No conditions detected.",
//       detected: "Detected Conditions",
//       download: "Download Report",
//     },
//     hi: {
//       title: "अपनी मेडिकल रिपोर्ट स्कैन करें",
//       or: "— या — नीचे टेक्स्ट पेस्ट करें",
//       upload: "अपलोड करें और विश्लेषण करें",
//       analyze: "टेक्स्ट का विश्लेषण करें",
//       noCondition: "कोई बीमारी नहीं मिली।",
//       detected: "पाई गई बीमारियाँ",
//       download: "रिपोर्ट डाउनलोड करें",
//     },
//     ur: {
//       title: "اپنی میڈیکل رپورٹ اسکین کریں",
//       or: "— یا — نیچے متن پیسٹ کریں",
//       upload: "اپلوڈ کریں اور تجزیہ کریں",
//       analyze: "متن کا تجزیہ کریں",
//       noCondition: "کوئی بیماری نہیں ملی۔",
//       detected: "تشخیص شدہ بیماریاں",
//       download: "رپورٹ ڈاؤن لوڈ کریں",
//     },
//   };

//   const upload = async () => {
//     try {
//       if (!file) return alert("Select a file");
//       setLoading(true);
//       const fd = new FormData();
//       fd.append("report", file);
//       fd.append("userId", user?.id || "guest");
//       const { data } = await axios.post("http://localhost:5000/api/scan/upload", fd);
//       setResult(data);
//     } catch (err) {
//       alert(err.response?.data?.error || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const analyzeText = async () => {
//     try {
//       if (!text.trim()) return alert("Enter some text");
//       setLoading(true);
//       const { data } = await axios.post("http://localhost:5000/api/scan/text", { text, userId: user?.id || "guest" });
//       setResult(data);
//     } catch (err) {
//       alert(err.response?.data?.error || "Analysis failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadReport = () => {
//     const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "scan-report.json";
//     a.click();
//   };

//   return (
//     <div className="container mx-auto p-4 pt-20">
//       <div className="bg-white rounded-2xl shadow-md p-6 max-w-2xl mx-auto">
//         <h2 className="text-2xl font-bold text-center mb-6">{t[lang].title}</h2>

//         {/* File Upload */}
//         <div className="flex flex-col items-center border-2 border-dashed rounded-xl p-6 text-center">
//           <input
//             type="file"
//             accept=".pdf,.txt,.doc,.docx,.jpg,.jpeg,.png"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="hidden"
//             id="fileInput"
//           />
//           <label
//             htmlFor="fileInput"
//             className="cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//           >
//             <Upload size={18} /> {file ? file.name : "Choose File / Camera"}
//           </label>

//           <button
//             onClick={upload}
//             disabled={loading}
//             className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2"
//           >
//             {loading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
//             {t[lang].upload}
//           </button>
//         </div>

//         {/* OR Paste Text */}
//         <div className="text-center mt-4 text-gray-500">{t[lang].or}</div>
//         <textarea
//           rows={6}
//           placeholder="Paste report text..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="w-full mt-3 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
//         />
//         <button
//           onClick={analyzeText}
//           disabled={loading}
//           className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
//         >
//           {loading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
//           {t[lang].analyze}
//         </button>
//       </div>

//       {/* Results */}
//       {result && (
//         <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto mt-6">
//           <h3 className="text-xl font-semibold mb-4">{t[lang].detected}</h3>
//           {result?.results?.length > 0 ? (
//             <>
//               <div className="h-64 mb-4">
//                 <ResponsiveContainer>
//                   <PieChart>
//                     <Pie
//                       data={result.results.map((r) => ({ name: r.name, value: r.percent }))}
//                       dataKey="value"
//                       nameKey="name"
//                       innerRadius={50}
//                       outerRadius={90}
//                       label
//                     >
//                       {result.results.map((_, index) => (
//                         <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="space-y-4">
//                 {result.results.map((r, i) => (
//                   <div key={i} className="border rounded-lg p-4 bg-gray-50">
//                     <h4 className="font-semibold">{r.name} — {r.percent}%</h4>
//                     <p className="text-sm text-gray-600 mt-1"><b>Sleep:</b> {r.sleep}</p>
//                     <p className="text-sm"><b>Risks:</b> {r.risks.join(", ")}</p>
//                     <p className="text-sm"><b>Eat:</b> {r.diet.eat.join(", ")}</p>
//                     <p className="text-sm"><b>Avoid:</b> {r.diet.avoid.join(", ")}</p>
//                     <p className="text-sm"><b>Lifestyle:</b> {r.lifestyle.join("; ")}</p>
//                   </div>
//                 ))}
//               </div>

//               <button
//                 onClick={downloadReport}
//                 className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition flex items-center gap-2"
//               >
//                 <Download size={18} /> {t[lang].download}
//               </button>
//             </>
//           ) : (
//             <p className="text-gray-500">{t[lang].noCondition}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Download, Upload, Loader2 } from "lucide-react";

export default function ScanReport() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lang] = useState(localStorage.getItem("lng") || "en");

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  const t = {
    en: {
      title: "Scan Your Medical Report",
      or: "— or — paste text below",
      upload: "Upload & Analyze",
      analyze: "Analyze Text",
      noCondition: "No conditions detected.",
      detected: "Detected Conditions",
      download: "Download Report",
    },
    hi: {
      title: "अपनी मेडिकल रिपोर्ट स्कैन करें",
      or: "— या — नीचे टेक्स्ट पेस्ट करें",
      upload: "अपलोड करें और विश्लेषण करें",
      analyze: "टेक्स्ट का विश्लेषण करें",
      noCondition: "कोई बीमारी नहीं मिली।",
      detected: "पाई गई बीमारियाँ",
      download: "रिपोर्ट डाउनलोड करें",
    },
    ur: {
      title: "اپنی میڈیکل رپورٹ اسکین کریں",
      or: "— یا — نیچے متن پیسٹ کریں",
      upload: "اپلوڈ کریں اور تجزیہ کریں",
      analyze: "متن کا تجزیہ کریں",
      noCondition: "کوئی بیماری نہیں ملی۔",
      detected: "تشخیص شدہ بیماریاں",
      download: "رپورٹ ڈاؤن لوڈ کریں",
    },
  };

  const upload = async () => {
    try {
      if (!file) return alert("Select a file");
      setLoading(true);
      const fd = new FormData();
      fd.append("report", file);
      fd.append("userId", user?.id || "guest");
      const { data } = await axios.post("http://localhost:5000/api/scan/upload", fd);
      setResult(data);
    } catch (err) {
      alert(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const analyzeText = async () => {
    try {
      if (!text.trim()) return alert("Enter some text");
      setLoading(true);
      const { data } = await axios.post("http://localhost:5000/api/scan/text", { text, userId: user?.id || "guest" });
      setResult(data);
    } catch (err) {
      alert(err.response?.data?.error || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scan-report.json";
    a.click();
  };

  return (
    <div className="min-h-screen p-4 pt-20 bg-[url('/public/bg-scan.jpg')] bg-cover bg-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">{t[lang].title}</h2>
        <div className="flex flex-col items-center border-2 border-dashed rounded-xl p-6 text-center">
          <input
            type="file"
            accept=".pdf,.txt,.doc,.docx,.jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <Upload size={18} /> {file ? file.name : "Choose File / Camera"}
          </label>
          <button
            onClick={upload}
            disabled={loading}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
            {t[lang].upload}
          </button>
        </div>
        <div className="text-center mt-4 text-gray-500">{t[lang].or}</div>
        <textarea
          rows={6}
          placeholder="Paste report text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full mt-3 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          onClick={analyzeText}
          disabled={loading}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
          {t[lang].analyze}
        </button>
      </div>

      {result && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6 max-w-3xl mx-auto mt-6">
          <h3 className="text-xl font-semibold mb-4">{t[lang].detected}</h3>
          {result?.results?.length > 0 ? (
            <>
              <div className="h-64 mb-4">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={result.results.map((r) => ({ name: r.name, value: r.percent }))}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={90}
                      label
                    >
                      {result.results.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {result.results.map((r, i) => (
                  <div key={i} className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold">{r.name} — {r.percent}%</h4>
                    <p className="text-sm text-gray-600 mt-1"><b>Summary:</b> {r.summary}</p>
                    <p className="text-sm"><b>Sleep:</b> {r.sleep}</p>
                    <p className="text-sm"><b>Risks:</b> {r.risks.join(", ")}</p>
                    <p className="text-sm"><b>Eat:</b> {r.diet.eat.join(", ")}</p>
                    <p className="text-sm"><b>Avoid:</b> {r.diet.avoid.join(", ")}</p>
                    <p className="text-sm"><b>Lifestyle:</b> {r.lifestyle.join("; ")}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={downloadReport}
                className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition flex items-center gap-2"
              >
                <Download size={18} /> {t[lang].download}
              </button>
            </>
          ) : (
            <p className="text-gray-500">{t[lang].noCondition}</p>
          )}
        </div>
      )}
    </div>
  );
}