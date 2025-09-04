// // src/components/Register.jsx
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const nav = useNavigate();

//   const submit = async () => {
//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/register`, {
//         name,
//         email,
//         password,
//       });
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       nav("/");
//     } catch (e) {
//       setError(e.response?.data?.error || "Register failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           Create Account
//         </h2>

//         <div className="mt-4">
//           <label className="block text-gray-600 text-sm mb-1">Name</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Your name"
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         <div className="mt-4">
//           <label className="block text-gray-600 text-sm mb-1">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@example.com"
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         <div className="mt-4">
//           <label className="block text-gray-600 text-sm mb-1">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="••••••••"
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//         <div className="mt-6">
//           <button
//             onClick={submit}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
//           >
//             Register
//           </button>
//         </div>

//         <p className="text-center text-gray-500 text-sm mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Back to login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Registration successful!");
      nav("/");
    } catch (e) {
      setError(e.response?.data?.error || "Registration failed");
      toast.error(e.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('/public/bg-register.jpg')] bg-cover bg-center px-4">
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        <div className="mt-4">
          <label className="block text-gray-600 text-sm mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-6">
          <button
            onClick={submit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Register
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}