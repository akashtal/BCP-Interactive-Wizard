const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Site', SiteSchema);