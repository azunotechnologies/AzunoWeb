import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { FormField } from './FormField';
import { uploadImage } from '../../../api/upload';
import { MediaLibrary } from './MediaLibrary';
import { ImageEditorModal } from './ImageEditorModal';
import { Upload, X, Loader2, Library, Edit } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  required?: boolean;
  description?: string;
  folder?: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  onRemove,
  required,
  description,
  folder = 'images',
}: ImageUploadFieldProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<string>(value || '');
  const [showLibrary, setShowLibrary] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingImage, setEditingImage] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Show local preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreview(dataUrl);
        // Auto-open editor
        setEditingImage(dataUrl);
        setShowEditor(true);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setError(err?.message || 'Failed to read image');
      setPreview('');
    } finally {
      setLoading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleEditorSave = async (editedImageUrl: string) => {
    setLoading(true);
    setError('');

    try {
      // Convert blob URL to file for upload
      const response = await fetch(editedImageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'edited-image.png', { type: 'image/png' });

      // Upload edited image
      const uploadResponse = await uploadImage(file, folder);
      onChange(uploadResponse.data.url);
      setPreview(uploadResponse.data.url);
      setShowEditor(false);
    } catch (err: any) {
      setError(err?.message || 'Failed to upload edited image');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    onRemove?.();
  };

  const handleMediaSelect = (media: any) => {
    setPreview(media.url);
    onChange(media.url);
    setShowLibrary(false);
  };

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      description={description}
    >
      <div className="space-y-4">
        {/* Library Toggle Button */}
        <button
          type="button"
          onClick={() => setShowLibrary(!showLibrary)}
          className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <Library className="w-4 h-4" />
          {showLibrary ? 'Hide Library' : 'View Library'}
        </button>

        {/* Media Library */}
        {showLibrary && (
          <MediaLibrary
            folder={folder}
            onSelect={handleMediaSelect}
            selectedUrl={preview}
            mediaType="image"
            mode="all"
          />
        )}

        {/* File Input */}
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="flex-1"
          />
          {loading && <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />}
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="relative w-full max-w-xs">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto rounded-lg border border-slate-200 dark:border-slate-700"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditingImage(preview);
                  setShowEditor(true);
                }}
                className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors shadow-lg"
                title="Edit image"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Image Editor Modal */}
        {showEditor && editingImage && (
          <ImageEditorModal
            imageUrl={editingImage}
            onSave={handleEditorSave}
            onClose={() => setShowEditor(false)}
          />
        )}

        {/* Info */}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Maximum file size: 5MB. Supported formats: JPG, PNG, GIF, SVG, WebP.
          Click edit button to crop and add rounded corners.
        </p>
      </div>
    </FormField>
  );
}

