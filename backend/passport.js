// passport.js
import dotenv from 'dotenv';
dotenv.config(); // 👈 add this here

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

if (!process.env.GOOGLE_CLIENT_ID ) {
    console.warn("⚠️ Missing Google OAuth environment variables");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
    console.warn("⚠️⚠️⚠️⚠️ Missing Google OAuth environment variables");
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
  const user = { id: profile.id, accessToken };
  done(null, user);
}));