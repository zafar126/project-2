import React from 'react'

const doctors = [
  { name: "Dr. Meera Shah", spec: "Dentist", what: "Cavities, braces, root canal, scaling", img: "https://i.pravatar.cc/150?img=8" },
  { name: "Dr. Arjun Verma", spec: "Cardiologist", what: "Heart checkup, ECG, hypertension", img: "https://i.pravatar.cc/150?img=15" },
  { name: "Dr. Sara Khan", spec: "Dermatologist", what: "Acne, eczema, rashes, hair fall", img: "https://i.pravatar.cc/150?img=29" },
  { name: "Dr. Kabir Rao", spec: "Neurologist", what: "Migraines, seizures, neuropathy", img: "https://i.pravatar.cc/150?img=41" },
  { name: "Dr. Neha Patil", spec: "Nutritionist", what: "Diet plans, weight, lifestyle", img: "https://i.pravatar.cc/150?img=63" }
]

export default function Doctors(){
  return (
    <div className="container">
      <h2>Specialist Doctors</h2>
      <div className="grid grid-3" style={{marginTop:12}}>
        {doctors.map((d,i)=>(
          <div className="card" key={i}>
            <img src={d.img} alt={d.name} style={{width:'100%', borderRadius:12}} />
            <h3 style={{marginBottom:6}}>{d.name}</h3>
            <div className="badge">{d.spec}</div>
            <p style={{marginTop:8, opacity:.9}}>{d.what}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
