import React, { useState, useEffect } from 'react';
import { listMediaByFolder, listAllMedia, MediaItem, deleteMedia } from '../../../api/upload';
import { Loader2, X, Check, Trash2 } from 'lucide-react';
import { Button } from '../../ui/button';

interface MediaLibraryProps {
  folder: string;
  onSelect: (media: MediaItem) => void;
  selectedUrl?: string;
  mediaType?: 'image' | 'video' | 'pdf';
  mode?: 'folder' | 'all';
}

export function MediaLibrary({
  folder,
  onSelect,
  selectedUrl,
  mediaType = 'image',
  mode = 'all'
}: MediaLibraryProps) {
  const [media, setMedia] = useState<(MediaItem & { folderName?: string })[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadMedia();
  }, [folder, mode]);

  const handleDeleteMedia = async (publicId: string) => {
    try {
      setDeletingId(publicId);
      // Map mediaType to Cloudinary resourceType
      // PDFs are stored as images in Cloudinary
      const resourceType = mediaType === 'pdf' ? 'image' : mediaType;
      await deleteMedia(publicId, resourceType);
      setMedia(media.filter(m => m.publicId !== publicId));
      setDeleteConfirm(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete media');
    } finally {
      setDeletingId(null);
    }
  };

  const loadMedia = async () => {
    setLoading(true);
    setError('');
    try {
      const response = mode === 'all'
        ? await listAllMedia()
        : await listMediaByFolder(folder);

      const filtered = response.data.media.map(m => ({
        ...m,
        folderName: mode === 'all' ? (m as any).folder : folder
      })).filter(m => {
        if (mediaType === 'image') return m.fileType === 'image';
        if (mediaType === 'video') return m.fileType === 'video';
        if (mediaType === 'pdf') return m.fileType === 'pdf';
        return true;
      });
      setMedia(filtered);
    } catch (err: any) {
      setError(err.message || 'Failed to load media library');
    } finally {
      setLoading(false);
    }
  };

  const getFolderColor = (folderName?: string) => {
    if (!folderName) return 'bg-slate-100 text-slate-700';

    const colorMap: { [key: string]: string } = {
      branding: 'bg-blue-100 text-blue-700',
      services: 'bg-green-100 text-green-700',
      projects: 'bg-purple-100 text-purple-700',
      team: 'bg-orange-100 text-orange-700',
      blog: 'bg-pink-100 text-pink-700',
      testimonials: 'bg-indigo-100 text-indigo-700',
      galleries: 'bg-cyan-100 text-cyan-700',
      'hero-images': 'bg-amber-100 text-amber-700',
      images: 'bg-slate-100 text-slate-700'
    };

    return colorMap[folderName] || colorMap['images'];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={loadMedia}
          className="mt-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (media.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          No media files yet. Upload your first {mediaType}!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-slate-700 dark:text-slate-300 flex justify-between items-center">
        <span>Available {mediaType}s ({media.length})</span>
        {mode === 'all' && <span className="text-xs text-slate-500">All Folders</span>}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900/30">
        {media.map((item) => {
          const isSelected = selectedUrl === item.url;
          const isDeleting = deletingId === item.publicId;
          const showDeleteConfirm = deleteConfirm === item.publicId;

          return (
            <div
              key={item.publicId}
              className="relative group cursor-pointer"
              onClick={() => !showDeleteConfirm && onSelect(item as MediaItem)}
            >
              <div
                className={`relative overflow-hidden rounded border-2 transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                }`}
              >
                {mediaType === 'image' && item.url ? (
                  <img
                    src={item.url}
                    alt={item.fileName}
                    className="w-full aspect-square object-cover"
                  />
                ) : mediaType === 'video' ? (
                  <div className="w-full aspect-square bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🎬</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 px-1 truncate">
                        {item.fileName}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl mb-1">📄</div>
                      <div className="text-xs text-red-600 dark:text-red-400 px-1 truncate">
                        {item.fileName}
                      </div>
                    </div>
                  </div>
                )}

                {/* Folder Badge - only show in all mode */}
                {mode === 'all' && item.folderName && (
                  <div className={`absolute top-1 left-1 px-2 py-0.5 rounded-full text-xs font-medium ${getFolderColor(item.folderName)}`}>
                    {item.folderName}
                  </div>
                )}

                {/* Delete Confirmation or Actions Overlay */}
                {showDeleteConfirm ? (
                  <div className="absolute inset-0 bg-red-600/90 flex flex-col items-center justify-center gap-2 p-2">
                    <div className="text-white text-xs font-medium text-center">Delete?</div>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMedia(item.publicId);
                        }}
                        disabled={isDeleting}
                        className="flex-1 px-2 py-1 bg-white text-red-600 rounded text-xs font-medium hover:bg-red-50 disabled:opacity-50"
                      >
                        {isDeleting ? '...' : 'Yes'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirm(null);
                        }}
                        className="flex-1 px-2 py-1 bg-red-700 text-white rounded text-xs font-medium hover:bg-red-800"
                      >
                        No
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {isSelected && (
                      <div className="absolute inset-0 bg-indigo-600/20 flex items-center justify-center">
                        <Check className="w-6 h-6 text-indigo-600" />
                      </div>
                    )}

                    {/* Delete Button - Show on Hover */}
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirm(item.publicId);
                        }}
                        className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors shadow-lg"
                        title="Delete this image"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 truncate mt-1 px-1">
                {item.fileName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
