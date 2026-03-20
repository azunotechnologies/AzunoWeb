import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  bio: String,
  image: String,
  // Portfolio items showcase
  portfolioItems: [{
    image: String,
    title: String,
    description: String,
    order: {
      type: Number,
      default: 0
    }
  }],
  // Resume PDF URL
  pdfResume: String,
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('TeamMember', teamMemberSchema);
