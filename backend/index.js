const express = require('express');

import loginRoutes from './routes/loginRoutes.js';
//const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
//app.use(bodyParser.json());



app.use("login", loginRoutes);



// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Email Expense Parser Backend!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});