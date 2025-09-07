const mongoose = require('mongoose');

const ProcessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Site' }],
  primaryOwner: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  backupOwner: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  }
});

const DependencySchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['Upstream', 'IT', 'Equipment', 'External'],
    required: true 
  },
  description: { type: String, required: true }
});

const HeadcountRequirementSchema = new mongoose.Schema({
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  processId: { type: mongoose.Schema.Types.ObjectId, required: true },
  headcount: { type: Number, required: true }
});

const NotificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['individual', 'group', 'distribution'],
    default: 'individual'
  }
});

const BCPSchema = new mongoose.Schema({
  // Step 1 - Service & Process Capture
  bcpName: { type: String, required: true },
  businessUnit: { type: String },
  subBusinessUnit: { type: String },
  service: {
    name: { type: String, required: true },
    description: { type: String }
  },
  processes: [ProcessSchema],
  
  // Step 2 - Business Impact Analysis
  criticality: {
    timeframe: { type: String, enum: ['Hours', 'Days'], required: true },
    value: { type: Number, required: true }
  },
  headcountRequirements: [HeadcountRequirementSchema],
  dependencies: [DependencySchema],
  
  // Step 3 - Communication
  notifications: [NotificationSchema],
  
  // Step 4 - Risk
  risks: { type: String },
  
  // Metadata
  status: { 
    type: String, 
    enum: ['draft', 'completed'], 
    default: 'draft' 
  },
  currentStep: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

BCPSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('BCP', BCPSchema);