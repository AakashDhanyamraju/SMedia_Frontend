import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const socket = io('http://localhost:9000'); // Replace with your server URL

  useEffect(() => {
    // Socket.io event listeners
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up listeners on component unmount
    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    const message = {
      sender: 'userA', // Replace with actual sender ID
      receiver: 'userB', // Replace with actual receiver ID
      content: inputMessage,
    };

    try {
      // Send the message to the backend route
      await axios.post('http://localhost:9000/chat', message);
    } catch (error) {
      console.error(error);
    }

    setInputMessage('');
  };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <span>{message.sender}: </span>
          <span>{message.content}</span>
        </div>
      ))}

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;
