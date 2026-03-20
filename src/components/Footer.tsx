import { Mail, Linkedin, Twitter, Github, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router';
import { useContent } from '../contexts/ContentContext';
import { Logo } from './Logo';

export function Footer() {
  const { siteSettings } = useContent();

  // Defensive checks for missing data
  if (!siteSettings || !siteSettings.contactInfo || !siteSettings.socialLinks) {
    return null;
  }

  return (
    <footer className="bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800/50 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-slate-600 dark:text-slate-400 max-w-md mb-4">
              {siteSettings.tagline} - Delivering innovative technology solutions that transform businesses.
            </p>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {siteSettings.contactInfo.email && (
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {siteSettings.contactInfo.email}
                </p>
              )}
              {siteSettings.contactInfo.phone && (
                <p>{siteSettings.contactInfo.phone}</p>
              )}
            </div>
            <div className="flex items-center space-x-4 mt-6">
              {siteSettings.socialLinks?.twitter && (
                <a
                  href={siteSettings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Twitter size={20} />
                </a>
              )}
              {siteSettings.socialLinks?.linkedin && (
                <a
                  href={siteSettings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {siteSettings.socialLinks?.github && (
                <a
                  href={siteSettings.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Github size={20} />
                </a>
              )}
              {siteSettings.socialLinks?.facebook && (
                <a
                  href={siteSettings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Facebook size={20} />
                </a>
              )}
              {siteSettings.socialLinks?.instagram && (
                <a
                  href={siteSettings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              {siteSettings.contactInfo.address && (
                <li className="text-slate-600 dark:text-slate-400">
                  {siteSettings.contactInfo.address}
                </li>
              )}
              {siteSettings.contactInfo.email && (
                <li>
                  <a 
                    href={`mailto:${siteSettings.contactInfo.email}`}
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {siteSettings.contactInfo.email}
                  </a>
                </li>
              )}
              {siteSettings.contactInfo.phone && (
                <li>
                  <a 
                    href={`tel:${siteSettings.contactInfo.phone}`}
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {siteSettings.contactInfo.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8 text-center text-slate-600 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} {siteSettings.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}