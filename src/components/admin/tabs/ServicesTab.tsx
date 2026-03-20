import { useState } from 'react';
import { useContent } from '../../../contexts/ContentContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Save, Plus, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { toast } from 'sonner';
import { FormField } from '../fields/FormField';
import { ImageUploadField } from '../fields/ImageUploadField';
import type { Service } from '../../../contexts/ContentContext';

// Available Lucide React icons for services
const ICON_OPTIONS = [
  'Globe',
  'Smartphone',
  'Brain',
  'Zap',
  'Cloud',
  'Palette',
  'Code',
  'Database',
  'Server',
  'Cpu',
  'Workflow',
  'BarChart',
  'Shield',
  'Lock',
  'Rocket',
  'Target',
  'TrendingUp',
  'Users',
  'Settings',
  'Tool'
];

export function ServicesTab() {
  const { services, updateServices } = useContent();
  const [form, setForm] = useState(services);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateServices(form);
      toast.success('Services updated successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save services';
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: 'New Service',
      description: '',
      features: [''],
      icon: 'Code',
      order: form.length + 1
    };
    setForm([...form, newService]);
  };

  const removeService = (id: string) => {
    setForm(form.filter(s => s.id !== id));
  };

  const updateService = (id: string, field: keyof Service, value: any) => {
    setForm(form.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addFeature = (serviceId: string) => {
    setForm(form.map(s =>
      s.id === serviceId ? { ...s, features: [...s.features, ''] } : s
    ));
  };

  const updateFeature = (serviceId: string, index: number, value: string) => {
    setForm(form.map(s =>
      s.id === serviceId ? {
        ...s,
        features: s.features.map((f, i) => i === index ? value : f)
      } : s
    ));
  };

  const removeFeature = (serviceId: string, index: number) => {
    setForm(form.map(s =>
      s.id === serviceId ? {
        ...s,
        features: s.features.filter((_, i) => i !== index)
      } : s
    ));
  };

  const moveService = (index: number, direction: 'up' | 'down') => {
    const newForm = [...form];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newForm.length) return;

    [newForm[index], newForm[targetIndex]] = [newForm[targetIndex], newForm[index]];
    newForm.forEach((service, i) => service.order = i + 1);
    setForm(newForm);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Manage Services</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Add, edit, or remove your services</p>
        </div>
        <Button onClick={addService} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {form.sort((a, b) => a.order - b.order).map((service, idx) => (
        <Card key={service.id} className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">Service {idx + 1}</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => moveService(idx, 'up')}
                  disabled={idx === 0}
                >
                  <MoveUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => moveService(idx, 'down')}
                  disabled={idx === form.length - 1}
                >
                  <MoveDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeService(service.id)}
                  className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={service.title}
                  onChange={(e) => updateService(service.id, 'title', e.target.value)}
                  placeholder="Service Title"
                />
              </div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select
                  value={service.icon}
                  onValueChange={(value) => updateService(service.id, 'icon', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map(icon => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <ImageUploadField
              label="Service Image (Optional)"
              value={service.image}
              onChange={(url) => updateService(service.id, 'image', url)}
              folder="services"
            />

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={service.description}
                onChange={(e) => updateService(service.id, 'description', e.target.value)}
                rows={3}
                placeholder="Service description"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Features</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addFeature(service.id)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Feature
                </Button>
              </div>
              {service.features.map((feature, featureIdx) => (
                <div key={`${service.id}-feature-${featureIdx}`} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(service.id, featureIdx, e.target.value)}
                    placeholder={`Feature ${featureIdx + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFeature(service.id, featureIdx)}
                    className="text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700"
          disabled={loading}
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save All Services'}
        </Button>
      </div>
    </div>
  );
}
