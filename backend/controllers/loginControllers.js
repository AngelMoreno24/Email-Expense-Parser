

export const login = (req, res) => {
    // Logic for handling login
    const { email, password } = req.body;


    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }

    

    
    res.send("Login successful");
}