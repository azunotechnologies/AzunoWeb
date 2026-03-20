import express from 'express';
import Pricing from '../models/Pricing.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all pricing plans
router.get('/', async (req, res) => {
  try {
    const plans = await Pricing.find({ isActive: true }).sort('order');
    res.json({
      success: true,
      count: plans.length,
      data: plans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get single pricing plan
router.get('/:id', async (req, res) => {
  try {
    const plan = await Pricing.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Pricing plan not found'
      });
    }
    res.json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create pricing plan (admin only)
router.post('/', protect, async (req, res) => {
  try {
    const plan = await Pricing.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Pricing plan created successfully',
      data: plan
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Update pricing plan (admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const plan = await Pricing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Pricing plan not found'
      });
    }
    res.json({
      success: true,
      message: 'Pricing plan updated successfully',
      data: plan
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Delete pricing plan (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const plan = await Pricing.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Pricing plan not found'
      });
    }
    res.json({
      success: true,
      message: 'Pricing plan deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
