const express = require('express');
//const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
//app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Email Expense Parser Backend!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});