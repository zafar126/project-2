import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Chatbot({ onClose }) {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const listRef = useRef(null);

  // Load chat history
  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/api/chat/history/${user.id}`)
        .then(({ data }) => setMsgs(data))
        .catch(() => setMsgs([]));
    }
  }, []);

  // Auto scroll
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [msgs]);

  const send = async () => {
    if (!input.trim()) return;
    const message = input;
    setMsgs((m) => [...m, { message, reply: "..." }]);
    setInput("");

    try {
      const { data } = await axios.post(`${API_URL}/api/chat/send`, {
        userId: user?.id || "guest",
        message,
      });
      setMsgs((m) => {
        const newMsgs = [...m];
        newMsgs[newMsgs.length - 1].reply = data.reply || "No reply";
        return newMsgs;
      });
    } catch {
      setMsgs((m) => {
        const newMsgs = [...m];
        newMsgs[newMsgs.length - 1].reply = "⚠️ Error! Try again.";
        return newMsgs;
      });
    }
  };

  return (
    <div className="bg-gray-900 w-full sm:w-96 h-[70vh] sm:h-[80vh] flex flex-col rounded-xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center bg-green-600 text-white px-4 py-2">
        <b>AI Assistant</b>
        <button
          className="text-xl font-bold hover:text-gray-200"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-800"
      >
        {msgs.map((m, i) => (
          <div key={i} className="flex flex-col gap-1">
            {m.message && (
              <div className="self-end bg-green-600 text-white px-3 py-2 rounded-2xl max-w-[75%] break-words shadow">
                {m.message}
              </div>
            )}
            {m.reply && (
              <div className="self-start bg-gray-700 text-white px-3 py-2 rounded-2xl max-w-[75%] break-words shadow">
                {m.reply}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex p-2 border-t border-gray-700 gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-green-400"
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          onClick={send}
        >
          Send
        </button>
      </div>
    </div>
  );
}
