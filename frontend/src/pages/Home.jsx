// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ Import navigate
import './cssPages/Home.css';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ⬅️ Init navigate

  const fetchExpenses = () => {
    setLoading(true);
    fetch('http://localhost:3000/api/expenses', {
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 401) {
          navigate('/'); // ⬅️ Redirect to login page
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch expenses");
        return res.json();
      })
      .then(data => {
        if (data) setExpenses(data);
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
            <strong>Amount: ₹{e.amount}</strong>
          </div>
        ))
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default Home;