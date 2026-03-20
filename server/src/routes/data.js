import express from 'express';
import { protect } from '../middleware/auth.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import TeamMember from '../models/TeamMember.js';
import BlogPost from '../models/BlogPost.js';
import Testimonial from '../models/Testimonial.js';
import SiteSettings from '../models/SiteSettings.js';
import Hero from '../models/Hero.js';
import ContactSubmission from '../models/ContactSubmission.js';

const router = express.Router();

// Initialize/migrate data from localStorage dump (admin only)
router.post('/initialize', protect, async (req, res) => {
  try {
    const {
      siteSettings = {},
      heroContent = {},
      services = [],
      projects = [],
      teamMembers = [],
      blogPosts = [],
      testimonials = [],
      contactSubmissions = []
    } = req.body;

    // Track what was created
    const results = {};

    // Migrate Site Settings
    if (Object.keys(siteSettings).length > 0) {
      try {
        let existingSettings = await SiteSettings.findOne();
        if (existingSettings) {
          await SiteSettings.updateOne({}, siteSettings);
          results.siteSettings = 'Updated existing settings';
        } else {
          await SiteSettings.create(siteSettings);
          results.siteSettings = 'Created new settings';
        }
      } catch (error) {
        results.siteSettings = `Error: ${error.message}`;
      }
    }

    // Migrate Hero Content
    if (Object.keys(heroContent).length > 0) {
      try {
        let existingHero = await Hero.findOne();
        if (existingHero) {
          await Hero.updateOne({}, heroContent);
          results.heroContent = 'Updated existing hero';
        } else {
          await Hero.create(heroContent);
          results.heroContent = 'Created new hero';
        }
      } catch (error) {
        results.heroContent = `Error: ${error.message}`;
      }
    }

    // Migrate Services
    if (services.length > 0) {
      try {
        await Service.deleteMany({}); // Clear existing
        await Service.insertMany(services);
        results.services = `Migrated ${services.length} services`;
      } catch (error) {
        results.services = `Error: ${error.message}`;
      }
    }

    // Migrate Projects
    if (projects.length > 0) {
      try {
        await Project.deleteMany({}); // Clear existing
        await Project.insertMany(projects);
        results.projects = `Migrated ${projects.length} projects`;
      } catch (error) {
        results.projects = `Error: ${error.message}`;
      }
    }

    // Migrate Team Members
    if (teamMembers.length > 0) {
      try {
        await TeamMember.deleteMany({}); // Clear existing
        await TeamMember.insertMany(teamMembers);
        results.teamMembers = `Migrated ${teamMembers.length} team members`;
      } catch (error) {
        results.teamMembers = `Error: ${error.message}`;
      }
    }

    // Migrate Blog Posts
    if (blogPosts.length > 0) {
      try {
        await BlogPost.deleteMany({}); // Clear existing
        await BlogPost.insertMany(blogPosts);
        results.blogPosts = `Migrated ${blogPosts.length} blog posts`;
      } catch (error) {
        results.blogPosts = `Error: ${error.message}`;
      }
    }

    // Migrate Testimonials
    if (testimonials.length > 0) {
      try {
        await Testimonial.deleteMany({}); // Clear existing
        await Testimonial.insertMany(testimonials);
        results.testimonials = `Migrated ${testimonials.length} testimonials`;
      } catch (error) {
        results.testimonials = `Error: ${error.message}`;
      }
    }

    // Migrate Contact Submissions
    if (contactSubmissions.length > 0) {
      try {
        await ContactSubmission.insertMany(contactSubmissions);
        results.contactSubmissions = `Migrated ${contactSubmissions.length} submissions`;
      } catch (error) {
        results.contactSubmissions = `Error: ${error.message}`;
      }
    }

    res.json({
      success: true,
      message: 'Data migration completed',
      results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Migration failed',
      error: error.message
    });
  }
});

