import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Link } from 'react-router';
import apiClient from '../../api/client';

export function PricingPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setError('Failed to load pricing');
      console.error(err);
    } finally {
      setLoading(false);
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

  const addons = [
    {
      name: 'AI Integration',
      description: 'Add intelligent features powered by AI',
      price: 'From $1,500'
    },
    {
      name: 'Mobile App',
      description: 'iOS and Android native or cross-platform apps',
      price: 'From $8,000'
    },
    {
      name: 'Automation Setup',
      description: 'Workflow automation and system integrations',
      price: 'From $2,000'
    },
    {
      name: 'Ongoing Maintenance',
      description: 'Monthly support, updates, and improvements',
      price: 'From $500/month'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Pricing Plans Section */}
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
              Transparent, Flexible Pricing
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Choose the perfect plan for your business needs. All plans include essential features with 24/7 support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={plan.popular ? 'md:scale-105 md:z-10' : ''}
              >
                <Card className={`h-full flex flex-col ${
                  plan.popular
                    ? 'border-2 border-indigo-600 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900/20 dark:to-slate-800'
                    : 'bg-white dark:bg-slate-800'
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {plan.planName}
                      </h3>
                      {plan.popular && (
                        <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-slate-900 dark:text-white">
                        ${plan.price}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400 ml-2">
                        /{plan.billingCycle}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features?.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600 dark:text-slate-400 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/contact" className="block">
                      <button className={`w-full py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 font-medium ${
                        plan.popular
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}>
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Enhance your project with these premium add-ons
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {addon.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  {addon.description}
                </p>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold">
                  {addon.price}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Still have questions?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Our team is ready to help you find the perfect solution for your business.
          </p>
          <Link to="/contact">
            <button className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow">
              Get in Touch
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
