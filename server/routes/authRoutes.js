const express = require('express');
const router = express.Router();

// Dummy handler untuk register
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  res.status(201).json({ message: `User ${username} registered.` });
});

// Dummy handler untuk login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  res.json({ message: `User ${username} logged in.` });
});

module.exports = router;