import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { FormField } from '../fields/FormField';
import { FormSection } from '../fields/FormSection';
import { ImageUploadField } from '../fields/ImageUploadField';
import { Trash2, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import apiClient from '../../../api/client';

export function TechnologiesTab() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState('');

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Other'];

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/technologies');
      if (response.data.success) {
        setTechnologies(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch technologies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTechnology = () => {
    const newTech = {
      _id: `temp-${Date.now()}`,
      name: '',
      category: 'Frontend',
      description: '',
      proficiency: 80,
      website: '',
      logo: { url: '' },
      isActive: true
    };
    setTechnologies([...technologies, newTech]);
    setExpandedId(newTech._id);
  };

  const handleUpdateTechnology = (id, field, value) => {
    setTechnologies(technologies.map(tech =>
      tech._id === id ? { ...tech, [field]: value } : tech
    ));
  };

  const handleUpdateLogoUrl = (id, logoUrl) => {
    setTechnologies(technologies.map(tech =>
      tech._id === id ? { ...tech, logo: { ...tech.logo, url: logoUrl } } : tech
    ));
  };

  const handleSaveTechnology = async (tech) => {
    try {
      setLoading(true);
      if (tech._id.startsWith('temp-')) {
        // Remove the temporary _id before posting (MongoDB will generate a real one)
        const { _id, ...techData } = tech;
        const response = await apiClient.post('/technologies', techData);
        if (response.data.success) {
          await fetchTechnologies();
          setError('');
        }
      } else {
        // Update existing
        const response = await apiClient.put(`/technologies/${tech._id}`, tech);
        if (response.data.success) {
          setError('');
        }
      }
    } catch (err) {
      setError(`Failed to save technology: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTechnology = async (id) => {
    if (!window.confirm('Are you sure you want to delete this technology?')) return;

    try {
      setLoading(true);
      if (id.startsWith('temp-')) {
        setTechnologies(technologies.filter(tech => tech._id !== id));
      } else {
        const response = await apiClient.delete(`/technologies/${id}`);
        if (response.data.success) {
          await fetchTechnologies();
          setError('');
        }
      }
    } catch (err) {
      setError(`Failed to delete technology: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const moveUp = (index) => {
    if (index <= 0) return;
    const newTechs = [...technologies];
    [newTechs[index - 1], newTechs[index]] = [newTechs[index], newTechs[index - 1]];
    setTechnologies(newTechs);
  };

  const moveDown = (index) => {
    if (index >= technologies.length - 1) return;
    const newTechs = [...technologies];
    [newTechs[index], newTechs[index + 1]] = [newTechs[index + 1], newTechs[index]];
    setTechnologies(newTechs);
  };

  return (
    <div className="space-y-6">
      <FormSection title="Technologies Management" description="Manage the technologies and tools used by your company">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-6">
          <Button onClick={handleAddTechnology} disabled={loading} className="w-full gap-2">
            <Plus className="w-4 h-4" /> Add New Technology
          </Button>
        </div>

        <div className="space-y-4">
          {technologies.map((tech, index) => (
            <Card key={tech._id} className="bg-slate-50 dark:bg-slate-900">
              <CardHeader
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setExpandedId(expandedId === tech._id ? null : tech._id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    {tech.logo?.url && (
                      <img src={tech.logo.url} alt={tech.name} className="w-8 h-8 rounded" />
                    )}
                    <div>
                      <CardTitle className="text-base">{tech.name || 'New Technology'}</CardTitle>
                      <p className="text-xs text-slate-500">{tech.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveUp(index);
                      }}
                      disabled={index === 0}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-50"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveDown(index);
                      }}
                      disabled={index === technologies.length - 1}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-50"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardHeader>

              {expandedId === tech._id && (
                <CardContent className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                  <FormField label="Name" required error="">
                    <Input
                      value={tech.name}
                      onChange={(e) => handleUpdateTechnology(tech._id, 'name', e.target.value)}
                      placeholder="e.g., React"
                    />
                  </FormField>

                  <FormField label="Category" required error="">
                    <select
                      value={tech.category}
                      onChange={(e) => handleUpdateTechnology(tech._id, 'category', e.target.value)}
                      className="w-full border border-slate-300 dark:border-slate-600 rounded px-3 py-2 dark:bg-slate-800"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Description" error="">
                    <textarea
                      value={tech.description}
                      onChange={(e) => handleUpdateTechnology(tech._id, 'description', e.target.value)}
                      placeholder="Brief description of the technology"
                      className="w-full border border-slate-300 dark:border-slate-600 rounded px-3 py-2 dark:bg-slate-800 min-h-20"
                    />
                  </FormField>

                  <FormField label="Proficiency %" error="">
                    <div className="flex gap-2">
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={tech.proficiency}
                        onChange={(e) => handleUpdateTechnology(tech._id, 'proficiency', Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="w-12 text-right font-bold">{tech.proficiency}%</span>
                    </div>
                  </FormField>

                  <FormField label="Website" error="">
                    <Input
                      type="url"
                      value={tech.website}
                      onChange={(e) => handleUpdateTechnology(tech._id, 'website', e.target.value)}
                      placeholder="https://example.com"
                    />
                  </FormField>

                  <ImageUploadField
                    label="Logo"
                    value={tech.logo?.url}
                    onChange={(url) => handleUpdateLogoUrl(tech._id, url)}
                  />

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => handleSaveTechnology(tech)}
                      disabled={loading || !tech.name}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                    >
                      Save Technology
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteTechnology(tech._id)}
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

        {technologies.length === 0 && <p className="text-slate-500 text-center py-8">No technologies added yet</p>}
      </FormSection>
    </div>
  );
}
