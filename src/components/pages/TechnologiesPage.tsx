import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import apiClient from '../../api/client';

export function TechnologiesPage() {
  const [technologies, setTechnologies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/technologies');
      if (response.data.success) {
        setTechnologies(response.data.groupedByCategory || {});
      }
    } catch (err) {
      setError('Failed to load technologies');
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

  const categories = Object.keys(technologies).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pt-16 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Our Technology Stack
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We leverage cutting-edge technologies to deliver scalable, secure, and high-performance solutions for our clients.
          </p>
        </div>

        {/* Technologies by Category */}
        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{category}</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {technologies[category]?.map((tech) => (
                  <a
                    key={tech._id}
                    href={tech.website || '#'}
                    target={tech.website ? '_blank' : undefined}
                    rel={tech.website ? 'noopener noreferrer' : undefined}
                    className="group"
                  >
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col items-center justify-center text-center hover:scale-105 hover:-translate-y-1">
                      {/* Logo */}
                      {tech.logo?.url && (
                        <img
                          src={tech.logo.url}
                          alt={tech.name}
                          className="w-16 h-16 mb-4 object-contain group-hover:scale-110 transition-transform"
                        />
                      )}

                      {/* Name */}
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2 truncate w-full">
                        {tech.name}
                      </h3>

                      {/* Proficiency Bar */}
                      <div className="w-full mb-3">
                        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
                            style={{ width: `${tech.proficiency}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{tech.proficiency}% Proficiency</p>
                      </div>

                      {/* Description */}
                      {tech.description && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {tech.description}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg">No technologies added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
