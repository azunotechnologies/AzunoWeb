import { motion } from 'motion/react';
import { useContent } from '../../contexts/ContentContext';
import { Linkedin, Twitter, Github, Download, X } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { MediaGrid } from '../media/MediaGrid';
import { PDFViewer } from '../media/PDFViewer';
import { useState } from 'react';
import type { TeamMember } from '../../contexts/ContentContext';

export function AboutPage() {
  const { siteSettings, teamMembers } = useContent();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            About {siteSettings.companyName}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {siteSettings.tagline}
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We're on a mission to empower businesses with cutting-edge technology solutions that drive growth,
                  efficiency, and innovation. Through expertise in web development, mobile apps, AI, and automation,
                  we transform ideas into reality and help our clients stay ahead in the digital age.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Our Vision
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  To be the world's most trusted technology partner, known for delivering exceptional solutions
                  that push boundaries and create lasting impact. We envision a future where technology seamlessly
                  integrates with business to unlock unprecedented possibilities.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Innovation First',
                description: 'We embrace cutting-edge technologies and creative solutions to stay ahead of the curve.'
              },
              {
                title: 'Client Success',
                description: 'Your success is our success. We\'re committed to delivering results that exceed expectations.'
              },
              {
                title: 'Quality Excellence',
                description: 'We maintain the highest standards in everything we do, from code to customer service.'
              },
              {
                title: 'Transparent Communication',
                description: 'Open, honest dialogue builds trust and ensures project success from start to finish.'
              },
              {
                title: 'Continuous Learning',
                description: 'We invest in our team\'s growth to bring you the latest expertise and best practices.'
              },
              {
                title: 'Sustainable Impact',
                description: 'Building solutions that create long-term value while being mindful of our environmental footprint.'
              }
            ].map((value, index) => (
              <Card
                key={index}
                className="border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto py-20 border-t border-slate-200 dark:border-slate-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Talented professionals passionate about technology and committed to your success
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.sort((a, b) => a.order - b.order).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Card className="border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-slate-100 dark:border-slate-800"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border-4 border-slate-100 dark:border-slate-800">
                        <span className="text-4xl font-bold text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                      {member.bio}
                    </p>

                    {/* Portfolio & Resume Preview */}
                    <div className="mb-4 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      {(member.portfolioItems && member.portfolioItems.length > 0) && (
                        <div>Portfolio: {member.portfolioItems.length} items</div>
                      )}
                      {member.pdfResume && (
                        <div>Resume available</div>
                      )}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3 mb-4">
                      {member.socialLinks?.linkedin && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                          <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-5 h-5" />
                          </a>
                        </Button>
                      )}
                      {member.socialLinks?.twitter && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                          <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="w-5 h-5" />
                          </a>
                        </Button>
                      )}
                      {member.socialLinks?.github && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                          <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-5 h-5" />
                          </a>
                        </Button>
                      )}
                    </div>

                    {/* View Profile Button */}
                    {(member.portfolioItems?.length || 0) > 0 || member.pdfResume ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => setSelectedMember(member)}
                      >
                        View Full Profile
                      </Button>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Projects Delivered', value: '200+' },
            { label: 'Happy Clients', value: '150+' },
            { label: 'Team Members', value: '25+' },
            { label: 'Years Experience', value: '10+' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Team Member Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-start p-6 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10">
              <div className="flex items-center gap-4">
                {selectedMember.image ? (
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedMember.name}
                  </h2>
                  <p className="text-indigo-600 dark:text-indigo-400">
                    {selectedMember.role}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Bio */}
              {selectedMember.bio && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    About
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {selectedMember.bio}
                  </p>
                </div>
              )}

              {/* Portfolio */}
              {selectedMember.portfolioItems && selectedMember.portfolioItems.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Portfolio
                  </h3>
                  <MediaGrid
                    items={selectedMember.portfolioItems.map((item, idx) => ({
                      id: `portfolio-${idx}`,
                      image: item.image,
                      title: item.title,
                      description: item.description
                    }))}
                    columns={2}
                  />
                </div>
              )}

              {/* Resume */}
              {selectedMember.pdfResume && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    Resume
                  </h3>
                  <PDFViewer
                    url={selectedMember.pdfResume}
                    fileName={`${selectedMember.name}-Resume.pdf`}
                  />
                </div>
              )}

              {/* Social Links */}
              {selectedMember.socialLinks && (selectedMember.socialLinks.linkedin || selectedMember.socialLinks.twitter || selectedMember.socialLinks.github) && (
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    Connect
                  </h3>
                  <div className="flex gap-3">
                    {selectedMember.socialLinks?.linkedin && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <a href={selectedMember.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {selectedMember.socialLinks?.twitter && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <a href={selectedMember.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="w-4 h-4 mr-2" />
                          Twitter
                        </a>
                      </Button>
                    )}
                    {selectedMember.socialLinks?.github && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <a href={selectedMember.socialLinks.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
