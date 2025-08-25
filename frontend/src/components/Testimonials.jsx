import React from 'react'

const data = [
  { name: "Rahul", text: "Scan feature is quick and diet tips are useful!", img: "https://i.pravatar.cc/100?img=12" },
  { name: "Aisha", text: "Loved the simple interface and chatbot.", img: "https://i.pravatar.cc/100?img=33" },
  { name: "Imran", text: "Great for understanding reports without jargon.", img: "https://i.pravatar.cc/100?img=55" }
]

export default function Testimonials(){
  return (
    <div className="container">
      <h2>Testimonials</h2>
      <div className="grid grid-3" style={{marginTop:12}}>
        {data.map((t,i)=>(
          <div className="card" key={i}>
            <img src={t.img} alt={t.name} style={{width:60, height:60, borderRadius:'50%'}} />
            <h4 style={{margin:'8px 0 0 0'}}>{t.name}</h4>
            <p style={{opacity:.9}}>{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
