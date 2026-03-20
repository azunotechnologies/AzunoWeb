import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  challenge: String,
  solution: String,
  results: [String],
  technologies: [String],
  image: String,
  // Gallery images with captions
  galleryImages: [{
    url: String,
    caption: String,
    order: {
      type: Number,
      default: 0
    }
  }],
  // Video URL (Cloudinary hosted or YouTube/Vimeo)
  videoUrl: String,
  // PDF URL for case study
  pdfUrl: String,
  // External URLs
  liveUrl: String,
  caseStudyUrl: String,
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Project', projectSchema);
