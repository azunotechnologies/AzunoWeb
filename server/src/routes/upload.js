import express from 'express';
import multer from 'multer';
import { uploadImage, uploadVideo, uploadPDF, uploadGallery } from '../middleware/upload.js';
import { protect } from '../middleware/auth.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// ==================== MULTER ERROR HANDLER ====================
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err.code, err.message);
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File is too large'
      });
    }
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`
    });
  } else if (err) {
    console.error('Upload error:', err);
    return res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`
    });
  }
  next();
};

// ==================== IMAGE UPLOAD ====================
// @route   POST /api/upload/image
// @desc    Upload single image to Cloudinary
// @access  Protected
router.post('/image', protect, uploadImage.single('image'), handleMulterError, async (req, res) => {
  try {
    console.log('Image upload - File:', req.file ? `${req.file.originalname} (${req.file.size} bytes)` : 'No file');
    console.log('Auth user:', req.user?.email);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    console.log('Upload successful:', req.file.path);
    res.json({
      success: true,
      data: {
        url: req.file.path,
        publicId: req.file.filename,
        fileName: req.file.originalname,
        fileType: 'image',
        folder: req.query.folder || 'images'
      }
    });
  } catch (error) {
    console.error('Image upload handler error:', error);
    res.status(500).json({
      success: false,
      message: 'Upload failed: ' + error.message
    });
  }
});

