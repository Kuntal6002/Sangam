import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

// Mock data for chat groups
const INITIAL_GROUPS = [
  { id: 1, name: 'General', messages: [{id: 1, sender: 'System', content: 'Welcome to General!', timestamp: new Date().toISOString()}] },
  { id: 2, name: 'Random', messages: [{id: 1, sender: 'System', content: 'Welcome to Random!', timestamp: new Date().toISOString()}] },
  { id: 3, name: 'Support', messages: [{id: 1, sender: 'System', content: 'Welcome to Support!', timestamp: new Date().toISOString()}] },
];

function Dashboard() {
  const { user } = useUser();
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [activeGroup, setActiveGroup] = useState(groups[0]);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: user.fullName || user.username || user.id,
      content: message,
      timestamp: new Date().toISOString()
    };

    const updatedGroups = groups.map(group => {
      if (group.id === activeGroup.id) {
        return {
          ...group,
          messages: [...group.messages, newMessage]
        };
      }
      return group;
    });

    setGroups(updatedGroups);
    setActiveGroup(updatedGroups.find(g => g.id === activeGroup.id));
    setMessage('');
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="user-section">
          <UserButton />
          <span className="username">{user.fullName || user.username}</span>
          <Link to="/profile" className="profile-link">Profile</Link>
        </div>
        <h3 className="groups-header">Channels</h3>
        <div className="groups-list">
          {groups.map(group => (
            <div 
              key={group.id} 
              className={`group-item ${activeGroup.id === group.id ? 'active' : ''}`}
              onClick={() => setActiveGroup(group)}
            >
              # {group.name}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-area">
        <div className="chat-header">
          <h2># {activeGroup.name}</h2>
        </div>
        <div className="messages-container">
          {activeGroup.messages.map(msg => (
            <div key={msg.id} className="message">
              <div className="message-header">
                <span className="message-sender">{msg.sender}</span>
                <span className="message-time">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}
        </div>
        <form className="message-input-container" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message #${activeGroup.name}`}
            className="message-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;