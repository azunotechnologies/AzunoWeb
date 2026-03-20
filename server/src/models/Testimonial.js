import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  role: String,
  content: {
    type: String,
    required: true
  },
  image: String,
  // Company logo
  companyLogo: String,
  // Video testimonial URL (Cloudinary or YouTube)
  videoUrl: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Testimonial', testimonialSchema);
