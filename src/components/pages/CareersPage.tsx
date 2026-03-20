import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Briefcase, ArrowRight, Loader2, X } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import apiClient from '../../api/client';

export function CareersPage() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyMode, setApplyMode] = useState(false);
  const [applying, setApplying] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/careers');
      if (response.data.success) {
        setCareers(response.data.data);
      }
    } catch (err) {
      setError('Failed to load job postings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!formData.resume) {
      alert('Please upload your resume');
      return;
    }

    try {
      setApplying(true);
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('coverLetter', formData.coverLetter);
      form.append('resume', formData.resume);

      const response = await apiClient.post(`/careers/${selectedJob._id}/apply`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        alert('Application submitted successfully! We will review and get back to you soon.');
        setApplyMode(false);
        setFormData({ name: '', email: '', phone: '', coverLetter: '', resume: null });
        setSelectedJob(null);
      }
    } catch (err) {
      alert(`Error submitting application: ${err.message}`);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              We're looking for talented individuals who are passionate about technology and innovation. Build amazing things with us.
            </p>
          </motion.div>

          {/* Open Positions */}
          <div className="space-y-6">
            {careers.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className="bg-white dark:bg-slate-800 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setSelectedJob(job);
                    setApplyMode(false);
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                          {job.jobTitle}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-3">
                          <Badge className="gap-2 flex items-center">
                            <MapPin className="w-4 h-4" /> {job.location}
                          </Badge>
                          <Badge className="gap-2 flex items-center">
                            <Briefcase className="w-4 h-4" /> {job.type}
                          </Badge>
                          <Badge className="gap-2 flex items-center">
                            <Clock className="w-4 h-4" /> {job.experience}
                          </Badge>
                        </div>
                      </div>
                      <Button onClick={() => setSelectedJob(job)} className="gap-2">
                        View Details <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {careers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 text-lg">No open positions at the moment</p>
            </div>
          )}
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && !applyMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {selectedJob.jobTitle}
                </h2>
                <button onClick={() => setSelectedJob(null)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Description</h3>
                  <p className="text-slate-600 dark:text-slate-400">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Requirements</h3>
                  <ul className="space-y-1">
                    {selectedJob.requirements?.map((req, i) => (
                      <li key={i} className="text-slate-600 dark:text-slate-400">• {req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Benefits</h3>
                  <ul className="space-y-1">
                    {selectedJob.benefits?.map((benefit, i) => (
                      <li key={i} className="text-slate-600 dark:text-slate-400">✓ {benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setApplyMode(true)} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                  Apply Now
                </Button>
                <Button onClick={() => setSelectedJob(null)} variant="outline" className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Application Form Modal */}
      {selectedJob && applyMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Apply for {selectedJob.jobTitle}
                </h2>
                <button onClick={() => setApplyMode(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleApply} className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <textarea
                  className="w-full border border-slate-300 dark:border-slate-600 rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
                  placeholder="Cover Letter (optional)"
                  rows={4}
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                />
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Resume (PDF) *
                  </label>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={applying}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  >
                    {applying ? 'Submitting...' : 'Submit Application'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setApplyMode(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
