import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Toggle chat window
  const chatEndRef = useRef(null);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Speech recognition
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Scroll to the latest message
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Update input with transcript
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Send message to Gemini
  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    // Add user message
    const userMessage = { role: 'user', text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    resetTranscript();
    setLoading(true);

    try {
      // Prompt for product suggestions
      const prompt = `You are a product recommendation assistant. The user asked: "${userInput}". Suggest 1-3 relevant products with a short description. Be concise and friendly. If unclear, ask for clarification.`;
      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      // Add bot response
      const botMessage = { role: 'bot', text: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'bot', text: 'Oops, something went wrong. Try again!' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Toggle voice input
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!isOpen ? (
        <button className="chatbot-toggle" onClick={toggleChat}>
          💬
        </button>
      ) : (
        <div className="chatbot">
          <div className="chatbot-header">
            <h3>Chatbot</h3>
            <button className="close-btn" onClick={toggleChat}>
              ×
            </button>
          </div>
          <div className="chat-window">
            {messages.length === 0 ? (
              <p className="welcome">Ask me for product ideas (e.g., "suggest a phone")!</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role}`}>
                  {msg.text}
                </div>
              ))
            )}
            {loading && <p className="loading">Thinking...</p>}
            <div ref={chatEndRef} />
          </div>
          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or speak..."
              disabled={loading}
            />
            <button
              type="button"
              onClick={toggleListening}
              disabled={!SpeechRecognition.browserSupportsSpeechRecognition()}
            >
              {listening ? 'Stop' : 'Mic'}
            </button>
            <button type="submit" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;