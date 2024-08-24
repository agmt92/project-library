const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI;
const db = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Connected to database');

module.exports = db;