import express from 'express';
import Hero from '../models/Hero.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/hero
// @desc    Get hero content
// @access  Public
router.get('/', async (req, res) => {
  try {
    let hero = await Hero.findOne();

    if (!hero) {
      hero = await Hero.create({
        title: 'AZUNO Technologies',
        subtitle: 'Crafting Digital Excellence',
        description: 'We build cutting-edge web solutions, mobile apps, and AI-powered applications that transform businesses.'
      });
    }

    res.json({
      success: true,
      data: hero
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/hero
// @desc    Update hero content
// @access  Protected
router.put('/', protect, async (req, res) => {
  try {
    let hero = await Hero.findOne();

    if (!hero) {
      hero = await Hero.create(req.body);
    } else {
      hero = await Hero.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true
      });
    }

    res.json({
      success: true,
      data: hero
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
