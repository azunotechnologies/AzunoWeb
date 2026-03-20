import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import { LogOut, Settings, Home as HomeIcon, Briefcase, FolderOpen, Users, FileText, MessageSquare, Star, Mail, ChevronLeft, ChevronRight, Moon, Sun, Menu, X, Zap, DollarSign, ClipboardList, UserCircle, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { SiteSettingsTab } from './tabs/SiteSettingsTab';
import { HeroTab } from './tabs/HeroTab';
import { ServicesTab } from './tabs/ServicesTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { TeamTab } from './tabs/TeamTab';
import { BlogTab } from './tabs/BlogTab';
import { TestimonialsTab } from './tabs/TestimonialsTab';
import { ContactsTab } from './tabs/ContactsTab';
import { TechnologiesTab } from './tabs/TechnologiesTab';
import { PricingTab } from './tabs/PricingTab';
import { CareersTab } from './tabs/CareersTab';
import { AdminProfileSettings } from './fields/AdminProfileSettings';
import { PageVisibilityTab } from './tabs/PageVisibilityTab';

export function AdminDashboard() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('settings');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { value: 'settings', label: 'Site Settings', icon: Settings },
    { value: 'hero', label: 'Hero Section', icon: HomeIcon },
    { value: 'services', label: 'Services', icon: Briefcase },
    { value: 'projects', label: 'Portfolio', icon: FolderOpen },
    { value: 'team', label: 'Team', icon: Users },
    { value: 'blog', label: 'Blog', icon: FileText },
    { value: 'testimonials', label: 'Testimonials', icon: Star },
    { value: 'technologies', label: 'Technologies', icon: Zap },
    { value: 'pricing', label: 'Pricing', icon: DollarSign },
    { value: 'careers', label: 'Careers', icon: ClipboardList },
    { value: 'contacts', label: 'Contacts', icon: Mail },
    { value: 'page-visibility', label: 'Page Visibility', icon: Eye },
    { value: 'profile', label: 'Admin Profile', icon: UserCircle },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              {/* Logo */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">AZUNO</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Admin Panel</p>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.value;

                  return (
                    <button
                      key={item.value}
                      onClick={() => {
                        setActiveTab(item.value);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Divider */}
              <div className="border-t border-slate-200 dark:border-slate-800" />

              {/* Bottom Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <HomeIcon className="w-5 h-5" />
                  <span className="font-medium text-sm">View Site</span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                  <span className="font-medium text-sm">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium text-sm">Logout</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:block p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {menuItems.find((item) => item.value === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Manage your website content
              </p>
            </div>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </header>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-2 space-y-1"
            >
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.value;

                return (
                  <button
                    key={item.value}
                    onClick={() => {
                      setActiveTab(item.value);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-all text-sm ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'settings' && <SiteSettingsTab />}
              {activeTab === 'hero' && <HeroTab />}
              {activeTab === 'services' && <ServicesTab />}
              {activeTab === 'projects' && <ProjectsTab />}
              {activeTab === 'team' && <TeamTab />}
              {activeTab === 'blog' && <BlogTab />}
              {activeTab === 'testimonials' && <TestimonialsTab />}
              {activeTab === 'technologies' && <TechnologiesTab />}
              {activeTab === 'pricing' && <PricingTab />}
              {activeTab === 'careers' && <CareersTab />}
              {activeTab === 'contacts' && <ContactsTab />}
              {activeTab === 'page-visibility' && <PageVisibilityTab />}
              {activeTab === 'profile' && <AdminProfileSettings />}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

