import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export default function Chatbot(){
  const [open, setOpen] = useState(true)
  const [input, setInput] = useState("")
  const [msgs, setMsgs] = useState([])
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const listRef = useRef(null)

  useEffect(()=>{
    if(user){
      axios.get(`http://localhost:5000/api/chat/history/${user.id}`).then(({data})=>setMsgs(data))
    }
  }, [])

  useEffect(()=>{
    if(listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [msgs])

  const send = async () => {
    if(!input.trim()) return
    const { data } = await axios.post('http://localhost:5000/api/chat/send', { userId: user?.id || 'guest', message: input })
    setMsgs(m => [...m, { message: input, reply: data.reply, createdAt: data.createdAt }])
    setInput("")
  }

  return (
    <div className="card" style={{height:'100%', display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <b>Assistant</b>
        <button className="badge" onClick={()=>setOpen(o=>!o)}>{open? "−" : "+"}</button>
      </div>
      {open && (
        <>
          <div ref={listRef} style={{flex:1, overflowY:'auto', marginTop:8, paddingRight:4}}>
            {msgs.map((m, i)=>(
              <div key={i} style={{marginBottom:10}}>
                <div><span className="badge">You</span> {m.message}</div>
                <div style={{marginTop:6}}><span className="badge">Bot</span> {m.reply}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about diet, sleep, doctors…" />
            <button className="button" onClick={send}>Send</button>
          </div>
        </>
      )}
    </div>
  )
}
