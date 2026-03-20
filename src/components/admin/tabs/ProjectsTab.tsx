import { useState } from 'react';
import { useContent } from '../../../contexts/ContentContext';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import { FormSection } from '../fields/FormSection';
import { FormField } from '../fields/FormField';
import { ImageUploadField } from '../fields/ImageUploadField';
import { MultiImageGalleryField } from '../fields/MultiImageGalleryField';
import { VideoUploadField } from '../fields/VideoUploadField';
import { PDFUploadField } from '../fields/PDFUploadField';
import type { Project } from '../../../contexts/ContentContext';

export function ProjectsTab() {
  const { projects, updateProjects } = useContent();
  const [form, setForm] = useState(projects);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProjects(form);
      toast.success('Projects updated successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save projects';
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      client: '',
      category: 'Web Development',
      description: '',
      challenge: '',
      solution: '',
      results: [],
      technologies: [],
      featured: false,
      order: form.length,
      galleryImages: [],
    };
    setForm([...form, newProject]);
  };

  const removeProject = (id: string) => {
    setForm(form.filter((p) => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setForm(
      form.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const moveProject = (id: string, direction: 'up' | 'down') => {
    const index = form.findIndex((p) => p.id === id);
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < form.length - 1)
    ) {
      const newForm = [...form];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      [newForm[index], newForm[swapIndex]] = [newForm[swapIndex], newForm[index]];
      newForm.forEach((p, i) => (p.order = i));
      setForm(newForm);
    }
  };

  const addResult = (projectId: string) => {
    setForm(
      form.map((p) =>
        p.id === projectId ? { ...p, results: [...p.results, ''] } : p
      )
    );
  };

  const updateResult = (projectId: string, index: number, value: string) => {
    setForm(
      form.map((p) =>
        p.id === projectId
          ? {
              ...p,
              results: p.results.map((r, i) => (i === index ? value : r)),
            }
          : p
      )
    );
  };

  const removeResult = (projectId: string, index: number) => {
    setForm(
      form.map((p) =>
        p.id === projectId
          ? {
              ...p,
              results: p.results.filter((_, i) => i !== index),
            }
          : p
      )
    );
  };

  const addTechnology = (projectId: string) => {
    setForm(
      form.map((p) =>
        p.id === projectId
          ? { ...p, technologies: [...p.technologies, ''] }
          : p
      )
    );
  };

  const updateTechnology = (projectId: string, index: number, value: string) => {
    setForm(
      form.map((p) =>
        p.id === projectId
          ? {
              ...p,
              technologies: p.technologies.map((t, i) =>
                i === index ? value : t
              ),
            }
          : p
      )
    );
  };

  const removeTechnology = (projectId: string, index: number) => {
    setForm(
      form.map((p) =>
        p.id === projectId
          ? {
              ...p,
              technologies: p.technologies.filter((_, i) => i !== index),
            }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Portfolio Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your project portfolios with images, videos, and case studies
          </p>
        </div>
        <Button
          onClick={addProject}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {form.length === 0 ? (
          <FormSection title="No Projects" description="Add a project to get started">
            <p className="text-slate-600 dark:text-slate-400 text-center py-8">
              No projects yet. Click "Add Project" to create one.
            </p>
          </FormSection>
        ) : (
          form.map((project, index) => {
            const isExpanded = expandedIds.has(project.id);

            return (
              <FormSection
                key={project.id}
                title={`Project ${index + 1}: ${project.title}`}
                description={project.client}
              >
                {/* Header Controls */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => toggleExpand(project.id)}
                      className="border-slate-300 dark:border-slate-700"
                    >
                      {isExpanded ? 'Collapse' : 'Expand'}
                      {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => moveProject(project.id, 'up')}
                      disabled={index === 0}
                      className="border-slate-300 dark:border-slate-700"
                    >
                      ↑
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => moveProject(project.id, 'down')}
                      disabled={index === form.length - 1}
                      className="border-slate-300 dark:border-slate-700"
                    >
                      ↓
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeProject(project.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="space-y-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="Project Title" required>
                        <Input
                          value={project.title}
                          onChange={(e) =>
                            updateProject(project.id, 'title', e.target.value)
                          }
                          placeholder="Project name"
                        />
                      </FormField>

                      <FormField label="Client Name" required>
                        <Input
                          value={project.client}
                          onChange={(e) =>
                            updateProject(project.id, 'client', e.target.value)
                          }
                          placeholder="Client name"
                        />
                      </FormField>

                      <FormField label="Category" required>
                        <Input
                          value={project.category}
                          onChange={(e) =>
                            updateProject(project.id, 'category', e.target.value)
                          }
                          placeholder="e.g., Web Development"
                        />
                      </FormField>

                      <FormField label="Featured">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={project.featured}
                            onChange={(e) =>
                              updateProject(project.id, 'featured', e.target.checked)
                            }
                            className="rounded border-slate-300"
                          />
                          <span className="text-sm">Feature this project</span>
                        </label>
                      </FormField>
                    </div>

                    {/* Description */}
                    <FormField label="Description" required>
                      <Textarea
                        value={project.description}
                        onChange={(e) =>
                          updateProject(project.id, 'description', e.target.value)
                        }
                        placeholder="Brief project description"
                        rows={3}
                      />
                    </FormField>

                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="Challenge">
                        <Textarea
                          value={project.challenge}
                          onChange={(e) =>
                            updateProject(project.id, 'challenge', e.target.value)
                          }
                          placeholder="What challenges did this project face?"
                          rows={3}
                        />
                      </FormField>

                      <FormField label="Solution">
                        <Textarea
                          value={project.solution}
                          onChange={(e) =>
                            updateProject(project.id, 'solution', e.target.value)
                          }
                          placeholder="How did you solve the challenges?"
                          rows={3}
                        />
                      </FormField>
                    </div>

                    {/* URLs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="Live URL">
                        <Input
                          type="url"
                          value={project.liveUrl || ''}
                          onChange={(e) =>
                            updateProject(project.id, 'liveUrl', e.target.value)
                          }
                          placeholder="https://example.com"
                        />
                      </FormField>

                      <FormField label="Case Study URL">
                        <Input
                          type="url"
                          value={project.caseStudyUrl || ''}
                          onChange={(e) =>
                            updateProject(project.id, 'caseStudyUrl', e.target.value)
                          }
                          placeholder="https://example.com/case-study"
                        />
                      </FormField>
                    </div>

                    {/* Media */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        Project Media
                      </h4>

                      <ImageUploadField
                        label="Cover Image"
                        value={project.image}
                        onChange={(url) =>
                          updateProject(project.id, 'image', url)
                        }
                        folder="projects"
                      />

                      <MultiImageGalleryField
                        label="Project Gallery"
                        value={project.galleryImages}
                        onChange={(images) =>
                          updateProject(project.id, 'galleryImages', images)
                        }
                        folder="projects"
                      />

                      <VideoUploadField
                        label="Project Video"
                        value={project.videoUrl}
                        onChange={(url) =>
                          updateProject(project.id, 'videoUrl', url)
                        }
                        folder="projects"
                      />

                      <PDFUploadField
                        label="Case Study PDF"
                        value={project.pdfUrl}
                        onChange={(url) =>
                          updateProject(project.id, 'pdfUrl', url)
                        }
                        folder="projects"
                      />
                    </div>

                    {/* Results */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-slate-900 dark:text-white">
                          Key Results
                        </h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addResult(project.id)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Result
                        </Button>
                      </div>

                      {project.results.map((result, idx) => (
                        <div key={idx} className="flex gap-2">
                          <Input
                            value={result}
                            onChange={(e) =>
                              updateResult(project.id, idx, e.target.value)
                            }
                            placeholder={`Result ${idx + 1}`}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeResult(project.id, idx)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-slate-900 dark:text-white">
                          Technologies Used
                        </h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addTechnology(project.id)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Tech
                        </Button>
                      </div>

                      {project.technologies.map((tech, idx) => (
                        <div key={idx} className="flex gap-2">
                          <Input
                            value={tech}
                            onChange={(e) =>
                              updateTechnology(project.id, idx, e.target.value)
                            }
                            placeholder={`Technology ${idx + 1}`}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeTechnology(project.id, idx)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </FormSection>
            );
          })
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          disabled={loading}
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save All Projects'}
        </Button>
      </div>
    </div>
  );
}
