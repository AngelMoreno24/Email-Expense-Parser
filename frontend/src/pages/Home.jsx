import React, { useState, useEffect } from 'react';
import './cssPages/Home.css';
import ConnectGmailButton from '../components/ConnectGmailButton';
import Carousel from 'react-bootstrap/Carousel';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

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

  const [totals, setTotals] = useState({});

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

    const newTotals = {};

    expenses.forEach(e => {
      const category = e.category?.toLowerCase() || "misc";
      if (categories[category]) {
        categories[category].push(e);
      } else {
        categories.misc.push(e);
      }
    });

    for (const key in categories) {
      newTotals[key] = categories[key].reduce((sum, item) => {
        const amount = parseFloat(item.amount);
        return !isNaN(amount) ? sum + amount : sum;
      }, 0);
    }

    setCategorizedExpenses(categories);
    setTotals(newTotals);
  };

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8A2BE2',
    '#FF1493', '#32CD32', '#FF6347', '#00CED1', '#A52A2A'
  ];

  const data = Object.entries(totals)
    .filter(([, total]) => total > 0)
    .map(([category, total]) => ({
      name: category,
      value: total,
    }));

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
            <h3>
              {category.charAt(0).toUpperCase() + category.slice(1)} — Total: ${totals[category]?.toFixed(2) || 0}
            </h3>
            {items.length === 0 ? (
              <p>No {category} expenses</p>
            ) : (
              items.map((e, i) => (
                <div key={i}>
                  <p>{e.snippet}</p>
                  <strong>Amount: ${e.amount}</strong>
                  <p>Category: {e.category}</p>
                </div>
              ))
            )}
          </div>
        ))
      )}

      {!loading && data.length > 0 && (
        <div className="pie-chart-container">
          <h3 className="pie-chart-title">Expense Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value">
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}

      {!loading && data.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          No expenses to display in chart.
        </p>
      )}
    </div>
  );
};

export default Home;