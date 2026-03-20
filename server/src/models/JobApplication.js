import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  careerPostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
    required: [true, 'Career post ID is required']
  },
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  resumeUrl: {
    type: String,
    required: [true, 'Resume URL is required']
  },
  resumePublicId: {
    type: String,
    trim: true
  },
  coverLetter: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'rejected', 'accepted', 'interview_scheduled'],
    default: 'new'
  },
  adminNotes: {
    type: String,
    trim: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

jobApplicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('JobApplication', jobApplicationSchema);
