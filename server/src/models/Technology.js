import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Technology name is required'],
    trim: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Other'],
    required: [true, 'Category is required']
  },
  description: {
    type: String,
    trim: true
  },
  logo: {
    url: String,
    publicId: String
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
    default: 80,
    description: 'Proficiency percentage (0-100)'
  },
  website: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

technologySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Technology', technologySchema);
