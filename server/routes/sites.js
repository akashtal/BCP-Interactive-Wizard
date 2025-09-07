const express = require('express');
const router = express.Router();
const Site = require('../models/Site');

// Get all sites
router.get('/', async (req, res) => {
  try {
    const sites = await Site.find({ isActive: true }).sort({ name: 1 });
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new site
router.post('/', async (req, res) => {
  try {
    const site = new Site(req.body);
    const savedSite = await site.save();
    res.status(201).json(savedSite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update site
router.put('/:id', async (req, res) => {
  try {
    const site = await Site.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }
    
    res.json(site);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;