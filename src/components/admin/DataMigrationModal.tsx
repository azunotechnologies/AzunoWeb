import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { X, Loader2, CheckCircle } from 'lucide-react';
import apiClient from '../../api/client';

export function DataMigrationModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('confirm'); // confirm, migrating, success
  const [error, setError] = useState('');

  const handleMigrate = async () => {
    try {
      setLoading(true);
      setStep('migrating');
      setError('');

      // Get all data from localStorage
      const data = {
        siteSettings: JSON.parse(localStorage.getItem('siteSettings') || '{}'),
        heroContent: JSON.parse(localStorage.getItem('heroContent') || '{}'),
        services: JSON.parse(localStorage.getItem('services') || '[]'),
        projects: JSON.parse(localStorage.getItem('projects') || '[]'),
        teamMembers: JSON.parse(localStorage.getItem('teamMembers') || '[]'),
        blogPosts: JSON.parse(localStorage.getItem('blogPosts') || '[]'),
        testimonials: JSON.parse(localStorage.getItem('testimonials') || '[]'),
        contactSubmissions: JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
      };

      // POST to backend
      const response = await apiClient.post('/data/initialize', data);

      if (response.data.success) {
        setStep('success');
        setTimeout(() => {
          if (onSuccess) onSuccess();
          handleClose();
        }, 2000);
      }
    } catch (err) {
      setError(`Failed to migrate data: ${err.message}`);
      setStep('confirm');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('confirm');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Migrate Data to MongoDB</CardTitle>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 'confirm' && (
            <>
              <p className="text-slate-600 dark:text-slate-400">
                This will migrate all your data from browser storage to MongoDB. Your data will be permanently stored in the database.
              </p>

              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 rounded text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Button
                  onClick={handleMigrate}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  {loading ? 'Migrating...' : 'Migrate Now'}
                </Button>
                <Button
                  onClick={handleClose}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}

          {step === 'migrating' && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Migrating your data to MongoDB...
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
              <div className="text-center">
                <p className="font-semibold text-slate-900 dark:text-white mb-2">
                  Migration Successful!
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Your data has been migrated to MongoDB and will persist across sessions.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
