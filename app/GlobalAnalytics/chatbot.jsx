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

  const formatText = (text) => {
    // Add formatting here, for example, replacing '\n' with <br /> for line breaks
    return text.split("\n").map((str, index) => (
      <React.Fragment key={index}>
        {str}
        <br />
      </React.Fragment>
    ));
  };

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
      const body = {
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
      };
  
      const response = await axios.post("api/langflow-main", body);
  
      const botMessage = {
        sender: "bot",
        text: response.data.outputs[0].outputs[0].messages[0].message,
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
            className={`message ${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {message.sender === "bot"
              ? formatText(message.text) 
              : message.text}
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