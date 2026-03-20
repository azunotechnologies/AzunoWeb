import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';

// Import routes
import authRoutes from './routes/auth.js';
import siteSettingsRoutes from './routes/siteSettings.js';
import heroRoutes from './routes/hero.js';
import servicesRoutes from './routes/services.js';
import projectsRoutes from './routes/projects.js';
import teamRoutes from './routes/team.js';
import blogRoutes from './routes/blog.js';
import testimonialsRoutes from './routes/testimonials.js';
import contactRoutes from './routes/contact.js';
import uploadRoutes from './routes/upload.js';
import pricingRoutes from './routes/pricing.js';
import careersRoutes from './routes/careers.js';
import technologiesRoutes from './routes/technologies.js';
import dataRoutes from './routes/data.js';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== Security & Middleware ====================
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? process.env.CORS_ORIGIN_PRODUCTION?.split(',') || []
  : process.env.CORS_ORIGIN_LOCAL?.split(',') || ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// ==================== Database Connection ====================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// ==================== Seed Demo Admin User ====================
const seedDemoAdmin = async () => {
  try {
    // Import AdminUser model
    const { default: AdminUser } = await import('./models/AdminUser.js');

    // Check if admin user already exists
    const existingAdmin = await AdminUser.findOne({ email: 'admin@example.com' });

    if (!existingAdmin) {
      console.log('🌱 Creating demo admin user...');
      await AdminUser.create({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        active: true
      });
      console.log('✅ Demo admin created: admin@example.com / admin123');
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.warn('⚠️ Could not seed demo admin:', error.message);
  }
};

seedDemoAdmin();

// ==================== Routes ====================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'AZUNO Technologies API is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/site-settings', siteSettingsRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/technologies', technologiesRoutes);
app.use('/api/data', dataRoutes);

// ==================== Error Handling ====================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ==================== Start Server ====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
});

export default app;
