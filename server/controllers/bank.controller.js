const Bank = require('../models/bank.model'); // Pastikan ada bank.model.js
const Waste = require('../models/waste.model');

exports.listBanks = async (req, res) => {
  try {
    const banks = await Bank.find();
    res.json({ banks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBankDetail = async (req, res) => {
  try {
    const { bankId } = req.params;
    const bank = await Bank.findById(bankId);
    if (!bank) return res.status(404).json({ message: 'Bank not found' });

    res.json({ bank });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.transferWaste = async (req, res) => {
  try {
    const { wasteId, bankId } = req.body;

    const waste = await Waste.findById(wasteId);
    const bank = await Bank.findById(bankId);

    if (!waste || !bank) return res.status(404).json({ message: 'Waste or bank not found' });

    waste.bank = bankId;
    waste.status = 'transferred';
    await waste.save();

    res.json({ message: 'Waste transferred to bank', waste });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};