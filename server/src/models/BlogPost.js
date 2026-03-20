import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: String,
  tags: [String],
  image: String,
  // Video URL (Cloudinary or YouTube)
  videoUrl: String,
  // Attachments like PDFs, documents
  attachments: [{
    url: String,
    fileName: String,
    fileType: String
  }],
  publishedDate: {
    type: Date,
    default: Date.now
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('BlogPost', blogPostSchema);