// Get all data (public - everyone needs access to site content)
router.get('/all', async (req, res) => {
  try {
    const data = {
      siteSettings: await SiteSettings.findOne(),
      heroContent: await Hero.findOne(),
      services: await Service.find(),
      projects: await Project.find(),
      teamMembers: await TeamMember.find(),
      blogPosts: await BlogPost.find(),
      testimonials: await Testimonial.find()
    };

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ==================== UPDATE ENDPOINTS (ADMIN ONLY) ====================

// Update Services
router.put('/services', protect, async (req, res) => {
  try {
    const { services } = req.body;

    if (!Array.isArray(services)) {
      return res.status(400).json({
        success: false,
        message: 'Services must be an array'
      });
    }

    await Service.deleteMany({});
    await Service.insertMany(services);

    res.json({
      success: true,
      message: 'Services updated successfully',
      count: services.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update services',
      error: error.message
    });
  }
});

// Update Projects
router.put('/projects', protect, async (req, res) => {
  try {
    const { projects } = req.body;

    if (!Array.isArray(projects)) {
      return res.status(400).json({
        success: false,
        message: 'Projects must be an array'
      });
    }

    await Project.deleteMany({});
    await Project.insertMany(projects);

    res.json({
      success: true,
      message: 'Projects updated successfully',
      count: projects.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update projects',
      error: error.message
    });
  }
});

// Update Team Members
router.put('/team-members', protect, async (req, res) => {
  try {
    const { teamMembers } = req.body;

    if (!Array.isArray(teamMembers)) {
      return res.status(400).json({
        success: false,
        message: 'Team members must be an array'
      });
    }

    await TeamMember.deleteMany({});
    await TeamMember.insertMany(teamMembers);

    res.json({
      success: true,
      message: 'Team members updated successfully',
      count: teamMembers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update team members',
      error: error.message
    });
  }
});

// Update Testimonials
router.put('/testimonials', protect, async (req, res) => {
  try {
    const { testimonials } = req.body;

    if (!Array.isArray(testimonials)) {
      return res.status(400).json({
        success: false,
        message: 'Testimonials must be an array'
      });
    }

    await Testimonial.deleteMany({});
    await Testimonial.insertMany(testimonials);

    res.json({
      success: true,
      message: 'Testimonials updated successfully',
      count: testimonials.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update testimonials',
      error: error.message
    });
  }
});

// Update Blog Posts
router.put('/blog-posts', protect, async (req, res) => {
  try {
    const { blogPosts } = req.body;

    if (!Array.isArray(blogPosts)) {
      return res.status(400).json({
        success: false,
        message: 'Blog posts must be an array'
      });
    }

    await BlogPost.deleteMany({});
    await BlogPost.insertMany(blogPosts);

    res.json({
      success: true,
      message: 'Blog posts updated successfully',
      count: blogPosts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update blog posts',
      error: error.message
    });
  }
});

// Update Hero Content
router.put('/hero', protect, async (req, res) => {
  try {
    const heroData = req.body;

    let hero = await Hero.findOne();
    if (hero) {
      await Hero.updateOne({}, heroData);
    } else {
      await Hero.create(heroData);
    }

    res.json({
      success: true,
      message: 'Hero content updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update hero content',
      error: error.message
    });
  }
});

// Update Site Settings
router.put('/site-settings', protect, async (req, res) => {
  try {
    const settingsData = req.body;

    let settings = await SiteSettings.findOne();
    if (settings) {
      await SiteSettings.updateOne({}, settingsData);
    } else {
      await SiteSettings.create(settingsData);
    }

    res.json({
      success: true,
      message: 'Site settings updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update site settings',
      error: error.message
    });
  }
});

// Clear all data (admin only - use with caution!)
router.post('/clear', protect, async (req, res) => {
  try {
    const { confirmClear } = req.body;

    if (confirmClear !== 'CLEAR_ALL_DATA') {
      return res.status(400).json({
        success: false,
        message: 'Confirmation code incorrect'
      });
    }

    const results = {
      services: await Service.deleteMany({}),
      projects: await Project.deleteMany({}),
      teamMembers: await TeamMember.deleteMany({}),
      blogPosts: await BlogPost.deleteMany({}),
      testimonials: await Testimonial.deleteMany({}),
      contactSubmissions: await ContactSubmission.deleteMany({})
    };

    res.json({
      success: true,
      message: 'All data cleared successfully',
      deletedCounts: {
        services: results.services.deletedCount,
        projects: results.projects.deletedCount,
        teamMembers: results.teamMembers.deletedCount,
        blogPosts: results.blogPosts.deletedCount,
        testimonials: results.testimonials.deletedCount,
        contactSubmissions: results.contactSubmissions.deletedCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
