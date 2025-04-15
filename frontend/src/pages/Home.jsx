import React from 'react'
import './cssPages/Home.css'; // Optional if you want separate styling

const Home = () => {
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
    </div>
  )
}

export default Home
