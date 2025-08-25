import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  const submit = async () => {
    try{
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      nav('/')
    }catch(e){
      setError(e.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="container" style={{display:'grid', placeItems:'center', minHeight:'60vh'}}>
      <div className="card" style={{width:380}}>
        <h2>Welcome Back</h2>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
        {error && <p style={{color:'#ffb4b4'}}>{error}</p>}
        <div style={{marginTop:12, display:'flex', gap:8}}>
          <button className="button" onClick={submit}>Login</button>
          <Link to="/register" className="badge">Create account</Link>
        </div>
      </div>
    </div>
  )
}
