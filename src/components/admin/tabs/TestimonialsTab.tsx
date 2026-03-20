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
import { VideoUploadField } from '../fields/VideoUploadField';
import type { Testimonial } from '../../../contexts/ContentContext';

export function TestimonialsTab() {
  const { testimonials, updateTestimonials } = useContent();
  const [form, setForm] = useState(testimonials);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateTestimonials(form);
      toast.success('Testimonials updated successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save testimonials';
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

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: '',
      company: '',
      role: '',
      content: '',
      rating: 5,
      order: form.length
    };
    setForm([...form, newTestimonial]);
  };

  const removeTestimonial = (id: string) => {
    setForm(form.filter(t => t.id !== id));
  };

  const updateTestimonial = (id: string, field: keyof Testimonial, value: any) => {
    setForm(
      form.map(t =>
        t.id === id ? { ...t, [field]: value } : t
      )
    );
  };

  const moveTestimonial = (id: string, direction: 'up' | 'down') => {
    const index = form.findIndex(t => t.id === id);
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < form.length - 1)
    ) {
      const newForm = [...form];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      [newForm[index], newForm[swapIndex]] = [newForm[swapIndex], newForm[index]];
      newForm.forEach((t, i) => (t.order = i));
      setForm(newForm);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Testimonials
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage client testimonials with images, logos, and ratings
          </p>
        </div>
        <Button
          onClick={addTestimonial}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {form.length === 0 ? (
          <FormSection title="No Testimonials" description="Add a testimonial to get started">
            <p className="text-slate-600 dark:text-slate-400 text-center py-8">
              No testimonials yet. Click "Add Testimonial" to create one.
            </p>
          </FormSection>
        ) : (
          form.map((testimonial, index) => {
            const isExpanded = expandedIds.has(testimonial.id);

            return (
              <FormSection
                key={testimonial.id}
                title={`Testimonial ${index + 1}: ${testimonial.name}`}
                description={testimonial.company}
              >
                {/* Header Controls */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => toggleExpand(testimonial.id)}
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
                      onClick={() => moveTestimonial(testimonial.id, 'up')}
                      disabled={index === 0}
                      className="border-slate-300 dark:border-slate-700"
                    >
                      ↑
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => moveTestimonial(testimonial.id, 'down')}
                      disabled={index === form.length - 1}
                      className="border-slate-300 dark:border-slate-700"
                    >
                      ↓
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeTestimonial(testimonial.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="space-y-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField label="Client Name" required>
                        <Input
                          value={testimonial.name}
                          onChange={(e) =>
                            updateTestimonial(testimonial.id, 'name', e.target.value)
                          }
                          placeholder="Client name"
                        />
                      </FormField>

                      <FormField label="Company" required>
                        <Input
                          value={testimonial.company}
                          onChange={(e) =>
                            updateTestimonial(testimonial.id, 'company', e.target.value)
                          }
                          placeholder="Company name"
                        />
                      </FormField>

                      <FormField label="Role/Title" required>
                        <Input
                          value={testimonial.role}
                          onChange={(e) =>
                            updateTestimonial(testimonial.id, 'role', e.target.value)
                          }
                          placeholder="CEO, CTO, etc."
                        />
                      </FormField>
                    </div>

                    {/* Testimonial Content */}
                    <FormField label="Testimonial Content" required>
                      <Textarea
                        value={testimonial.content}
                        onChange={(e) =>
                          updateTestimonial(testimonial.id, 'content', e.target.value)
                        }
                        placeholder="What did the client say?"
                        rows={4}
                      />
                    </FormField>

                    {/* Rating */}
                    <FormField label="Rating">
                      <div className="flex gap-2 items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => updateTestimonial(testimonial.id, 'rating', star)}
                            className={`text-2xl transition-colors ${
                              star <= testimonial.rating
                                ? 'text-yellow-400'
                                : 'text-slate-300 dark:text-slate-600'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                          {testimonial.rating} / 5
                        </span>
                      </div>
                    </FormField>

                    {/* Media Section */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        Media
                      </h4>

                      <ImageUploadField
                        label="Client Photo"
                        value={testimonial.image}
                        onChange={(url) =>
                          updateTestimonial(testimonial.id, 'image', url)
                        }
                        folder="testimonials"
                      />

                      <ImageUploadField
                        label="Company Logo"
                        value={testimonial.companyLogo}
                        onChange={(url) =>
                          updateTestimonial(testimonial.id, 'companyLogo', url)
                        }
                        folder="testimonials/logos"
                      />

                      <VideoUploadField
                        label="Video Testimonial (Optional)"
                        value={testimonial.videoUrl}
                        onChange={(url) =>
                          updateTestimonial(testimonial.id, 'videoUrl', url)
                        }
                        folder="testimonials"
                      />
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
          {loading ? 'Saving...' : 'Save All Testimonials'}
        </Button>
      </div>
    </div>
  );
}
