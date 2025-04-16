import dotenv from 'dotenv';
dotenv.config();
console.log("✅ GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

import express from 'express';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session';
import { google } from 'googleapis';

import './passport.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'lax'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.readonly']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:5173/dashboard')
);

// 🆕 Route to check login status
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
});

app.get('/api/expenses', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { accessToken } = req.user;
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: 'v1', auth });
  const result = await gmail.users.messages.list({
    userId: 'me',
    q: 'receipt OR transaction OR payment',
    maxResults: 5
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
app.post('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // Optional: manually clear cookie
      res.sendStatus(200);
    });
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});