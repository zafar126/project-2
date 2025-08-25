import React, { useState } from 'react'
import axios from 'axios'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

export default function ScanReport(){
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const upload = async () => {
    if (!file) return alert('Select a file')
    const fd = new FormData()
    fd.append('report', file)
    fd.append('userId', user?.id || 'guest')
    const { data } = await axios.post('http://localhost:5000/api/scan/upload', fd)
    setResult(data)
  }

  const analyzeText = async () => {
    const { data } = await axios.post('http://localhost:5000/api/scan/text', { text, userId: user?.id || 'guest' })
    setResult(data)
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Scan your medical report</h2>
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button className="button" onClick={upload} style={{marginLeft:10}}>Upload & Analyze</button>
        <div style={{marginTop:12, opacity:.8}}>— or — paste text below</div>
        <textarea rows={6} placeholder="Paste report text..." value={text} onChange={e=>setText(e.target.value)} style={{width:'100%', marginTop:8}} />
        <button className="button" onClick={analyzeText}>Analyze Text</button>
      </div>

      {result && (
        <div className="card" style={{marginTop:16}}>
          <h3>Detected conditions</h3>
          <div style={{height:260}}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={result.results.map(r=>({name:r.name, value:r.percent}))} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} label>
                  {result.results.map((_, index)=>(<Cell key={index} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {result.results.map((r, i)=>(
            <div key={i} style={{marginTop:12, borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:12}}>
              <h4 style={{margin:0}}>{r.name} — {r.percent}%</h4>
              <div className="badge">Sleep: {r.sleep}</div>
              <p><b>Risks:</b> {r.risks.join(", ")}</p>
              <p><b>Eat:</b> {r.diet.eat.join(", ")}</p>
              <p><b>Avoid:</b> {r.diet.avoid.join(", ")}</p>
              <p><b>Lifestyle:</b> {r.lifestyle.join("; ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

