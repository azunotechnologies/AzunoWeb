import React, { useState, useEffect } from 'react';
import { useContent } from '../../../contexts/ContentContext';
import { Button } from '../../ui/button';
import { Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface PageVisibility {
  services: boolean;
  technologies: boolean;
  pricing: boolean;
  careers: boolean;
  blog: boolean;
  portfolio: boolean;
  about: boolean;
}

export function PageVisibilityTab() {
  const { siteSettings, updateSiteSettings } = useContent();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<PageVisibility>({
    services: true,
    technologies: true,
    pricing: true,
    careers: true,
    blog: true,
    portfolio: true,
    about: true
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    if (siteSettings?.pageVisibility) {
      setForm(siteSettings.pageVisibility);
    }
  }, [siteSettings]);

  const pages = [
    { key: 'services' as keyof PageVisibility, label: 'Services', description: 'Showcase your services' },
    { key: 'technologies' as keyof PageVisibility, label: 'Technologies', description: 'Display tech stack' },
    { key: 'pricing' as keyof PageVisibility, label: 'Pricing', description: 'Show pricing plans' },
    { key: 'careers' as keyof PageVisibility, label: 'Careers', description: 'Job opportunities' },
    { key: 'blog' as keyof PageVisibility, label: 'Blog', description: 'Blog posts and articles' },
    { key: 'portfolio' as keyof PageVisibility, label: 'Portfolio', description: 'Project showcase' },
    { key: 'about' as keyof PageVisibility, label: 'About', description: 'Company information' }
  ];

  const handleToggle = (key: keyof PageVisibility) => {
    setForm(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!siteSettings) {
        setError('Site settings not loaded');
        return;
      }

      await updateSiteSettings({
        ...siteSettings,
        pageVisibility: form
      });

      setSuccess('Page visibility settings updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update page visibility');
      toast.error('Failed to update page visibility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Page Visibility</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Control which pages are visible to visitors</p>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((page) => (
          <div
            key={page.key}
            className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-white">{page.label}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{page.description}</p>
            </div>

            <button
              onClick={() => handleToggle(page.key)}
              className={`ml-4 relative inline-flex items-center justify-center w-12 h-12 rounded-lg transition-all ${
                form[page.key]
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
              title={form[page.key] ? 'Visible to users' : 'Hidden from users'}
            >
              {form[page.key] ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> Hidden pages will not appear in the navigation menu and will show a 404 error when accessed directly.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>

      {/* Status Summary */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Current Status</h4>
        <div className="flex flex-wrap gap-2">
          {pages.map((page) => (
            <span
              key={page.key}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                form[page.key]
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {page.label}: {form[page.key] ? 'Visible' : 'Hidden'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
