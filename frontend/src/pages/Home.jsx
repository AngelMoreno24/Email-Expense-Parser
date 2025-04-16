import React, { useState, useEffect } from 'react';
import './cssPages/Home.css'; // Optional if you want separate styling
import ConnectGmailButton from '../components/ConnectGmailButton'; // Adjust the path as necessary
const Home = () => {
  
  const [expenses, setExpenses] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3000/api/expenses', {
      credentials: 'include' // ✅ Send cookies/session
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch expenses");
        return res.json();
      })
      .then(setExpenses)
      .catch(err => {
        console.error("Error fetching expenses:", err);
      });
  }, []);

  return (
    <div>
      <h2>Your Expenses</h2>
      {expenses.map((e, i) => (
        <div key={i}>
          <p>{e.snippet}</p>
          <strong>Amount: ₹{e.amount}</strong>
        </div>
      ))}
    </div>
  )
}

export default Home
