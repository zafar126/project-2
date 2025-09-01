import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

// ✅ API URL from .env
const API_URL = import.meta.env.VITE_API_URL;

export default function Navbar() {
  const navigate = useNavigate();
  const [lng, setLng] = useState(localStorage.getItem("lng") || "en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ track login state

  // ✅ check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLanguageChange = (e) => {
    const newLng = e.target.value;
    setLng(newLng);
    localStorage.setItem("lng", newLng);
    window.location.reload();
  };

  // ✅ handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="w-full shadow-md bg-white fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="font-bold text-lg text-blue-600">
          🩺 HealthCare
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/doctors" className="hover:text-blue-500">
            Doctors
          </Link>
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
          <Link to="/testimonials" className="hover:text-blue-500">
            Testimonials
          </Link>

          {/* Language Dropdown */}
          <select
            value={lng}
            onChange={handleLanguageChange}
            className="border rounded-md px-2 py-1 focus:outline-none"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="ur">اردو</option>
          </select>

          {/* ✅ Show Profile if logged in, else Login */}
          {isLoggedIn ? (
            <div className="flex gap-3 items-center">
              <button
                onClick={() => navigate("/profile")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-2 rounded-lg shadow-md transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start px-6 py-4 bg-white shadow-md border-t">
          <Link
            to="/doctors"
            className="py-2 hover:text-blue-500"
            onClick={() => setMenuOpen(false)}
          >
            Doctors
          </Link>
          <Link
            to="/about"
            className="py-2 hover:text-blue-500"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/testimonials"
            className="py-2 hover:text-blue-500"
            onClick={() => setMenuOpen(false)}
          >
            Testimonials
          </Link>

          <select
            value={lng}
            onChange={handleLanguageChange}
            className="border rounded-md px-2 py-1 my-2 focus:outline-none"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="ur">اردو</option>
          </select>

          {/* ✅ Mobile Profile/Login */}
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition mt-2"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition mt-2"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
