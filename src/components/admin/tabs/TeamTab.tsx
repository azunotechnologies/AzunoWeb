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
import { PDFUploadField } from '../fields/PDFUploadField';
import type { TeamMember } from '../../../contexts/ContentContext';

interface PortfolioItem {
  image: string;
  title: string;
  description: string;
  order: number;
}

export function TeamTab() {
  const { teamMembers, updateTeamMembers } = useContent();
  const [form, setForm] = useState(teamMembers);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateTeamMembers(form);
      toast.success('Team updated successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save team';
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

  const addMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: 'New Team Member',
      role: '',
      bio: '',
      socialLinks: {},
      order: form.length,
      portfolioItems: []
    };
    setForm([...form, newMember]);
  };

  const removeMember = (id: string) => {
    setForm(form.filter(m => m.id !== id));
  };

  const updateMember = (id: string, field: keyof TeamMember, value: any) => {
    setForm(
      form.map(m =>
        m.id === id ? { ...m, [field]: value } : m
      )
    );
  };

  const moveMember = (id: string, direction: 'up' | 'down') => {
    const index = form.findIndex(m => m.id === id);
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < form.length - 1)
    ) {
      const newForm = [...form];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      [newForm[index], newForm[swapIndex]] = [newForm[swapIndex], newForm[index]];
      newForm.forEach((m, i) => (m.order = i));
      setForm(newForm);
    }
  };

  const updateSocialLink = (id: string, platform: string, value: string) => {
    setForm(
      form.map(m =>
        m.id === id ? { ...m, socialLinks: { ...m.socialLinks, [platform]: value } } : m
      )
    );
  };

  const addPortfolioItem = (memberId: string) => {
    setForm(
      form.map(m =>
        m.id === memberId
          ? { ...m, portfolioItems: [...(m.portfolioItems || []), { image: '', title: '', description: '', order: (m.portfolioItems || []).length }] }
          : m
      )
    );
  };

  const updatePortfolioItem = (memberId: string, index: number, field: keyof PortfolioItem, value: any) => {
    setForm(
      form.map(m =>
        m.id === memberId
          ? {
              ...m,
              portfolioItems: (m.portfolioItems || []).map((item, i) =>
                i === index ? { ...item, [field]: value } : item
              ),
            }
          : m
      )
    );
  };

  const removePortfolioItem = (memberId: string, index: number) => {
    setForm(
      form.map(m =>
        m.id === memberId
          ? {
              ...m,
              portfolioItems: (m.portfolioItems || [])
                .filter((_, i) => i !== index)
                .map((item, i) => ({ ...item, order: i })),
            }
          : m
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Team Members
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your team with profiles, portfolios, and resumes
          </p>
        </div>
        <Button
          onClick={addMember}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        {form.length === 0 ? (
          <FormSection title="No Team Members" description="Add a team member to get started">
            <p className="text-slate-600 dark:text-slate-400 text-center py-8">
              No team members yet. Click "Add Member" to create one.
            </p>
          </FormSection>
        ) : (
          form.map((member, index) => {
            const isExpanded = expandedIds.has(member.id);

            return (
              <FormSection
                key={member.id}
                title={`Team Member ${index + 1}: ${member.name}`}
                description={member.role}
              >
                {/* Header Controls */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => toggleExpand(member.id)}
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
                      onClick={() => moveMember(member.id, 'up')}
                      disabled={index === 0}
                      className="border-slate-300 dark:border-slate-700"
                    >
                      ↑
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => moveMember(member.id, 'down')}
                      disabled={index === form.length - 1}
                      className="border-slate-300 dark:border-slate-700"
                    >
                      ↓
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeMember(member.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="space-y-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                    {/* Profile Image */}
                    <ImageUploadField
                      label="Profile Image"
                      value={member.image}
                      onChange={(url) =>
                        updateMember(member.id, 'image', url)
                      }
                      folder="team"
                    />

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="Full Name" required>
                        <Input
                          value={member.name}
                          onChange={(e) =>
                            updateMember(member.id, 'name', e.target.value)
                          }
                          placeholder="Full Name"
                        />
                      </FormField>

                      <FormField label="Role/Title" required>
                        <Input
                          value={member.role}
                          onChange={(e) =>
                            updateMember(member.id, 'role', e.target.value)
                          }
                          placeholder="CEO, Developer, Designer, etc."
                        />
                      </FormField>
                    </div>

                    {/* Bio */}
                    <FormField label="Bio">
                      <Textarea
                        value={member.bio}
                        onChange={(e) =>
                          updateMember(member.id, 'bio', e.target.value)
                        }
                        rows={3}
                        placeholder="Brief bio"
                      />
                    </FormField>

                    {/* Resume PDF */}
                    <PDFUploadField
                      label="Resume/CV (PDF)"
                      value={member.pdfResume}
                      onChange={(url) =>
                        updateMember(member.id, 'pdfResume', url)
                      }
                      folder="team/resumes"
                    />

                    {/* Social Links */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        Social Links
                      </h4>

                      <FormField label="LinkedIn URL">
                        <Input
                          type="url"
                          value={member.socialLinks.linkedin || ''}
                          onChange={(e) =>
                            updateSocialLink(member.id, 'linkedin', e.target.value)
                          }
                          placeholder="https://linkedin.com/in/..."
                        />
                      </FormField>

                      <FormField label="Twitter/X URL">
                        <Input
                          type="url"
                          value={member.socialLinks.twitter || ''}
                          onChange={(e) =>
                            updateSocialLink(member.id, 'twitter', e.target.value)
                          }
                          placeholder="https://twitter.com/..."
                        />
                      </FormField>

                      <FormField label="GitHub URL">
                        <Input
                          type="url"
                          value={member.socialLinks.github || ''}
                          onChange={(e) =>
                            updateSocialLink(member.id, 'github', e.target.value)
                          }
                          placeholder="https://github.com/..."
                        />
                      </FormField>
                    </div>

                    {/* Portfolio Items */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-slate-900 dark:text-white">
                          Portfolio Items
                        </h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addPortfolioItem(member.id)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Item
                        </Button>
                      </div>

                      {(member.portfolioItems || []).map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3"
                        >
                          <FormField label={`Portfolio Item ${idx + 1} - Image`}>
                            <Input
                              type="url"
                              value={item.image}
                              onChange={(e) =>
                                updatePortfolioItem(member.id, idx, 'image', e.target.value)
                              }
                              placeholder="https://..."
                            />
                          </FormField>

                          <FormField label="Title">
                            <Input
                              value={item.title}
                              onChange={(e) =>
                                updatePortfolioItem(member.id, idx, 'title', e.target.value)
                              }
                              placeholder="Project name"
                            />
                          </FormField>

                          <FormField label="Description">
                            <Textarea
                              value={item.description}
                              onChange={(e) =>
                                updatePortfolioItem(member.id, idx, 'description', e.target.value)
                              }
                              placeholder="Project description"
                              rows={2}
                            />
                          </FormField>

                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removePortfolioItem(member.id, idx)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove Item
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
          {loading ? 'Saving...' : 'Save All Team Members'}
        </Button>
      </div>
    </div>
  );
}
