const express = require('express');
const connectDB = require('./config/db');
const app = express();
const userRoutes = require('./routes/user');
app.use(express.json());

app.use('/user', userRoutes);
app.get('./', (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
})