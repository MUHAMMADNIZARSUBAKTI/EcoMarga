const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  contact: String,
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Bank', bankSchema);