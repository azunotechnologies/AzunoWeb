import { motion } from 'motion/react';
import { ArrowRight, Globe, Smartphone, Brain, Zap, Cloud, Palette } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useContent } from '../../contexts/ContentContext';
import { Link } from 'react-router';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export function HomePage() {
  const { hero, services, testimonials, siteSettings } = useContent();
  
  const featuredServices = services.sort((a, b) => a.order - b.order).slice(0, 6);

  const stats = [
    { value: '200+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Available' },
    { value: '10+', label: 'Years Experience' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-indigo-500/10 dark:bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span className="text-indigo-600 dark:text-indigo-300">{siteSettings.tagline}</span>
              </div>
              <h1 className="text-5xl lg:text-6xl text-slate-900 dark:text-white mb-6">
                {hero.title}
              </h1>
              <h2 className="text-3xl lg:text-4xl mb-6">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {hero.subtitle}
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                {hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={hero.ctaLink || "/contact"}>
                  <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                    <span>{hero.ctaText || "Get Started"}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/portfolio">
                  <button className="px-8 py-4 bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors border border-slate-300 dark:border-slate-700">
                    View Our Work
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760346546767-95b89356a6bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzM5NzIzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Software Development"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full blur-3xl opacity-50" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-3xl opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-100 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl text-slate-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive technology solutions to power your digital transformation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to="/services">
                  <Card className="h-full group border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:border-indigo-500/50 transition-all hover:-translate-y-1 shadow-sm hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                        {service.icon === 'Globe' && <Globe className="w-6 h-6" />}
                        {service.icon === 'Smartphone' && <Smartphone className="w-6 h-6" />}
                        {service.icon === 'Brain' && <Brain className="w-6 h-6" />}
                        {service.icon === 'Zap' && <Zap className="w-6 h-6" />}
                        {service.icon === 'Cloud' && <Cloud className="w-6 h-6" />}
                        {service.icon === 'Palette' && <Palette className="w-6 h-6" />}
                      </div>
                      <h3 className="text-xl text-slate-900 dark:text-white mb-2">{service.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors inline-flex items-center gap-2">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-slate-100 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl text-slate-900 dark:text-white mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Don't just take our word for it
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.sort((a, b) => a.order - b.order).slice(0, 2).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-500 text-xl">★</span>
                        ))}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg italic">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-4">
                        {testimonial.image ? (
                          <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role} at {testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="relative z-10 text-center">
              <h2 className="text-4xl text-white mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Let's discuss how our technology solutions can help you achieve your goals and stay ahead of the competition.
              </p>
              <Link to="/contact">
                <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl">
                  Schedule a Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}