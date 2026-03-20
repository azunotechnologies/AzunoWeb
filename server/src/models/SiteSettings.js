import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    default: 'AZUNO Technologies'
  },
  tagline: {
    type: String,
    default: 'Crafting Digital Excellence'
  },
  logo: String,
  favicon: String,
  defaultTheme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'system'
  },
  contactInfo: {
    email: {
      type: String,
      required: true
    },
    phone: String,
    address: String
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String,
    facebook: String,
    instagram: String
  },
  smtpConfig: {
    host: {
      type: String,
      default: 'smtp.gmail.com',
      description: 'SMTP server hostname'
    },
    port: {
      type: Number,
      default: 587,
      description: 'SMTP server port'
    },
    username: {
      type: String,
      description: 'SMTP authentication username'
    },
    password: {
      type: String,
      description: 'SMTP authentication password (encrypted in production)'
    },
    fromEmail: {
      type: String,
      description: 'From email address for outgoing emails'
    },
    fromName: {
      type: String,
      default: 'AZUNO Technologies',
      description: 'From name for outgoing emails'
    },
    isEnabled: {
      type: Boolean,
      default: false,
      description: 'Whether SMTP is configured and enabled'
    }
  },
  pageVisibility: {
    services: {
      type: Boolean,
      default: true
    },
    technologies: {
      type: Boolean,
      default: true
    },
    pricing: {
      type: Boolean,
      default: true
    },
    careers: {
      type: Boolean,
      default: true
    },
    blog: {
      type: Boolean,
      default: true
    },
    portfolio: {
      type: Boolean,
      default: true
    },
    about: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('SiteSettings', siteSettingsSchema);
