const express = require('express');
const app = express();

const connectDB = require('./config/db');
connectDB();

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/role');
app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/role', roleRoutes);
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
})