// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./components/Home.jsx";
// import Login from "./components/Login.jsx";
// import Register from "./components/Register.jsx";
// import ScanReport from "./components/ScanReport.jsx";
// import About from "./components/About.jsx";
// import Testimonials from "./components/Testimonials.jsx";
// import Doctors from "./components/Doctors.jsx";
// import Footer from "./components/Footer.jsx";
// import Navbar from "./components/Navbar.jsx";   // 👈 New Navbar file import

// export default function App() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar */}
//       <Navbar />

//       {/* Routes */}
//       <main className="flex-1 pt-20">
//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/register" element={<Register />} />
//     <Route path="/scan" element={<ScanReport />} />
//     <Route path="/about" element={<About />} />
//     <Route path="/testimonials" element={<Testimonials />} />
//     <Route path="/doctors" element={<Doctors />} />
//   </Routes>
// </main>


//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }
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
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";
import HealthTracker from "./components/HealthTracker.jsx";
import DietPlan from "./components/DietPlan.jsx";
import CommunityForum from "./components/CommunityForum.jsx";
import Emergency from "./components/Emergency.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/emergency" element={<Emergency />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scan" element={<ScanReport />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/tracker" element={<HealthTracker />} />
            <Route path="/diet-plan" element={<DietPlan />} />
            <Route path="/forum" element={<CommunityForum />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}