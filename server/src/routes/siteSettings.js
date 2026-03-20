import express from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/site-settings
// @desc    Get site settings
// @access  Public
router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      // Create default settings if none exist
      settings = await SiteSettings.create({
        companyName: 'AZUNO Technologies',
        tagline: 'Crafting Digital Excellence',
        contactInfo: {
          email: 'hello@azunotech.com',
          phone: '+1 (555) 123-4567',
          address: '123 Innovation Drive, Tech Valley, CA 94000'
        }
      });
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/site-settings
// @desc    Update site settings
// @access  Protected
router.put('/', protect, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true
      });
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
