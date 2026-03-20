import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { FormField } from '../fields/FormField';
import { FormSection } from '../fields/FormSection';
import { Trash2, Plus } from 'lucide-react';
import apiClient from '../../../api/client';

export function CareersTab() {
  const [careers, setCareers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [error, setError] = useState('');
  const [view, setView] = useState('jobs'); // 'jobs' or 'applications'

  const jobTypes = ['full-time', 'contract', 'part-time', 'internship'];

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
      setError('Failed to fetch careers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (careerId) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/careers/admin/all-applications`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      });
      if (response.data.success) {
        setApplications(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCareer = () => {
    const newCareer = {
      _id: `temp-${Date.now()}`,
      jobTitle: '',
      department: '',
      location: '',
      type: 'full-time',
      experience: '',
      description: '',
      requirements: [],
      benefits: [],
      salaryRange: { min: 0, max: 0, currency: 'USD' },
      isActive: true
    };
    setCareers([...careers, newCareer]);
    setExpandedId(newCareer._id);
  };

  const handleUpdateCareer = (id, field, value) => {
    setCareers(careers.map(career =>
      career._id === id ? { ...career, [field]: value } : career
    ));
  };

  const handleAddRequirement = (id) => {
    setCareers(careers.map(c =>
      c._id === id ? { ...c, requirements: [...c.requirements, ''] } : c
    ));
  };

  const handleUpdateRequirement = (id, index, value) => {
    setCareers(careers.map(c => {
      if (c._id === id) {
        const reqs = [...c.requirements];
        reqs[index] = value;
        return { ...c, requirements: reqs };
      }
      return c;
    }));
  };

  const handleRemoveRequirement = (id, index) => {
    setCareers(careers.map(c => {
      if (c._id === id) {
        return { ...c, requirements: c.requirements.filter((_, i) => i !== index) };
      }
      return c;
    }));
  };

  const handleAddBenefit = (id) => {
    setCareers(careers.map(c =>
      c._id === id ? { ...c, benefits: [...c.benefits, ''] } : c
    ));
  };

  const handleUpdateBenefit = (id, index, value) => {
    setCareers(careers.map(c => {
      if (c._id === id) {
        const benefits = [...c.benefits];
        benefits[index] = value;
        return { ...c, benefits };
      }
      return c;
    }));
  };

  const handleRemoveBenefit = (id, index) => {
    setCareers(careers.map(c => {
      if (c._id === id) {
        return { ...c, benefits: c.benefits.filter((_, i) => i !== index) };
      }
      return c;
    }));
  };

  const handleSaveCareer = async (career) => {
    try {
      setLoading(true);
      if (career._id.startsWith('temp-')) {
        // Remove the temporary _id before posting (MongoDB will generate a real one)
        const { _id, ...careerData } = career;
        const response = await apiClient.post('/careers', careerData);
        if (response.data.success) {
          await fetchCareers();
          setError('');
        }
      } else {
        const response = await apiClient.put(`/careers/${career._id}`, career);
        if (response.data.success) {
          setError('');
        }
      }
    } catch (err) {
      setError(`Failed to save career: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCareer = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      setLoading(true);
      if (id.startsWith('temp-')) {
        setCareers(careers.filter(c => c._id !== id));
      } else {
        const response = await apiClient.delete(`/careers/${id}`);
        if (response.data.success) {
          await fetchCareers();
          setError('');
        }
      }
    } catch (err) {
      setError(`Failed to delete career: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          onClick={() => setView('jobs')}
          variant={view === 'jobs' ? 'default' : 'outline'}
          className="flex-1"
        >
          Job Postings ({careers.length})
        </Button>
        <Button
          onClick={() => {
            setView('applications');
            fetchApplications();
          }}
          variant={view === 'applications' ? 'default' : 'outline'}
          className="flex-1"
        >
          Applications ({applications.length})
        </Button>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {view === 'jobs' ? (
        <FormSection title="Job Postings" description="Manage job openings and positions">
          <div className="mb-6">
            <Button onClick={handleAddCareer} disabled={loading} className="w-full gap-2">
              <Plus className="w-4 h-4" /> Post New Job
            </Button>
          </div>

          <div className="space-y-4">
            {careers.map((career) => (
              <Card key={career._id} className="bg-slate-50 dark:bg-slate-900">
                <CardHeader
                  className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setExpandedId(expandedId === career._id ? null : career._id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{career.jobTitle || 'New Job'}</CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{career.department} • {career.location}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${career.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {career.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </CardHeader>

                {expandedId === career._id && (
                  <CardContent className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField label="Job Title" required error="">
                        <Input
                          value={career.jobTitle}
                          onChange={(e) => handleUpdateCareer(career._id, 'jobTitle', e.target.value)}
                          placeholder="e.g., Senior Developer"
                        />
                      </FormField>
                      <FormField label="Department" required error="">
                        <Input
                          value={career.department}
                          onChange={(e) => handleUpdateCareer(career._id, 'department', e.target.value)}
                          placeholder="e.g., Engineering"
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField label="Location" required error="">
                        <Input
                          value={career.location}
                          onChange={(e) => handleUpdateCareer(career._id, 'location', e.target.value)}
                          placeholder="e.g., Remote"
                        />
                      </FormField>
                      <FormField label="Job Type" required error="">
                        <select
                          value={career.type}
                          onChange={(e) => handleUpdateCareer(career._id, 'type', e.target.value)}
                          className="w-full border border-slate-300 dark:border-slate-600 rounded px-3 py-2 dark:bg-slate-800"
                        >
                          {jobTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </FormField>
                    </div>

                    <FormField label="Experience Level" error="">
                      <Input
                        value={career.experience}
                        onChange={(e) => handleUpdateCareer(career._id, 'experience', e.target.value)}
                        placeholder="e.g., 5+ years"
                      />
                    </FormField>

                    <FormField label="Description" required error="">
                      <textarea
                        value={career.description}
                        onChange={(e) => handleUpdateCareer(career._id, 'description', e.target.value)}
                        placeholder="Job description"
                        className="w-full border border-slate-300 dark:border-slate-600 rounded px-3 py-2 dark:bg-slate-800 min-h-24"
                      />
                    </FormField>

                    <div>
                      <label className="text-sm font-medium">Requirements</label>
                      <div className="space-y-2 mt-2">
                        {career.requirements.map((req, i) => (
                          <div key={i} className="flex gap-2">
                            <Input
                              value={req}
                              onChange={(e) => handleUpdateRequirement(career._id, i, e.target.value)}
                              placeholder="Requirement"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveRequirement(career._id, i)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddRequirement(career._id)}
                        className="mt-2 w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Requirement
                      </Button>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Benefits</label>
                      <div className="space-y-2 mt-2">
                        {career.benefits.map((benefit, i) => (
                          <div key={i} className="flex gap-2">
                            <Input
                              value={benefit}
                              onChange={(e) => handleUpdateBenefit(career._id, i, e.target.value)}
                              placeholder="Benefit"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveBenefit(career._id, i)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddBenefit(career._id)}
                        className="mt-2 w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Benefit
                      </Button>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={() => handleSaveCareer(career)}
                        disabled={loading || !career.jobTitle}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                      >
                        Save Job Posting
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDeleteCareer(career._id)}
                        disabled={loading}
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {careers.length === 0 && <p className="text-slate-500 text-center py-8">No job postings yet</p>}
        </FormSection>
      ) : (
        <FormSection title="Applications" description="Review and manage job applications">
          {applications.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No applications received yet</p>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app._id} className="bg-slate-50 dark:bg-slate-900">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-600">Name</p>
                        <p className="font-medium">{app.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Email</p>
                        <p className="font-medium">{app.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Phone</p>
                        <p className="font-medium">{app.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Status</p>
                        <select
                          value={app.status}
                          className="mt-1 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded dark:bg-slate-800"
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="rejected">Rejected</option>
                          <option value="accepted">Accepted</option>
                        </select>
                      </div>
                    </div>
                    {app.coverLetter && (
                      <div className="mb-4">
                        <p className="text-sm text-slate-600">Cover Letter</p>
                        <p className="text-sm mt-1">{app.coverLetter.substring(0, 200)}...</p>
                      </div>
                    )}
                    {app.resumeUrl && (
                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 text-sm">
                        📄 Download Resume
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </FormSection>
      )}
    </div>
  );
}
