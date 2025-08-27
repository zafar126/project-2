import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ScanReport from "./components/ScanReport.jsx";
import About from "./components/About.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Doctors from "./components/Doctors.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";   // 👈 New Navbar file import

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <main className="flex-1 pt-20">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/scan" element={<ScanReport />} />
    <Route path="/about" element={<About />} />
    <Route path="/testimonials" element={<Testimonials />} />
    <Route path="/doctors" element={<Doctors />} />
  </Routes>
</main>


      {/* Footer */}
      <Footer />
    </div>
  );
}
