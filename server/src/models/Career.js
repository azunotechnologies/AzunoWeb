import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['full-time', 'contract', 'part-time', 'internship'],
    default: 'full-time'
  },
  experience: {
    type: String,
    trim: true,
    description: 'Experience level or years required'
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  requirements: [
    {
      type: String,
      trim: true
    }
  ],
  benefits: [
    {
      type: String,
      trim: true
    }
  ],
  salaryRange: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
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

careerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Career', careerSchema);
