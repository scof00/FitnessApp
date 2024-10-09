import React, { useState } from 'react';
import './Jym.css'; // Import the CSS file for styling

export const Jym = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText) return;

    // Add user's message to the message thread
    setMessages((prev) => [...prev, { role: 'user', content: inputText }]);
    setIsLoading(true);
    setInputText(''); // Clear input field

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: inputText,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        // Add ChatGPT's response to the message thread
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.choices[0].message.content.trim() },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: "Error: No response from API." }]);
      }
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      setMessages((prev) => [...prev, { role: 'assistant', content: "Error: Could not fetch response. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <form className="input-container" onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message here..."
          rows={2}
          required
        />
        <button type="submit" className="exerciseButton" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </form>
    </div>
  );
};
