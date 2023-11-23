// MessageModal.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Modal, Button } from 'react-bootstrap';
import './MessageModal.css'; // Import your CSS file for styling

const MessageModal = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the socket server
    const socketConnection = io('http://localhost:3000/');
    setSocket(socketConnection);

    // Listen for 'message' events from the server
    socketConnection.on('message', (data) => {
      if (data.sender === 'user') {
        // Update sent messages
        setSentMessages((prevMessages) => [...prevMessages, { content: data.content, sender: data.sender }]);
      } else {
        // Update received messages
        setReceivedMessages((prevMessages) => [...prevMessages, { content: data.content, sender: data.sender }]);
      }
    });

    // Clean up the socket connection on component unmount
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      // Emit a 'message' event to the server
      socket.emit('message', { content: message, sender: 'user' });

      // Update sent messages
      setSentMessages((prevMessages) => [...prevMessages, { content: message, sender: 'user' }]);

      // Clear the input field
      setMessage('');
    }
  };

  return (
    <Modal show={true} onHide={onClose} className="message-modal-container">
      <Modal.Header closeButton>
        <Modal.Title>Messages</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="message-container">
          {receivedMessages.map((msg, index) => (
            <div key={index} className={`message received`}>
              <p>{msg.content}</p>
            </div>
          ))}
          {sentMessages.map((msg, index) => (
            <div key={index} className={`message sent`}>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <div className="input-container">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
