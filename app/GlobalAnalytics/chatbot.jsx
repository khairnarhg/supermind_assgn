import React, { useState } from "react";
import "./chatbot.css"; // Add your CSS here for styling
import axios from "axios";

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am SAM, your Social Media Analytics Assistant. I can provide insights on social media optimization and understand different languages. Feel free to ask me anything!",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;
  
    const userMessage = {
      sender: "user",
      text: inputValue.trim(),
    };
  
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setLoading(true);
    setError(false);
  
    try {
      const body = JSON.stringify({
        input_value: inputValue.trim(),
        output_type: "chat",
        input_type: "chat",
        tweaks: {
          "ParseData-fSldE": {},
          "Prompt-cNz6f": {},
          "SplitText-cGsgy": {},
          "ChatOutput-vfG6C": {},
          "AstraDB-XAkqS": {},
          "AstraDB-7T47o": {},
          "File-daAqH": {},
          "Google Generative AI Embeddings-PrUUm": {},
          "Google Generative AI Embeddings-N9HNq": {},
          "GoogleGenerativeAIModel-XoAwW": {},
          "ChatInput-x0eMF": {},
        },
      });

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = process.env.API_AUTH_TOKEN;
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: apiUrl,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        data: body,
      };

      const response = await axios.request(config);
  
      const botMessage = {
        sender: "bot",
        text: response.data.outputs[0].results.message.data.text,
      };
  
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (err) {
      console.error(err);
      setError(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Failed to receive response. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="chatbot-container"      style={{marginBottom: '2rem'}}>
      <div className="chat-space">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}
          >
            {message.text}
          </div>
        ))}
        {loading && <div className="loading-spinner bot-message"></div>}
      </div>
      <div className="input-space">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="chat-input"
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
      {error && <div className="error">Failed to send the message. Try again.</div>}
    </div>
  );
}

export default ChatBot;