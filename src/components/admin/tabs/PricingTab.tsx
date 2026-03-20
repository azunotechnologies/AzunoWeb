import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { FormField } from '../fields/FormField';
import { FormSection } from '../fields/FormSection';
import { Trash2, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import apiClient from '../../../api/client';

export function PricingTab() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/pricing');
      if (response.data.success) {
        setPlans(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch pricing plans');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlan = () => {
    const newPlan = {
      _id: `temp-${Date.now()}`,
      planName: '',
      description: '',
      price: 0,
      currency: 'USD',
      billingCycle: 'monthly',
      features: [],
      popular: false,
      addons: [],
      isActive: true
    };
    setPlans([...plans, newPlan]);
    setExpandedId(newPlan._id);
  };

  const handleUpdatePlan = (id, field, value) => {
    setPlans(plans.map(plan =>
      plan._id === id ? { ...plan, [field]: value } : plan
    ));
  };

  const handleAddFeature = (id) => {
    setPlans(plans.map(plan =>
      plan._id === id ? { ...plan, features: [...plan.features, ''] } : plan
    ));
  };

  const handleUpdateFeature = (id, index, value) => {
    setPlans(plans.map(plan => {
      if (plan._id === id) {
        const newFeatures = [...plan.features];
        newFeatures[index] = value;
        return { ...plan, features: newFeatures };
      }
      return plan;
    }));
  };

  const handleRemoveFeature = (id, index) => {
    setPlans(plans.map(plan => {
      if (plan._id === id) {
        return { ...plan, features: plan.features.filter((_, i) => i !== index) };
      }
      return plan;
    }));
  };

  const handleSavePlan = async (plan) => {
    try {
      setLoading(true);
      if (plan._id.startsWith('temp-')) {
        // Remove the temporary _id before posting (MongoDB will generate a real one)
        const { _id, ...planData } = plan;
        const response = await apiClient.post('/pricing', planData);
        if (response.data.success) {
          await fetchPlans();
          setError('');
        }
      } else {
        const response = await apiClient.put(`/pricing/${plan._id}`, plan);
        if (response.data.success) {
          setError('');
        }
      }
    } catch (err) {
      setError(`Failed to save plan: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlan = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      setLoading(true);
      if (id.startsWith('temp-')) {
        setPlans(plans.filter(p => p._id !== id));
      } else {
        const response = await apiClient.delete(`/pricing/${id}`);
        if (response.data.success) {
          await fetchPlans();
          setError('');
        }
      }
    } catch (err) {
      setError(`Failed to delete plan: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const moveUp = (index) => {
    if (index <= 0) return;
    const newPlans = [...plans];
    [newPlans[index - 1], newPlans[index]] = [newPlans[index], newPlans[index - 1]];
    setPlans(newPlans);
  };

  const moveDown = (index) => {
    if (index >= plans.length - 1) return;
    const newPlans = [...plans];
    [newPlans[index], newPlans[index + 1]] = [newPlans[index + 1], newPlans[index]];
    setPlans(newPlans);
  };

  return (
    <div className="space-y-6">
      <FormSection title="Pricing Plans" description="Manage your service pricing and plans">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-6">
          <Button onClick={handleAddPlan} disabled={loading} className="w-full gap-2">
            <Plus className="w-4 h-4" /> Add New Plan
          </Button>
        </div>

        <div className="space-y-4">
          {plans.map((plan, index) => (
            <Card key={plan._id} className="bg-slate-50 dark:bg-slate-900">
              <CardHeader
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setExpandedId(expandedId === plan._id ? null : plan._id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{plan.planName || 'New Plan'}</CardTitle>
                      {plan.popular && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Popular</span>}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">${plan.price} / {plan.billingCycle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); moveUp(index); }}
                      disabled={index === 0}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-50"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); moveDown(index); }}
                      disabled={index === plans.length - 1}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-50"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardHeader>

              {expandedId === plan._id && (
                <CardContent className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Plan Name" required error="">
                      <Input
                        value={plan.planName}
                        onChange={(e) => handleUpdatePlan(plan._id, 'planName', e.target.value)}
                        placeholder="e.g., Starter"
                      />
                    </FormField>
                    <FormField label="Price" required error="">
                      <Input
                        type="number"
                        value={plan.price}
                        onChange={(e) => handleUpdatePlan(plan._id, 'price', Number(e.target.value))}
                        placeholder="0"
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Billing Cycle" required error="">
                      <select
                        value={plan.billingCycle}
                        onChange={(e) => handleUpdatePlan(plan._id, 'billingCycle', e.target.value)}
                        className="w-full border border-slate-300 dark:border-slate-600 rounded px-3 py-2 dark:bg-slate-800"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </FormField>
                    <FormField label="Currency" required error="">
                      <select
                        value={plan.currency}
                        onChange={(e) => handleUpdatePlan(plan._id, 'currency', e.target.value)}
                        className="w-full border border-slate-300 dark:border-slate-600 rounded px-3 py-2 dark:bg-slate-800"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </FormField>
                  </div>

                  <FormField label="Description" error="">
                    <textarea
                      value={plan.description}
                      onChange={(e) => handleUpdatePlan(plan._id, 'description', e.target.value)}
                      placeholder="Plan description"
                      className="w-full border border-slate-300 dark:border-slate-600 rounded px-3 py-2 dark:bg-slate-800 min-h-20"
                    />
                  </FormField>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={plan.popular}
                      onChange={(e) => handleUpdatePlan(plan._id, 'popular', e.target.checked)}
                      className="cursor-pointer"
                    />
                    <label className="cursor-pointer">Mark as popular plan</label>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Features</label>
                    <div className="space-y-2 mt-2">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => handleUpdateFeature(plan._id, i, e.target.value)}
                            placeholder="Feature description"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveFeature(plan._id, i)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddFeature(plan._id)}
                      className="mt-2 w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Feature
                    </Button>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => handleSavePlan(plan)}
                      disabled={loading || !plan.planName}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                    >
                      Save Plan
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDeletePlan(plan._id)}
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

        {plans.length === 0 && <p className="text-slate-500 text-center py-8">No pricing plans added yet</p>}
      </FormSection>
    </div>
  );
}
