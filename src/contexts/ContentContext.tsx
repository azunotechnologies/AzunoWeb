import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import apiClient from '../api/client';

// ==================== TYPES ====================

export interface SiteSettings {
  companyName: string;
  tagline: string;
  logo?: string;
  favicon?: string;
  defaultTheme: 'light' | 'dark' | 'system';
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
  };
  pageVisibility?: {
    services: boolean;
    technologies: boolean;
    pricing: boolean;
    careers: boolean;
    blog: boolean;
    portfolio: boolean;
    about: boolean;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string; // lucide-react icon name
  image?: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  image?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  publishedDate: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  image?: string;
  rating: number;
  order: number;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

// ==================== CONTEXT TYPE ====================

interface ContentContextType {
  siteSettings: SiteSettings;
  hero: HeroContent;
  services: Service[];
  projects: Project[];
  teamMembers: TeamMember[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  contactSubmissions: ContactSubmission[];
  
  updateSiteSettings: (settings: SiteSettings) => void;
  updateHero: (hero: HeroContent) => void;
  updateServices: (services: Service[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateTeamMembers: (members: TeamMember[]) => void;
  updateBlogPosts: (posts: BlogPost[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  addContactSubmission: (submission: Omit<ContactSubmission, 'id' | 'date' | 'status'>) => void;
  updateContactSubmission: (id: string, status: ContactSubmission['status']) => void;
}

// ==================== DEFAULT DATA ====================

const defaultSiteSettings: SiteSettings = {
  companyName: 'AZUNO Technologies',
  tagline: 'Crafting Digital Excellence',
  defaultTheme: 'system',
  contactInfo: {
    email: 'hello@azunotech.com',
    phone: '+1 (555) 123-4567',
    address: '123 Innovation Drive, Tech Valley, CA 94000'
  },
  socialLinks: {
    linkedin: 'https://linkedin.com/company/azunotech',
    twitter: 'https://twitter.com/azunotech',
    github: 'https://github.com/azunotech',
    facebook: 'https://facebook.com/azunotech'
  }
};

const defaultHero: HeroContent = {
  title: 'AZUNO Technologies',
  subtitle: 'Crafting Digital Excellence',
  description: 'We build cutting-edge web solutions, mobile apps, and AI-powered applications that transform businesses and elevate user experiences.',
  ctaText: 'Start Your Project',
  ctaLink: '/contact'
};

const defaultServices: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies like React, Next.js, and Node.js. Responsive, fast, and scalable solutions.',
    features: [
      'Progressive Web Applications (PWA)',
      'E-commerce platforms',
      'Enterprise web applications',
      'API development & integration',
      'Database design & optimization'
    ],
    icon: 'Globe',
    order: 1
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android using React Native, Flutter, and Swift/Kotlin.',
    features: [
      'iOS & Android native apps',
      'Cross-platform development',
      'App Store deployment',
      'Push notifications & analytics',
      'Offline-first architecture'
    ],
    icon: 'Smartphone',
    order: 2
  },
  {
    id: '3',
    title: 'AI Solutions',
    description: 'Leverage artificial intelligence and machine learning to automate processes, gain insights, and enhance decision-making.',
    features: [
      'Generative AI integration',
      'Natural language processing',
      'Computer vision & image recognition',
      'Predictive analytics',
      'Custom AI model development'
    ],
    icon: 'Brain',
    order: 3
  },
  {
    id: '4',
    title: 'Automation & Integration',
    description: 'Streamline workflows and connect systems with custom automation solutions and seamless third-party integrations.',
    features: [
      'Business process automation',
      'API integrations',
      'Workflow optimization',
      'Legacy system modernization',
      'Data migration & synchronization'
    ],
    icon: 'Zap',
    order: 4
  },
  {
    id: '5',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment using AWS, Azure, and Google Cloud Platform.',
    features: [
      'Cloud architecture design',
      'Serverless applications',
      'DevOps & CI/CD pipelines',
      'Container orchestration (Kubernetes)',
      'Cloud migration services'
    ],
    icon: 'Cloud',
    order: 5
  },
  {
    id: '6',
    title: 'UI/UX Design & Development',
    description: 'Beautiful, intuitive user interfaces combined with exceptional user experience design and implementation.',
    features: [
      'User interface design',
      'User experience research',
      'Prototyping & wireframing',
      'Design system development',
      'Responsive & accessible design'
    ],
    icon: 'Palette',
    order: 6
  }
];

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'FinTech Mobile Banking App',
    client: 'SecureBank Corp',
    category: 'Mobile Development',
    description: 'A comprehensive mobile banking solution with biometric authentication and real-time transaction tracking.',
    challenge: 'The client needed a secure, user-friendly mobile banking app that could handle millions of transactions while maintaining top-tier security standards.',
    solution: 'Built a cross-platform mobile app using React Native with end-to-end encryption, biometric authentication, and real-time fraud detection powered by AI.',
    results: [
      '2M+ downloads in first 6 months',
      '98% user satisfaction rate',
      '60% reduction in customer support calls',
      'Zero security breaches since launch'
    ],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS', 'TensorFlow'],
    featured: true,
    order: 1
  },
  {
    id: '2',
    title: 'E-Commerce Platform Redesign',
    client: 'StyleHub Fashion',
    category: 'Web Development',
    description: 'Complete overhaul of an outdated e-commerce platform with modern design and enhanced performance.',
    challenge: 'High bounce rates and slow page load times were resulting in significant revenue loss and poor user experience.',
    solution: 'Rebuilt the platform using Next.js with server-side rendering, implemented advanced caching strategies, and created a modern, intuitive design system.',
    results: [
      '150% increase in conversion rate',
      '70% faster page load times',
      '40% increase in average order value',
      '200% growth in mobile sales'
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Stripe'],
    featured: true,
    order: 2
  },
  {
    id: '3',
    title: 'AI-Powered Content Generator',
    client: 'ContentPro Media',
    category: 'AI Solutions',
    description: 'An intelligent content generation platform that creates blog posts, social media content, and marketing copy.',
    challenge: 'Marketing teams spent excessive time creating content variations for different platforms and audiences.',
    solution: 'Developed an AI-powered platform using GPT-4 and custom fine-tuned models to generate high-quality, brand-aligned content across multiple formats.',
    results: [
      '80% reduction in content creation time',
      '10,000+ pieces of content generated monthly',
      '95% approval rate for generated content',
      '$500K annual cost savings'
    ],
    technologies: ['Python', 'GPT-4', 'FastAPI', 'React', 'PostgreSQL'],
    featured: true,
    order: 3
  }
];

const defaultTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former software architect with 15+ years of experience building scalable solutions for Fortune 500 companies.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahchen',
      twitter: 'https://twitter.com/sarahchen'
    },
    order: 1
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'Full-stack developer and AI enthusiast passionate about leveraging technology to solve complex problems.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mrodriguez',
      github: 'https://github.com/mrodriguez'
    },
    order: 2
  },
  {
    id: '3',
    name: 'Emily Thompson',
    role: 'Head of Design',
    bio: 'Award-winning UX designer focused on creating intuitive and accessible digital experiences.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/emilythompson'
    },
    order: 3
  }
];

const defaultBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Web Development',
    excerpt: 'Explore how artificial intelligence is transforming the way we build web applications in 2025 and beyond.',
    content: 'Artificial intelligence is revolutionizing web development...',
    author: 'Michael Rodriguez',
    category: 'AI & Technology',
    tags: ['AI', 'Web Development', 'Future Tech'],
    publishedDate: '2025-03-15',
    featured: true
  },
  {
    id: '2',
    title: '10 Best Practices for React Performance',
    excerpt: 'Learn essential techniques to optimize your React applications for maximum speed and efficiency.',
    content: 'Performance optimization is crucial for modern web applications...',
    author: 'Sarah Chen',
    category: 'Development',
    tags: ['React', 'Performance', 'Best Practices'],
    publishedDate: '2025-03-10',
    featured: false
  }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'John Smith',
    company: 'TechCorp Inc.',
    role: 'CEO',
    content: 'AZUNO Technologies transformed our digital presence. Their expertise in AI and web development exceeded all expectations.',
    rating: 5,
    order: 1
  },
  {
    id: '2',
    name: 'Lisa Wang',
    company: 'StartupHub',
    role: 'Product Manager',
    content: 'The team at AZUNO delivered our mobile app ahead of schedule with exceptional quality. Highly recommend!',
    rating: 5,
    order: 2
  }
];

