import { motion } from 'motion/react';
import {
  Globe, Smartphone, Brain, Zap, Cloud, Palette, Code, Database,
  Server, Cpu, Workflow, BarChart, Shield, Lock, Rocket, Target,
  TrendingUp, Users, Settings, Wrench, Check, ArrowRight
} from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { Link } from 'react-router';
import { Card, CardContent } from '../ui/card';

// Icon mapping
const iconMap: { [key: string]: any } = {
  Globe, Smartphone, Brain, Zap, Cloud, Palette, Code, Database,
  Server, Cpu, Workflow, BarChart, Shield, Lock, Rocket, Target,
  TrendingUp, Users, Settings, Wrench
};

export function ServicesPage() {
  const { services, siteSettings } = useContent();
  
  const sortedServices = services.sort((a, b) => a.order - b.order);

  const process = [
    { step: '01', title: 'Discovery', description: 'Understanding your needs and goals' },
    { step: '02', title: 'Strategy', description: 'Crafting the perfect solution' },
    { step: '03', title: 'Development', description: 'Building with cutting-edge tech' },
    { step: '04', title: 'Deployment', description: 'Launching and scaling your solution' },
  ];

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Code;
    return <IconComponent className="w-8 h-8" />;
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl text-slate-900 dark:text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Comprehensive technology solutions to power your digital transformation and drive business growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:border-indigo-500/50 transition-all hover:-translate-y-1 shadow-sm hover:shadow-lg">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                      {getIcon(service.icon)}
                    </div>
                    <h3 className="text-2xl text-slate-900 dark:text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                      {service.description}
                    </p>
                    
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl text-slate-900 dark:text-white mb-4">Our Process</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A proven approach to delivering exceptional solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-6xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent opacity-20 mb-4 font-bold">
                  {item.step}
                </div>
                <h3 className="text-2xl text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-indigo-300 to-transparent dark:from-indigo-700" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl text-slate-900 dark:text-white mb-4">Why Choose Us?</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We combine expertise, innovation, and dedication to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-6 h-6" />,
                title: 'Result-Driven',
                description: 'We focus on delivering measurable outcomes that drive your business forward'
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Expert Team',
                description: 'Skilled professionals with years of experience in modern technologies'
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Quality Assurance',
                description: 'Rigorous testing and quality control ensure flawless delivery'
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Agile Approach',
                description: 'Fast iterations and flexible methodology for rapid development'
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'Scalable Solutions',
                description: 'Built to grow with your business from startup to enterprise'
              },
              {
                icon: <Settings className="w-6 h-6" />,
                title: 'Ongoing Support',
                description: '24/7 support and maintenance to keep your systems running smoothly'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 lg:p-16 overflow-hidden shadow-2xl"
          >
            <div className="relative z-10 text-center">
              <h2 className="text-4xl text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Let's discuss how our services can help you achieve your goals.
              </p>
              <Link to="/contact">
                <button className="group px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                  Contact Us Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
