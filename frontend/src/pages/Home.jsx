import React, { useState, useEffect } from 'react';
import './cssPages/Home.css';
import ConnectGmailButton from '../components/ConnectGmailButton';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categorizedExpenses, setCategorizedExpenses] = useState({
    food: [],
    transportation: [],
    shopping: [],
    bills: [],
    travel: [],
    healthcare: [],
    entertainment: [],
    education: [],
    gifts: [],
    misc: []
  });

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

  useEffect(() => {
    categorizeExpenses();
  }, [expenses]);

  const categorizeExpenses = () => {
    const categories = {
      food: [],
      transportation: [],
      shopping: [],
      bills: [],
      travel: [],
      healthcare: [],
      entertainment: [],
      education: [],
      gifts: [],
      misc: []
    };

    expenses.forEach(e => {
      const category = e.category?.toLowerCase();
      if (category && categories.hasOwnProperty(category)) {
        categories[category].push(e);
      } else {
        categories.misc.push(e);
      }
    });

    setCategorizedExpenses(categories);
  };

  return (
    <div>
      <h2>Your Expenses</h2>
      <button onClick={fetchExpenses} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh Expenses'}
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        Object.entries(categorizedExpenses).map(([category, items]) => (
          <div key={category}>
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            {items.length === 0 ? (
              <p>No {category} expenses</p>
            ) : (
              items.map((e, i) => (
                <div key={i}>
                  <p>{e.snippet}</p>
                  <strong>Amount: ₹{e.amount}</strong>
                  <p>Category: {e.category}</p>
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Home;