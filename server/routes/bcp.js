const express = require('express');
const router = express.Router();
const BCP = require('../models/BCP');

// Get all BCPs
router.get('/', async (req, res) => {
  try {
    const bcps = await BCP.find().populate('processes.sites').sort({ updatedAt: -1 });
    res.json(bcps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get BCP by ID
router.get('/:id', async (req, res) => {
  try {
    const bcp = await BCP.findById(req.params.id).populate('processes.sites');
    if (!bcp) {
      return res.status(404).json({ message: 'BCP not found' });
    }
    res.json(bcp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new BCP
router.post('/', async (req, res) => {
  try {
    const bcp = new BCP(req.body);
    const savedBCP = await bcp.save();
    res.status(201).json(savedBCP);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update BCP
router.put('/:id', async (req, res) => {
  try {
    const bcp = await BCP.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('processes.sites');
    
    if (!bcp) {
      return res.status(404).json({ message: 'BCP not found' });
    }
    
    res.json(bcp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update specific step
router.patch('/:id/step/:stepNumber', async (req, res) => {
  try {
    const { stepNumber } = req.params;
    const updateData = { ...req.body, currentStep: parseInt(stepNumber) };
    
    const bcp = await BCP.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('processes.sites');
    
    if (!bcp) {
      return res.status(404).json({ message: 'BCP not found' });
    }
    
    res.json(bcp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete BCP
router.delete('/:id', async (req, res) => {
  try {
    const bcp = await BCP.findByIdAndDelete(req.params.id);
    if (!bcp) {
      return res.status(404).json({ message: 'BCP not found' });
    }
    res.json({ message: 'BCP deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;