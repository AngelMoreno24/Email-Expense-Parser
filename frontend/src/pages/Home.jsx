import React, { useState, useEffect } from 'react';
import './cssPages/Home.css';
import ConnectGmailButton from '../components/ConnectGmailButton';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = () => {
    setLoading(true);
    fetch('http://localhost:3000/api/expenses', {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch expenses");
        return res.json();
      })
      .then(data => {
        setExpenses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching expenses:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Your Expenses</h2>
      <button onClick={fetchExpenses} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh Expenses'}
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : expenses.length > 0 ? (
        expenses.map((e, i) => (
          <div key={i}>
            <p>{e.snippet}</p>
            <strong>Amount: ${e.amount}</strong>
            <p>Category: {e.category}</p>
          </div>
        ))
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default Home;