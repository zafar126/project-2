import React from 'react'

const data = [
  { name: "Rahul", text: "Scan feature is quick and diet tips are useful!", img: "https://i.pravatar.cc/100?img=12" },
  { name: "Aisha", text: "Loved the simple interface and chatbot.", img: "https://i.pravatar.cc/100?img=33" },
  { name: "Imran", text: "Great for understanding reports without jargon.", img: "https://i.pravatar.cc/100?img=55" }
]

export default function Testimonials() {
  return (
    <div className="container text-center">
      <h2 className="text-2xl font-bold">Testimonials</h2>
      <div className="grid gap-6 mt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((t, i) => (
          <div 
            key={i} 
            className="card flex flex-col items-center text-center p-4"
          >
            <img 
              src={t.img} 
              alt={t.name} 
              className="w-16 h-16 rounded-full mb-3"
            />
            <h4 className="text-lg font-semibold">{t.name}</h4>
            <p className="text-sm opacity-80 mt-2">{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