// ==================== CONTEXT PROVIDER ====================

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    if (typeof window === 'undefined') return defaultSiteSettings;
    const saved = localStorage.getItem('siteSettings');
    return saved ? JSON.parse(saved) : defaultSiteSettings;
  });

  const [hero, setHero] = useState<HeroContent>(() => {
    if (typeof window === 'undefined') return defaultHero;
    const saved = localStorage.getItem('heroContent');
    return saved ? JSON.parse(saved) : defaultHero;
  });

  const [services, setServices] = useState<Service[]>(() => {
    if (typeof window === 'undefined') return defaultServices;
    const saved = localStorage.getItem('services');
    return saved ? JSON.parse(saved) : defaultServices;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window === 'undefined') return defaultProjects;
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    if (typeof window === 'undefined') return defaultTeamMembers;
    const saved = localStorage.getItem('teamMembers');
    return saved ? JSON.parse(saved) : defaultTeamMembers;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    if (typeof window === 'undefined') return defaultBlogPosts;
    const saved = localStorage.getItem('blogPosts');
    return saved ? JSON.parse(saved) : defaultBlogPosts;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    if (typeof window === 'undefined') return defaultTestimonials;
    const saved = localStorage.getItem('testimonials');
    return saved ? JSON.parse(saved) : defaultTestimonials;
  });

  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('contactSubmissions');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('heroContent', JSON.stringify(hero));
  }, [hero]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('contactSubmissions', JSON.stringify(contactSubmissions));
  }, [contactSubmissions]);

  // Fetch from API on mount (if available)
  useEffect(() => {
    const fetchFromAPI = async () => {
      try {
        const response = await apiClient.get('/data/all');
        if (response.data.success && response.data.data) {
          const data = response.data.data;
          if (data.siteSettings) setSiteSettings(data.siteSettings);
          if (data.heroContent) setHero(data.heroContent);
          if (data.services) setServices(data.services);
          if (data.projects) setProjects(data.projects);
          if (data.teamMembers) setTeamMembers(data.teamMembers);
          if (data.blogPosts) setBlogPosts(data.blogPosts);
          if (data.testimonials) setTestimonials(data.testimonials);
        }
      } catch (err) {
        // Silently fail - use localStorage as fallback
        console.debug('API data fetch not available, using localStorage');
      }
    };

    fetchFromAPI();
  }, []);

  // Update functions
  const updateSiteSettings = async (newSettings: SiteSettings) => {
    try {
      await apiClient.put('/data/site-settings', newSettings);
      setSiteSettings(newSettings);
    } catch (error) {
      console.error('Failed to save site settings:', error);
      setSiteSettings(newSettings); // Still update locally in case API is offline
    }
  };

  const updateHero = async (newHero: HeroContent) => {
    try {
      await apiClient.put('/data/hero', newHero);
      setHero(newHero);
    } catch (error) {
      console.error('Failed to save hero content:', error);
      setHero(newHero);
    }
  };

  const updateServices = async (newServices: Service[]) => {
    try {
      await apiClient.put('/data/services', { services: newServices });
      setServices(newServices);
    } catch (error) {
      console.error('Failed to save services:', error);
      setServices(newServices);
    }
  };

  const updateProjects = async (newProjects: Project[]) => {
    try {
      await apiClient.put('/data/projects', { projects: newProjects });
      setProjects(newProjects);
    } catch (error) {
      console.error('Failed to save projects:', error);
      setProjects(newProjects);
    }
  };

  const updateTeamMembers = async (newMembers: TeamMember[]) => {
    try {
      await apiClient.put('/data/team-members', { teamMembers: newMembers });
      setTeamMembers(newMembers);
    } catch (error) {
      console.error('Failed to save team members:', error);
      setTeamMembers(newMembers);
    }
  };

  const updateBlogPosts = async (newPosts: BlogPost[]) => {
    try {
      await apiClient.put('/data/blog-posts', { blogPosts: newPosts });
      setBlogPosts(newPosts);
    } catch (error) {
      console.error('Failed to save blog posts:', error);
      setBlogPosts(newPosts);
    }
  };

  const updateTestimonials = async (newTestimonials: Testimonial[]) => {
    try {
      await apiClient.put('/data/testimonials', { testimonials: newTestimonials });
      setTestimonials(newTestimonials);
    } catch (error) {
      console.error('Failed to save testimonials:', error);
      setTestimonials(newTestimonials);
    }
  };

  const addContactSubmission = (submission: Omit<ContactSubmission, 'id' | 'date' | 'status'>) => {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'new'
    };
    setContactSubmissions(prev => [newSubmission, ...prev]);
  };

  const updateContactSubmission = (id: string, status: ContactSubmission['status']) => {
    setContactSubmissions(prev => 
      prev.map(sub => sub.id === id ? { ...sub, status } : sub)
    );
  };

  return (
    <ContentContext.Provider value={{
      siteSettings,
      hero,
      services,
      projects,
      teamMembers,
      blogPosts,
      testimonials,
      contactSubmissions,
      updateSiteSettings,
      updateHero,
      updateServices,
      updateProjects,
      updateTeamMembers,
      updateBlogPosts,
      updateTestimonials,
      addContactSubmission,
      updateContactSubmission
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
}
