const mongoose = require('mongoose');

const wasteSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  convertedValue: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['submitted', 'transferred'],
    default: 'submitted',
  },
  bank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bank',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Waste', wasteSchema);