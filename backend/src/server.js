const app = require('./app');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

connectDB();

app.use('/uploads', require('express').static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});