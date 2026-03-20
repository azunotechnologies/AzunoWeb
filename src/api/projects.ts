import apiClient from './client';

export interface GalleryImage {
  url: string;
  caption?: string;
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
  galleryImages?: GalleryImage[];
  videoUrl?: string;
  pdfUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  order: number;
}

export interface CreateProjectRequest extends Omit<Project, 'id'> {}
export interface UpdateProjectRequest extends Partial<Project> {}

// Get all projects
export const getProjects = async (filters?: { featured?: boolean; category?: string }) => {
  const params = new URLSearchParams();
  if (filters?.featured) params.append('featured', 'true');
  if (filters?.category) params.append('category', filters.category);

  const response = await apiClient.get<{ success: boolean; count: number; data: Project[] }>(
    `/projects${params.toString() ? '?' + params.toString() : ''}`
  );

  return response.data.data;
};

// Get single project by ID
export const getProject = async (id: string) => {
  const response = await apiClient.get<{ success: boolean; data: Project }>(
    `/projects/${id}`
  );

  return response.data.data;
};

// Create new project
export const createProject = async (data: CreateProjectRequest) => {
  const response = await apiClient.post<{ success: boolean; data: Project }>(
    '/projects',
    data
  );

  return response.data.data;
};

// Update project
export const updateProject = async (id: string, data: UpdateProjectRequest) => {
  const response = await apiClient.put<{ success: boolean; data: Project }>(
    `/projects/${id}`,
    data
  );

  return response.data.data;
};

// Delete project
export const deleteProject = async (id: string) => {
  const response = await apiClient.delete<{ success: boolean; message: string }>(
    `/projects/${id}`
  );

  return response.data;
};

// Add image to project gallery
export const addGalleryImage = async (
  projectId: string,
  galleryImages: GalleryImage[]
) => {
  const response = await apiClient.put<{ success: boolean; data: Project }>(
    `/projects/${projectId}`,
    { galleryImages }
  );

  return response.data.data;
};

// Remove image from gallery
export const removeGalleryImage = async (
  projectId: string,
  publicId: string
) => {
  const project = await getProject(projectId);
  const updatedGallery = (project.galleryImages || []).filter(
    (img) => img.url.includes(publicId) === false
  );

  return updateProject(projectId, { galleryImages: updatedGallery });
};

// Reorder gallery images
export const reorderGalleryImages = async (
  projectId: string,
  galleryImages: GalleryImage[]
) => {
  const reordered = galleryImages.map((img, index) => ({
    ...img,
    order: index,
  }));

  return updateProject(projectId, { galleryImages: reordered });
};

// Update project media (video, PDF)
export const updateProjectMedia = async (
  projectId: string,
  media: { videoUrl?: string; pdfUrl?: string }
) => {
  return updateProject(projectId, media);
};
