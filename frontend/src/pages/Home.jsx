import React, { useState, useEffect } from 'react';
import './cssPages/Home.css';
import ConnectGmailButton from '../components/ConnectGmailButton';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [food, setFood] = useState([]);
  const [transportation, setTransportation] = useState([]);
  const [shopping, setShopping] = useState([]);
  const [bills, setBills] = useState([]);
  const [travel, setTravel] = useState([]);
  const [healthcare, setHealthcare] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [education, setEducation] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [misc, setMisc] = useState([]);

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
    expenses.map(e => {

      if (e.category == "food") {
        setFood(prev => [...prev, e]);
      }

      if (e.category == "transportation") {
        setTransportation(prev => [...prev, e]);
      }

      if (e.category == "shopping") {
        setShopping(prev => [...prev, e]);
      }

      if (e.category == "bills") {
        setBills(prev => [...prev, e]);
      }

      if (e.category == "travel") {
        setTravel(prev => [...prev, e]);
      }

      if (e.category == "healthcare") {
        setHealthcare(prev => [...prev, e]);
      }
      if (e.category == "entertainment") {
        setEntertainment(prev => [...prev, e]);
      }

      if (e.category == "education") {
        setEducation(prev => [...prev, e.category]);
      }

      if (e.category == "gifts") {
        setGifts(prev => [...prev, e.category]);
      }

      if (e.category == "misc") {
        setMisc(prev => [...prev, e.category]);
      }

      // food: ['zomato'
      //transportation:
      //shopping: ['ama
      //bills: ['electr
      //travel: ['hotel
      //healthcare: ['h
      //entertainment: 
      //education: ['co
      //gifts: ['gift',
      //misc: ['miscell
    });
  }
  return (
    <div>
      <h2>Your Expenses</h2>
      <button onClick={fetchExpenses} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh Expenses'}
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : shopping.length > 0 ? (
        shopping.map((e, i) => (
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