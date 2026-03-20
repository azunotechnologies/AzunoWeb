import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// ==================== IMAGE UPLOAD ====================
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folder = req.query.folder || 'images';

    return {
      folder: `azuno/${folder}`,
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
      transformation: [{ width: 2000, height: 2000, crop: 'limit', quality: 'auto' }],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  }
});

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only image files (jpg, png, gif, svg, webp).'), false);
  }
};

export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// ==================== VIDEO UPLOAD ====================
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folder = req.query.folder || 'videos';

    return {
      folder: `azuno/${folder}`,
      resource_type: 'video',
      allowed_formats: ['mp4', 'webm', 'mov', 'avi'],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  }
});

const videoFileFilter = (req, file, cb) => {
  const videoMimes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
  if (videoMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Not a valid video! Please upload only video files (mp4, webm, mov, avi).'), false);
  }
};

export const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// ==================== PDF UPLOAD ====================
const pdfStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folder = req.query.folder || 'pdfs';

    return {
      folder: `azuno/${folder}`,
      resource_type: 'raw',
      allowed_formats: ['pdf'],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  }
});

const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Not a PDF! Please upload only PDF files.'), false);
  }
};

export const uploadPDF = multer({
  storage: pdfStorage,
  fileFilter: pdfFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// ==================== GALLERY UPLOAD (Multiple Images) ====================
const galleryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folder = req.query.folder || 'galleries';

    return {
      folder: `azuno/${folder}`,
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
      transformation: [{ width: 2000, height: 2000, crop: 'limit', quality: 'auto' }],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  }
});

const galleryFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only image files.'), false);
  }
};

export const uploadGallery = multer({
  storage: galleryStorage,
  fileFilter: galleryFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB per image
  }
});

// ==================== LEGACY - Combined Image Upload ====================
// Kept for backward compatibility
export const upload = uploadImage;