// ==================== VIDEO UPLOAD ====================
// @route   POST /api/upload/video
// @desc    Upload video to Cloudinary
// @access  Protected
router.post('/video', protect, uploadVideo.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a video file'
      });
    }

    res.json({
      success: true,
      data: {
        url: req.file.path,
        publicId: req.file.filename,
        fileName: req.file.originalname,
        fileType: 'video',
        folder: req.query.folder || 'videos'
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// ==================== PDF UPLOAD ====================
// @route   POST /api/upload/pdf
// @desc    Upload PDF file to Cloudinary
// @access  Protected
router.post('/pdf', protect, uploadPDF.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a PDF file'
      });
    }

    res.json({
      success: true,
      data: {
        url: req.file.path,
        publicId: req.file.filename,
        fileName: req.file.originalname,
        fileType: 'pdf',
        folder: req.query.folder || 'pdfs'
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// ==================== GALLERY UPLOAD ====================
// @route   POST /api/upload/gallery
// @desc    Upload multiple images for gallery
// @access  Protected
router.post('/gallery', protect, uploadGallery.array('images', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one image'
      });
    }

    const images = req.files.map((file, index) => ({
      url: file.path,
      publicId: file.filename,
      fileName: file.originalname,
      order: index,
      caption: req.body[`caption_${index}`] || ''
    }));

    res.json({
      success: true,
      data: {
        images: images,
        count: images.length,
        folder: req.query.folder || 'galleries'
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// ==================== DELETE MEDIA ====================
// @route   DELETE /api/upload/media/:publicId
// @desc    Delete any media file from Cloudinary
// @access  Protected
router.delete('/media/:publicId', protect, async (req, res) => {
  try {
    const { publicId } = req.params;
    const resourceType = req.query.resourceType || 'image';

    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });

    res.json({
      success: true,
      message: 'Media deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ==================== LEGACY ENDPOINT ====================
// @route   POST /api/upload
// @desc    Legacy endpoint - Upload single image to Cloudinary (backward compatibility)
// @access  Protected
router.post('/', protect, uploadImage.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    res.json({
      success: true,
      data: {
        url: req.file.path,
        publicId: req.file.filename,
        folder: req.query.folder || 'images'
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/upload/:publicId
// @desc    Legacy endpoint - Delete image from Cloudinary (backward compatibility)
// @access  Protected
router.delete('/:publicId', protect, async (req, res) => {
  try {
    const { publicId } = req.params;

    await cloudinary.uploader.destroy(publicId);

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ==================== LIST MEDIA BY FOLDER ====================
// @route   GET /api/upload/list/:folder
// @desc    List all media files in a specific folder
// @access  Protected
router.get('/list/:folder', protect, async (req, res) => {
  try {
    const { folder } = req.params;

    // List all images
    const resources = await cloudinary.api.resources({
      type: 'upload',
      max_results: 100,
      direction: 'desc',
      resource_type: 'image'
    });

    console.log(`\n=== LISTING FOLDER: ${folder} ===`);
    console.log('Total images in account:', resources.total_count);

    // Filter to match the requested folder
    const filtered = (resources.resources || []).filter(r => {
      const resourceFolder = r.folder || 'root';
      // Match if folder name is anywhere in the path
      return resourceFolder.includes(folder) || r.public_id.includes(folder);
    });

    console.log(`Images in "${folder}": ${filtered.length}`);

    const media = filtered.map(resource => ({
      url: resource.secure_url,
      publicId: resource.public_id,
      fileName: resource.public_id.split('/').pop(),
      fileType: 'image',
      format: resource.format,
      size: resource.bytes,
      uploadedAt: resource.created_at,
      width: resource.width,
      height: resource.height
    }));

    res.json({
      success: true,
      data: {
        folder: folder,
        count: media.length,
        media: media
      }
    });
  } catch (error) {
    console.error(`Error listing media for ${req.params.folder}:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to list media: ' + error.message
    });
  }
});

// ==================== LIST ALL MEDIA ====================
// @route   GET /api/upload/all
// @desc    List all media files across all azuno folders
// @access  Protected
router.get('/all', protect, async (req, res) => {
  try {
    // Simply list ALL image resources, no filtering
    const resources = await cloudinary.api.resources({
      type: 'upload',
      max_results: 100,
      direction: 'desc',
      resource_type: 'image'
    });

    console.log('=== ALL CLOUDINARY IMAGES ===');
    console.log('Total images in account:', resources.total_count);
    console.log('Returned images:', resources.resources?.length || 0);

    // Log all unique folders
    const allFolders = [...new Set((resources.resources || []).map(r => r.folder || 'NO_FOLDER'))];
    console.log('All folders found:', allFolders);

    // Log first 3 images for debugging
    if (resources.resources?.length > 0) {
      console.log('\nFirst 3 images:');
      resources.resources.slice(0, 3).forEach((r, i) => {
        console.log(`${i + 1}. public_id: ${r.public_id}, folder: ${r.folder || 'NONE'}, url: ${r.secure_url?.substring(0, 60)}...`);
      });
    }

    const media = (resources.resources || []).map(resource => ({
      url: resource.secure_url,
      publicId: resource.public_id,
      fileName: resource.public_id.split('/').pop(),
      fileType: 'image',
      format: resource.format,
      size: resource.bytes,
      uploadedAt: resource.created_at,
      width: resource.width,
      height: resource.height,
      folder: resource.folder ? resource.folder.split('/').pop() : 'root'
    }));

    res.json({
      success: true,
      data: {
        folder: 'all',
        count: media.length,
        media: media
      }
    });
  } catch (error) {
    console.error('Error listing all media:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list media: ' + error.message
    });
  }
});

// ==================== DEBUG - LIST ALL CLOUDINARY FILES ====================
// @route   GET /api/upload/debug/all-files
// @desc    Debug endpoint - list ALL files in Cloudinary (including non-azuno)
// @access  Protected
router.get('/debug/all-files', protect, async (req, res) => {
  try {
    const resources = await cloudinary.search
      .max_results(50)
      .execute();

    const folders = [...new Set(resources.resources.map(r => r.folder || 'root'))];

    res.json({
      success: true,
      data: {
        totalInCloudinary: resources.total_count,
        resourcesReturned: resources.resources.length,
        allFolders: folders,
        resources: resources.resources.map(r => ({
          id: r.public_id,
          folder: r.folder,
          type: r.type,
          resourceType: r.resource_type
        }))
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
