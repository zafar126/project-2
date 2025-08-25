import React from 'react'

export default function Footer(){
  return (
    <div className="footer">
      <div>© {new Date().getFullYear()} HealthCare — Email: support@healthcare.local</div>
      <div style={{marginTop:6, opacity:.7}}>This is an educational demo, not a medical device.</div>
    </div>
  )
}
