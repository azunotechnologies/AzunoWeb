import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { FormField } from './FormField';
import { uploadGallery } from '../../../api/upload';
import { Image, X, Loader2, GripVertical } from 'lucide-react';

interface GalleryImage {
  url: string;
  caption?: string;
  order: number;
}

interface MultiImageGalleryFieldProps {
  label: string;
  value?: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
  maxImages?: number;
  required?: boolean;
  description?: string;
  folder?: string;
}

export function MultiImageGalleryField({
  label,
  value = [],
  onChange,
  maxImages = 20,
  required,
  description,
  folder = 'galleries',
}: MultiImageGalleryFieldProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [editingCaption, setEditingCaption] = useState<number | null>(null);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check if adding these files would exceed max
    if (value.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed. Current: ${value.length}`);
      return;
    }

    // Validate files
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setError(`File ${file.name} is too large (max 5MB)`);
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError(`File ${file.name} is not a valid image`);
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      const response = await uploadGallery(files, [], folder);

      const newImages: GalleryImage[] = response.data.images.map((img) => ({
        url: img.url,
        caption: img.caption,
        order: value.length + img.order,
      }));

      onChange([...value, ...newImages]);
    } catch (err: any) {
      setError(err?.message || 'Failed to upload images');
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedGallery = value.filter((_, i) => i !== index);
    onChange(updatedGallery.map((img, idx) => ({ ...img, order: idx })));
  };

  const handleCaptionUpdate = (index: number, caption: string) => {
    const updatedGallery = value.map((img, i) =>
      i === index ? { ...img, caption } : img
    );
    onChange(updatedGallery);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const newGallery = [...value];
    const [draggedItem] = newGallery.splice(draggedIndex, 1);
    newGallery.splice(index, 0, draggedItem);

    newGallery.forEach((img, idx) => {
      img.order = idx;
    });

    onChange(newGallery);
    setDraggedIndex(null);
  };

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      description={description}
    >
      <div className="space-y-4">
        {/* Upload Area */}
        {value.length < maxImages && (
          <div className="space-y-2">
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFilesChange}
              disabled={loading}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Upload up to {maxImages - value.length} more images. Max 5MB each.
            </p>
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Uploading images...</span>
          </div>
        )}

        {/* Gallery View */}
        {value.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {value.length} image{value.length !== 1 ? 's' : ''} ({maxImages} max)
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {value.map((image, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className={`space-y-2 p-2 rounded-lg border-2 cursor-move transition-colors ${
                    draggedIndex === index
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-square rounded overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={image.url}
                      alt={`Gallery ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Caption Input */}
                  {editingCaption === index ? (
                    <input
                      type="text"
                      value={image.caption || ''}
                      onChange={(e) =>
                        handleCaptionUpdate(index, e.target.value)
                      }
                      onBlur={() => setEditingCaption(null)}
                      placeholder="Add caption..."
                      autoFocus
                      className="w-full px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                    />
                  ) : (
                    <div
                      onClick={() => setEditingCaption(index)}
                      className="px-2 py-1 text-xs text-slate-600 dark:text-slate-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                    >
                      {image.caption || 'Click to add caption'}
                    </div>
                  )}

                  {/* Drag Handle */}
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-xs py-1">
                    <GripVertical className="w-3 h-3" />
                    <span>Drag to reorder</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {value.length === 0 && !loading && (
          <div className="text-center py-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
            <Image className="w-8 h-8 mx-auto mb-2 text-slate-400" />
            <p className="text-sm text-slate-600 dark:text-slate-400">
              No images yet. Upload images to get started.
            </p>
          </div>
        )}
      </div>
    </FormField>
  );
}
