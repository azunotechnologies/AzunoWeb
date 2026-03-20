import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ctaText: String,
  ctaLink: String,
  backgroundImage: String
}, {
  timestamps: true
});

export default mongoose.model('Hero', heroSchema);
