import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Particles from 'react-tsparticles'
import Chatbot from './Chatbot.jsx'

export default function Home(){
  const nav = useNavigate()
  const [showChat, setShowChat] = useState(false)

  return (
    <div>
      <div style={{position:'fixed', inset:0, zIndex:0}}>
        <Particles
          id="tsparticles"
          options={{
            fpsLimit: 60,
            background: { color: { value: 'transparent' } },
            particles: {
              number: { value: 90, density: { enable: true, area: 800 } },
              color: { value: ["#a78bfa","#22d3ee","#60a5fa"] },
              links: { enable: true, distance: 120, opacity: 0.2 },
              move: { enable: true, speed: 1.2 },
              opacity: { value: 0.6, anim: { enable: true, speed: 1, minimumValue: 0.2 } },
              size: { value: { min: 1, max: 3 } }
            },
            interactivity: { events: { onHover: { enable: true, mode: "repulse" } }, modes: { repulse: { distance: 100 } } }
          }}
        />
      </div>

      <section className="container" style={{position:'relative', zIndex:1, marginTop:40}}>
        <div className="card">
          <h1 style={{fontSize:42, margin:0}}>Your Personal Healthcare Assistant</h1>
          <p style={{opacity:.85, marginTop:10}}>Scan reports, get disease risk %, diet (fruits/veggies), sleep & lifestyle tips. No medicine suggestions.</p>
          <div style={{display:'flex', gap:12, marginTop:16}}>
            <button className="button" onClick={()=>nav('/scan')}>Scan Report</button>
            <a href="#how" className="badge">How it works</a>
          </div>
        </div>

        <div id="how" className="grid grid-3" style={{marginTop:24}}>
          <div className="card"><b>Scan</b><br/>Upload report image/PDF → OCR → detect keywords.</div>
          <div className="card"><b>Analyze</b><br/>Risk %, diet, sleep, lifestyle, risks.</div>
          <div className="card"><b>Chat</b><br/>Ask anything — chatbot remembers your history.</div>
        </div>
      </section>

      <button className="button chat-fab" onClick={()=>setShowChat(v=>!v)}>{showChat? "Close Chat" : "Need Help?"}</button>
      {showChat && <div className="chat-window"><Chatbot /></div>}
    </div>
  )
}
