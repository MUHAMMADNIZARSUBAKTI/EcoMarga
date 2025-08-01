const express = require('express');
const router = express.Router();

let wasteList = [
  {
    id: 1,
    type: 'Plastik',
    pricePerKg: 3000,
    description: 'Botol plastik, kantong kresek, dll.'
  },
  {
    id: 2,
    type: 'Kertas',
    pricePerKg: 2000,
    description: 'Kertas koran, kardus, dll.'
  },
  {
    id: 3,
    type: 'Logam',
    pricePerKg: 5000,
    description: 'Kaleng, aluminium, besi tua, dll.'
  }
];

// GET semua jenis sampah
router.get('/', (req, res) => {
  res.json(wasteList);
});

// GET jenis sampah berdasarkan ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const waste = wasteList.find(item => item.id === id);

  if (waste) {
    res.json(waste);
  } else {
    res.status(404).json({ message: 'Jenis sampah tidak ditemukan' });
  }
});

// POST - tambah jenis sampah baru
router.post('/', (req, res) => {
  const { type, pricePerKg, description } = req.body;
  const newWaste = {
    id: wasteList.length + 1,
    type,
    pricePerKg,
    description
  };

  wasteList.push(newWaste);
  res.status(201).json(newWaste);
});

// PUT - update data jenis sampah
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = wasteList.findIndex(item => item.id === id);

  if (index !== -1) {
    const { type, pricePerKg, description } = req.body;
    wasteList[index] = { id, type, pricePerKg, description };
    res.json(wasteList[index]);
  } else {
    res.status(404).json({ message: 'Jenis sampah tidak ditemukan' });
  }
});

// DELETE - hapus jenis sampah
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedList = wasteList.filter(item => item.id !== id);

  if (updatedList.length === wasteList.length) {
    return res.status(404).json({ message: 'Jenis sampah tidak ditemukan' });
  }

  wasteList = updatedList;
  res.json({ message: 'Jenis sampah berhasil dihapus' });
});

module.exports = router;
