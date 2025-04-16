
import express from"express";
import { login } from "../controllers/googleControllers.js";

const router = express.Router();

// Login controller route.
router.get("/",  passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.readonly']
  }));

  router.get("/callback",  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:5173/dashboard')
);


export default router;
