const Waste = require('../models/waste.model'); // Pastikan ada waste.model.js

exports.submitWaste = async (req, res) => {
  try {
    const { type, weight, userId } = req.body;

    // Simpan data sampah
    const waste = new Waste({ type, weight, user: userId });
    await waste.save();

    res.status(201).json({ message: 'Waste submitted', waste });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWasteHistory = async (req, res) => {
  try {
    const { userId } = req.user; // Dari JWT verify
    const wastes = await Waste.find({ user: userId });

    res.json({ history: wastes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.convertWaste = async (req, res) => {
  try {
    const { wasteId, conversionRate } = req.body;

    // Cari waste
    const waste = await Waste.findById(wasteId);
    if (!waste) return res.status(404).json({ message: 'Waste not found' });

    const value = waste.weight * conversionRate;
    waste.convertedValue = value;
    await waste.save();

    res.json({ message: 'Waste converted', value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};