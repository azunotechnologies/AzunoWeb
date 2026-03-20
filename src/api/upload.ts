import apiClient from './client';

export interface UploadResponse {
  success: boolean;
  data: {
    url: string;
    publicId: string;
    fileName: string;
    fileType: string;
    folder: string;
  };
}

export interface GalleryUploadResponse {
  success: boolean;
  data: {
    images: Array<{
      url: string;
      publicId: string;
      fileName: string;
      order: number;
      caption: string;
    }>;
    count: number;
    folder: string;
  };
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface MediaItem {
  url: string;
  publicId: string;
  fileName: string;
  fileType: string;
  format: string;
  size: number;
  uploadedAt: string;
  width?: number;
  height?: number;
}

export interface ListMediaResponse {
  success: boolean;
  data: {
    folder: string;
    count: number;
    media: MediaItem[];
  };
}

// Upload a single image
export const uploadImage = async (
  file: File,
  folder: string = 'images'
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await apiClient.post<UploadResponse>(
    `/upload/image?folder=${folder}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

// Upload a video
export const uploadVideo = async (
  file: File,
  folder: string = 'videos'
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('video', file);

  const response = await apiClient.post<UploadResponse>(
    `/upload/video?folder=${folder}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

// Upload a PDF
export const uploadPDF = async (
  file: File,
  folder: string = 'pdfs'
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('pdf', file);

  const response = await apiClient.post<UploadResponse>(
    `/upload/pdf?folder=${folder}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

// Upload gallery images (multiple)
export const uploadGallery = async (
  files: File[],
  captions: string[] = [],
  folder: string = 'galleries'
): Promise<GalleryUploadResponse> => {
  const formData = new FormData();

  files.forEach((file, index) => {
    formData.append('images', file);
    if (captions[index]) {
      formData.append(`caption_${index}`, captions[index]);
    }
  });

  const response = await apiClient.post<GalleryUploadResponse>(
    `/upload/gallery?folder=${folder}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

// Delete media by public ID
export const deleteMedia = async (
  publicId: string,
  resourceType: string = 'image'
): Promise<DeleteResponse> => {
  const response = await apiClient.delete<DeleteResponse>(
    `/upload/media/${publicId}?resourceType=${resourceType}`
  );

  return response.data;
};

// Upload progress handler
export const uploadImageWithProgress = async (
  file: File,
  folder: string = 'images',
  onProgress?: (progress: number) => void
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await apiClient.post<UploadResponse>(
    `/upload/image?folder=${folder}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / (progressEvent.total || 1)) * 100;
        onProgress?.(Math.round(progress));
      },
    }
  );

  return response.data;
};

// List media files in a folder
export const listMediaByFolder = async (
  folder: string
): Promise<ListMediaResponse> => {
  const response = await apiClient.get<ListMediaResponse>(
    `/upload/list/${folder}`
  );

  return response.data;
};

// List all media files across all folders
export const listAllMedia = async (): Promise<ListMediaResponse> => {
  const response = await apiClient.get<ListMediaResponse>(
    `/upload/all`
  );

  return response.data;
};
