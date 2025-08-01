const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const wasteRoutes = require('./routes/waste.routes');
const bankRoutes = require('./routes/bank.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/bank', bankRoutes);

module.exports = app;
