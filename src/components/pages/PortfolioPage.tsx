import { motion } from 'motion/react';
import { useContent } from '../../contexts/ContentContext';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ExternalLink, Award, X, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { useState } from 'react';
import { ImageGallery } from '../media/ImageGallery';
import { VideoPlayer } from '../media/VideoPlayer';
import { PDFViewer } from '../media/PDFViewer';
import type { Project } from '../../contexts/ContentContext';

export function PortfolioPage() {
  const { projects } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get unique categories
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  // Filter projects
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const sortedProjects = filteredProjects
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.order - b.order;
    });

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Explore our successful projects and see how we've helped businesses transform through technology
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category
                ? 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                : 'border-slate-300 dark:border-slate-700'
              }
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-0">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-t-lg overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl font-bold text-white/20">
                          {project.title.charAt(0)}
                        </div>
                      </div>
                    )}

                    {/* Media badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {project.featured && (
                        <Badge className="bg-yellow-500 text-white border-0">
                          <Award className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Media indicators */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      {project.galleryImages && project.galleryImages.length > 0 && (
                        <Badge variant="secondary" className="bg-white/90 text-slate-900 hover:bg-white">
                          <ImageIcon className="w-3 h-3 mr-1" />
                          {project.galleryImages.length}
                        </Badge>
                      )}
                      {project.videoUrl && (
                        <Badge variant="secondary" className="bg-white/90 text-slate-900 hover:bg-white">
                          <Video className="w-3 h-3 mr-1" />
                          Video
                        </Badge>
                      )}
                      {project.pdfUrl && (
                        <Badge variant="secondary" className="bg-white/90 text-slate-900 hover:bg-white">
                          <FileText className="w-3 h-3 mr-1" />
                          PDF
                        </Badge>
                      )}
                    </div>

                    {/* Hover overlay with "View Details" */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white text-indigo-600 hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Category Badge */}
                    <Badge variant="outline" className="mb-3 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400">
                      {project.category}
                    </Badge>

                    {/* Title & Client */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                      {project.client}
                    </p>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs"
                        >
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Key Results */}
                    {project.results && project.results.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                          Key Results:
                        </p>
                        <ul className="space-y-1">
                          {project.results.slice(0, 2).map((result, idx) => (
                            <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start">
                              <span className="text-indigo-600 dark:text-indigo-400 mr-2">✓</span>
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 border-slate-300 dark:border-slate-700"
                      >
                        View Full Details
                      </Button>
                      {project.liveUrl && (
                        <Button
                          variant="default"
                          size="sm"
                          asChild
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss how we can help bring your vision to life with our expertise and passion for excellence.
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="bg-white text-indigo-600 hover:bg-slate-100"
          >
            <a href="/contact">Get in Touch</a>
          </Button>
        </motion.div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-start p-6 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <p className="text-indigo-600 dark:text-indigo-400 mt-1">
                  {selectedProject.client}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Category & Badge */}
              <div className="flex gap-2">
                <Badge className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 border-0">
                  {selectedProject.category}
                </Badge>
                {selectedProject.featured && (
                  <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 border-0">
                    <Award className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Overview
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {selectedProject.description}
                </p>
              </div>

              {/* Challenge & Solution */}
              {(selectedProject.challenge || selectedProject.solution) && (
                <div className="grid md:grid-cols-2 gap-6">
                  {selectedProject.challenge && (
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        Challenge
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {selectedProject.challenge}
                      </p>
                    </div>
                  )}
                  {selectedProject.solution && (
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        Solution
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {selectedProject.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Gallery Images */}
              {selectedProject.galleryImages && selectedProject.galleryImages.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Gallery
                  </h3>
                  <ImageGallery
                    images={selectedProject.galleryImages.map(img => ({
                      url: img.url,
                      caption: img.caption
                    }))}
                  />
                </div>
              )}

              {/* Video */}
              {selectedProject.videoUrl && (
                <VideoPlayer
                  url={selectedProject.videoUrl}
                  title="Project Video"
                />
              )}

              {/* PDF Case Study */}
              {selectedProject.pdfUrl && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Case Study
                  </h3>
                  <PDFViewer
                    url={selectedProject.pdfUrl}
                    fileName="Case Study.pdf"
                  />
                </div>
              )}

              {/* Results */}
              {selectedProject.results && selectedProject.results.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    Key Results
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">✓</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                {selectedProject.liveUrl && (
                  <Button
                    variant="default"
                    asChild
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Project
                    </a>
                  </Button>
                )}
                {selectedProject.caseStudyUrl && (
                  <Button
                    variant="outline"
                    asChild
                    className="flex-1 border-slate-300 dark:border-slate-700"
                  >
                    <a href={selectedProject.caseStudyUrl} target="_blank" rel="noopener noreferrer">
                      View Case Study
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
