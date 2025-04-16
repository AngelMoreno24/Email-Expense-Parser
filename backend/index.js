import dotenv from 'dotenv';
dotenv.config(); // Load env vars BEFORE anything else
console.log("✅ GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID); // Should not be undefined

import express from 'express';
import loginRoute from "./routes/loginRoutes.js";
import passport from 'passport';
import cors from 'cors';
import session from 'express-session';
import { google } from 'googleapis';

import './passport.js'; // now this will see the env variables
const app = express();
const PORT = 3000;
 

// Middleware
app.use(express.json()); // Required to parse JSON bodies
app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true
  }));

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/login", loginRoute);





app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.readonly']
  }));
  
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => res.redirect('http://localhost:5173/dashboard')
  );
  
app.get('/api/expenses', async (req, res) => {
    const { accessToken } = req.user;
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
  
    const gmail = google.gmail({ version: 'v1', auth });
    const result = await gmail.users.messages.list({
      userId: 'me',
      q: 'receipt OR transaction OR payment',
      maxResults: 100
    });
  
    const summaries = [];
    for (let m of result.data.messages) {
      const msg = await gmail.users.messages.get({ userId: 'me', id: m.id });
      const snippet = msg.data.snippet;
      const amount = extractAmount(snippet);
      if (amount) summaries.push({ snippet, amount });
    }
  
    res.json(summaries);
});


function extractAmount(text) {
    const match = text.match(/(?:Rs\.?|₹|\$)?\s?(\d{2,7}(?:\.\d{1,2})?)/i);
    return match ? match[1] : null;
  }





app.get('/', (req, res) => {
    res.send('Welcome to the Email Expense Parser Backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});