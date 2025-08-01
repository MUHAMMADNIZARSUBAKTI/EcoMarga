const express = require('express');
const router = express.Router();

// Data dummy bank sampah
let banks = [
  {
    id: 1,
    name: "Bank Sampah Bersih",
    location: "Jl. Kenanga No.5",
    contact: "082112345678"
  },
  {
    id: 2,
    name: "Bank Sampah Maju Jaya",
    location: "Jl. Melati No.10",
    contact: "085612345678"
  }
];

// GET semua data bank sampah
router.get('/', (req, res) => {
  res.json(banks);
});

// GET satu bank berdasarkan ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bank = banks.find(b => b.id === id);
  if (bank) {
    res.json(bank);
  } else {
    res.status(404).json({ message: 'Bank tidak ditemukan' });
  }
});

// POST - tambah bank baru
router.post('/', (req, res) => {
  const { name, location, contact } = req.body;
  const newBank = {
    id: banks.length + 1,
    name,
    location,
    contact
  };
  banks.push(newBank);
  res.status(201).json(newBank);
});

// PUT - edit data bank
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = banks.findIndex(b => b.id === id);
  if (index !== -1) {
    const { name, location, contact } = req.body;
    banks[index] = { id, name, location, contact };
    res.json(banks[index]);
  } else {
    res.status(404).json({ message: 'Bank tidak ditemukan' });
  }
});

// DELETE - hapus bank
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  banks = banks.filter(b => b.id !== id);
  res.json({ message: 'Bank berhasil dihapus' });
});

module.exports = router;
