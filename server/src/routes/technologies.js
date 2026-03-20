import express from 'express';
import Technology from '../models/Technology.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all active technologies
router.get('/', async (req, res) => {
  try {
    const technologies = await Technology.find({ isActive: true }).sort('order');

    // Group by category
    const groupedByCategory = {};
    technologies.forEach(tech => {
      if (!groupedByCategory[tech.category]) {
        groupedByCategory[tech.category] = [];
      }
      groupedByCategory[tech.category].push(tech);
    });

    res.json({
      success: true,
      count: technologies.length,
      data: technologies,
      groupedByCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get technologies by category
router.get('/category/:category', async (req, res) => {
  try {
    const technologies = await Technology.find({
      category: req.params.category,
      isActive: true
    }).sort('order');

    res.json({
      success: true,
      count: technologies.length,
      data: technologies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get single technology
router.get('/:id', async (req, res) => {
  try {
    const technology = await Technology.findById(req.params.id);
    if (!technology) {
      return res.status(404).json({
        success: false,
        message: 'Technology not found'
      });
    }
    res.json({ success: true, data: technology });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create technology (admin only)
router.post('/', protect, async (req, res) => {
  try {
    const technology = await Technology.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Technology added successfully',
      data: technology
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Update technology (admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const technology = await Technology.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!technology) {
      return res.status(404).json({
        success: false,
        message: 'Technology not found'
      });
    }
    res.json({
      success: true,
      message: 'Technology updated successfully',
      data: technology
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Delete technology (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const technology = await Technology.findByIdAndDelete(req.params.id);
    if (!technology) {
      return res.status(404).json({
        success: false,
        message: 'Technology not found'
      });
    }
    res.json({
      success: true,
      message: 'Technology deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
