import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [fileId, setFileId] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setFileId(res.data.file_id);
      setChatHistory([{
        sender: "bot",
        text: `Your PDF file,   "${res.data.filename}" is uploaded. Now you can ask questions.`
      }]);
    } catch (err) {
      console.error(err);
      alert("Error uploading PDF: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !fileId) return;

    setChatHistory((prev) => [...prev, { sender: "user", text: message }]);

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message,
        file_id: fileId
      });

      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: res.data.answer },
      ]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error: could not reach backend" },
      ]);
    }

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbox-container">
      <h1 className="chatbox-title">Chat with AskDoc 🤖</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="mb-4"
      />

      <div className="chatbox-history">
        {chatHistory.length === 0 && (
          <p className="chatbox-placeholder">
            Upload a PDF to get started ...
          </p>
        )}

        {chatHistory.map((msg, idx) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={idx}
              className={`chatbox-message ${isUser ? "user" : "bot"}`}
            >
              <div className="avatar">{isUser ? "🧑" : "🤖"}</div>
              <div className="bubble">{msg.text}</div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <form
        className="chatbox-form"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <textarea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="chatbox-textarea"
          disabled={!fileId}
        />
        <button
          type="submit"
          disabled={!message.trim() || !fileId}
          className="chatbox-button"
        >
          Send
        </button>
      </form>
    </div>
  );
}
