

export const login = async (req, res) => {
    // Logic for handling login
    passport.authenticate('google', {
        scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.readonly']
      })
}
 