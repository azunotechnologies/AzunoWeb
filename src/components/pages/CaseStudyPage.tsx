import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, Clock, Target } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useContent } from '../../contexts/ContentContext';
import { Link } from 'react-router';

export function CaseStudyPage() {
  const { caseStudies } = useContent();
  
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
                Success Stories
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Discover how we've helped businesses across industries transform their operations with cutting-edge AI solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 bg-slate-100 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Target className="w-6 h-6" />, value: '50+', label: 'Projects Completed' },
              { icon: <TrendingUp className="w-6 h-6" />, value: '10x', label: 'Average ROI' },
              { icon: <Clock className="w-6 h-6" />, value: '60%', label: 'Time Saved' },
              { icon: <Target className="w-6 h-6" />, value: '95%', label: 'Success Rate' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white mx-auto mb-3">
                  {stat.icon}
                </div>
                <div className="text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Image Section */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
                  <ImageWithFallback
                    src={study.image || "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjM5NTg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080"}
                    alt={study.title}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="inline-block px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300 mb-4">
                      Case Study
                    </div>
                    <h2 className="text-4xl lg:text-5xl text-white mb-2">{study.title}</h2>
                    <p className="text-xl text-slate-300">{study.client}</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Details */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl text-slate-900 dark:text-white mb-4">The Challenge</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-lg">{study.challenge}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl text-slate-900 dark:text-white mb-4">Our Solution</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-lg">{study.solution}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl text-slate-900 dark:text-white mb-4">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <div className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-indigo-600 to-purple-600' : 'from-purple-600 to-pink-600'} rounded-2xl p-8 shadow-2xl`}>
                      <h3 className="text-2xl text-white mb-8">Results</h3>
                      <div className="space-y-6">
                        {study.results.map((result, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                          >
                            <div className="text-5xl text-white mb-2">{result}</div>
                            <div className="text-indigo-100">Key Achievement</div>
                          </motion.div>
                        ))}
                      </div>
                      <Link to="/contact">
                        <button className="mt-8 w-full group px-6 py-4 bg-white text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                          <span>Discuss Your Project</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
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
                Ready to Create Your Success Story?
              </h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Let's work together to achieve exceptional results for your business.
              </p>
              <Link to="/contact">
                <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl">
                  Start Your Project
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}