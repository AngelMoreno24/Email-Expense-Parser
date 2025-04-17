import passport from 'passport';

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.readonly']
});

export const googleCallback = [
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:5173/dashboard')
];

export const logout = (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.sendStatus(200);
    });
  });
};