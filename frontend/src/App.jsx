import React, { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ScanReport from './components/ScanReport.jsx'
import About from './components/About.jsx'
import Testimonials from './components/Testimonials.jsx'
import Doctors from './components/Doctors.jsx'
import Footer from './components/Footer.jsx'

export default function App(){
  const [lng, setLng] = useState(localStorage.getItem('lng') || 'en')
  const navigate = useNavigate()

  return (
    <div>
      <nav className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', gap:16, alignItems:'center'}}>
          <Link to="/" style={{fontWeight:800, letterSpacing:1}}>🩺 HealthCare</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/about">About</Link>
          <Link to="/testimonials">Testimonials</Link>
        </div>
        <div style={{display:'flex', gap:10, alignItems:'center'}}>
          <select value={lng} onChange={(e)=>{setLng(e.target.value); localStorage.setItem('lng', e.target.value); location.reload();}}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ur">Urdu</option>
          </select>
          <button className="button" onClick={()=>navigate('/login')}>Login</button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/scan" element={<ScanReport />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>

      <Footer />
    </div>
  )
}
