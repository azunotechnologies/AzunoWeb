import apiClient from './client';

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  image?: string;
  companyLogo?: string;
  videoUrl?: string;
  rating: number;
  order: number;
  active: boolean;
}

export interface CreateTestimonialRequest extends Omit<Testimonial, 'id'> {}
export interface UpdateTestimonialRequest extends Partial<Testimonial> {}

// Get all testimonials
export const getTestimonials = async () => {
  const response = await apiClient.get<{ success: boolean; count: number; data: Testimonial[] }>(
    '/testimonials'
  );

  return response.data.data;
};

// Get single testimonial by ID
export const getTestimonial = async (id: string) => {
  const response = await apiClient.get<{ success: boolean; data: Testimonial }>(
    `/testimonials/${id}`
  );

  return response.data.data;
};

// Create new testimonial
export const createTestimonial = async (data: CreateTestimonialRequest) => {
  const response = await apiClient.post<{ success: boolean; data: Testimonial }>(
    '/testimonials',
    data
  );

  return response.data.data;
};

// Update testimonial
export const updateTestimonial = async (id: string, data: UpdateTestimonialRequest) => {
  const response = await apiClient.put<{ success: boolean; data: Testimonial }>(
    `/testimonials/${id}`,
    data
  );

  return response.data.data;
};

// Delete testimonial
export const deleteTestimonial = async (id: string) => {
  const response = await apiClient.delete<{ success: boolean; message: string }>(
    `/testimonials/${id}`
  );

  return response.data;
};

// Update testimonial image
export const updateTestimonialImage = async (
  testimonialId: string,
  imageUrl: string
) => {
  return updateTestimonial(testimonialId, { image: imageUrl });
};

// Update company logo
export const updateCompanyLogo = async (
  testimonialId: string,
  logoUrl: string
) => {
  return updateTestimonial(testimonialId, { companyLogo: logoUrl });
};

// Update testimonial video
export const updateTestimonialVideo = async (
  testimonialId: string,
  videoUrl: string
) => {
  return updateTestimonial(testimonialId, { videoUrl });
};

// Update testimonial rating
export const updateTestimonialRating = async (
  testimonialId: string,
  rating: number
) => {
  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  return updateTestimonial(testimonialId, { rating });
};

// Reorder testimonials
export const reorderTestimonials = async (
  testimonials: Array<{ id: string; order: number }>
) => {
  const promises = testimonials.map((testimonial) =>
    updateTestimonial(testimonial.id, { order: testimonial.order })
  );

  return Promise.all(promises);
};

// Toggle testimonial active status
export const toggleTestimonialActive = async (
  testimonialId: string,
  active: boolean
) => {
  return updateTestimonial(testimonialId, { active });
};

// Get active testimonials (for public display)
export const getActiveTestimonials = async () => {
  const testimonials = await getTestimonials();
  return testimonials
    .filter((t) => t.active)
    .sort((a, b) => a.order - b.order);
};

// Get top-rated testimonials
export const getTopRatedTestimonials = async (limit: number = 5) => {
  const testimonials = await getActiveTestimonials();
  return testimonials
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};
