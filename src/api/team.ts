import apiClient from './client';

export interface PortfolioItem {
  image: string;
  title: string;
  description: string;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  portfolioItems?: PortfolioItem[];
  pdfResume?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  order: number;
}

export interface CreateTeamMemberRequest extends Omit<TeamMember, 'id'> {}
export interface UpdateTeamMemberRequest extends Partial<TeamMember> {}

// Get all team members
export const getTeamMembers = async () => {
  const response = await apiClient.get<{ success: boolean; count: number; data: TeamMember[] }>(
    '/team'
  );

  return response.data.data;
};

// Get single team member by ID
export const getTeamMember = async (id: string) => {
  const response = await apiClient.get<{ success: boolean; data: TeamMember }>(
    `/team/${id}`
  );

  return response.data.data;
};

// Create new team member
export const createTeamMember = async (data: CreateTeamMemberRequest) => {
  const response = await apiClient.post<{ success: boolean; data: TeamMember }>(
    '/team',
    data
  );

  return response.data.data;
};

// Update team member
export const updateTeamMember = async (id: string, data: UpdateTeamMemberRequest) => {
  const response = await apiClient.put<{ success: boolean; data: TeamMember }>(
    `/team/${id}`,
    data
  );

  return response.data.data;
};

// Delete team member
export const deleteTeamMember = async (id: string) => {
  const response = await apiClient.delete<{ success: boolean; message: string }>(
    `/team/${id}`
  );

  return response.data;
};

// Add portfolio item to team member
export const addPortfolioItem = async (
  memberId: string,
  item: PortfolioItem
) => {
  const member = await getTeamMember(memberId);
  const portfolioItems = [...(member.portfolioItems || []), item];

  return updateTeamMember(memberId, { portfolioItems });
};

// Remove portfolio item
export const removePortfolioItem = async (
  memberId: string,
  itemIndex: number
) => {
  const member = await getTeamMember(memberId);
  const portfolioItems = (member.portfolioItems || []).filter(
    (_, index) => index !== itemIndex
  );

  return updateTeamMember(memberId, { portfolioItems });
};

// Reorder portfolio items
export const reorderPortfolioItems = async (
  memberId: string,
  portfolioItems: PortfolioItem[]
) => {
  const reordered = portfolioItems.map((item, index) => ({
    ...item,
    order: index,
  }));

  return updateTeamMember(memberId, { portfolioItems: reordered });
};

// Update team member profile image
export const updateTeamMemberImage = async (
  memberId: string,
  imageUrl: string
) => {
  return updateTeamMember(memberId, { image: imageUrl });
};

// Update team member resume
export const updateTeamMemberResume = async (
  memberId: string,
  pdfUrl: string
) => {
  return updateTeamMember(memberId, { pdfResume: pdfUrl });
};

// Update team member social links
export const updateTeamMemberSocialLinks = async (
  memberId: string,
  socialLinks: TeamMember['socialLinks']
) => {
  return updateTeamMember(memberId, { socialLinks });
};

// Reorder team members
export const reorderTeamMembers = async (
  members: Array<{ id: string; order: number }>
) => {
  const promises = members.map((member) =>
    updateTeamMember(member.id, { order: member.order })
  );

  return Promise.all(promises);
};
