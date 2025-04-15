import React, { useState, useEffect } from 'react';
import './cssPages/Home.css'; // Optional if you want separate styling
import ConnectGmailButton from '../components/ConnectGmailButton'; // Adjust the path as necessary
const Home = () => {
  
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Call your backend to check if the user's Gmail is connected
    fetch('http://localhost:5173/api/user/status', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setIsConnected(data.gmailConnected));
  }, []);
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome Home</h1>
      <p className="home-subtext">This is your homepage. Here’s some sample content to get started:</p>
      
      <ul className="home-list">
        <li>🏡 Home</li>
        <li>📄 Home</li>
        <li>📌 Home</li>
        <li>📍 Home</li>
        <li>📘 Home</li>
      </ul>
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <ConnectGmailButton isConnected={isConnected} />
    </div>
    </div>
  )
}

export default Home
