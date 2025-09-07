const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');

// Get all owners
router.get('/', async (req, res) => {
  try {
    const owners = await Owner.find({ isActive: true }).sort({ name: 1 });
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search owners by name or email
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const owners = await Owner.find({
      isActive: true,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    }).sort({ name: 1 });
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new owner
router.post('/', async (req, res) => {
  try {
    const owner = new Owner(req.body);
    const savedOwner = await owner.save();
    res.status(201).json(savedOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;