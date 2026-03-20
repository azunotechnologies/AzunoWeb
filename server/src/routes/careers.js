import express from 'express';
import Career from '../models/Career.js';
import JobApplication from '../models/JobApplication.js';
import { protect } from '../middleware/auth.js';
import { uploadPDF } from '../middleware/upload.js';

const router = express.Router();

// ==================== CAREERS ENDPOINTS ====================

// Get all active careers
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find({ isActive: true }).sort('order');
    res.json({
      success: true,
      count: careers.length,
      data: careers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get single career
router.get('/:id', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career posting not found'
      });
    }
    res.json({ success: true, data: career });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create career (admin only)
router.post('/', protect, async (req, res) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Career posting created successfully',
      data: career
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Update career (admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career posting not found'
      });
    }
    res.json({
      success: true,
      message: 'Career posting updated successfully',
      data: career
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Delete career (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career posting not found'
      });
    }
    res.json({
      success: true,
      message: 'Career posting deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ==================== JOB APPLICATIONS ENDPOINTS ====================

// Submit job application with resume
router.post('/:careerId/apply', uploadPDF.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required'
      });
    }

    const { name, email, phone, coverLetter } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required'
      });
    }

    // Verify career post exists
    const career = await Career.findById(req.params.careerId);
    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career posting not found'
      });
    }

    const application = await JobApplication.create({
      careerPostId: req.params.careerId,
      name,
      email,
      phone,
      coverLetter,
      resumeUrl: req.file.path,
      resumePublicId: req.file.filename
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! We will review and get back to you soon.',
      data: application
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get all applications for a career (admin only)
router.get('/:careerId/applications', protect, async (req, res) => {
  try {
    const applications = await JobApplication.find({
      careerPostId: req.params.careerId
    }).sort('-appliedAt');

    res.json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all applications (admin only)
router.get('/admin/all-applications', protect, async (req, res) => {
  try {
    const applications = await JobApplication.find()
      .populate('careerPostId', 'jobTitle department')
      .sort('-appliedAt');

    res.json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update application status (admin only)
router.put('/admin/:applicationId/status', protect, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const application = await JobApplication.findByIdAndUpdate(
      req.params.applicationId,
      { status, adminNotes },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Delete application (admin only)
router.delete('/admin/:applicationId', protect, async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
