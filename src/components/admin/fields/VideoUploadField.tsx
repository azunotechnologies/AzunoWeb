import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { FormField } from './FormField';
import { uploadVideo } from '../../../api/upload';
import { Upload, X, Loader2, Play } from 'lucide-react';

interface VideoUploadFieldProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  required?: boolean;
  description?: string;
  folder?: string;
  allowURL?: boolean;
}

export function VideoUploadField({
  label,
  value,
  onChange,
  onRemove,
  required,
  description,
  folder = 'videos',
  allowURL = true,
}: VideoUploadFieldProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [uploadMode, setUploadMode] = useState<'upload' | 'url'>('upload');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (100MB)
    if (file.size > 100 * 1024 * 1024) {
      setError('File size must be less than 100MB');
      return;
    }

    // Validate file type
    const videoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    if (!videoTypes.includes(file.type)) {
      setError('Please upload a valid video file (MP4, WebM, MOV, AVI)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await uploadVideo(file, folder);
      onChange(response.data.url);
    } catch (err: any) {
      setError(err?.message || 'Failed to upload video');
    } finally {
      setLoading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleURLSubmit = () => {
    if (!urlInput.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(urlInput);
      onChange(urlInput);
      setUrlInput('');
      setUploadMode('upload');
    } catch {
      setError('Please enter a valid URL');
    }
  };

  const handleRemove = () => {
    onChange('');
    setUrlInput('');
    onRemove?.();
  };

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      description={description}
    >
      <div className="space-y-4">
        {/* Mode Selector */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setUploadMode('upload')}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              uploadMode === 'upload'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Upload Video
          </button>
          {allowURL && (
            <button
              type="button"
              onClick={() => setUploadMode('url')}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                uploadMode === 'url'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              URL
            </button>
          )}
        </div>

        {/* Upload Mode */}
        {uploadMode === 'upload' && (
          <div className="space-y-4">
            <Input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              disabled={loading}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Maximum file size: 100MB. Supported: MP4, WebM, MOV, AVI
            </p>
          </div>
        )}

        {/* URL Mode */}
        {uploadMode === 'url' && allowURL && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="Enter video URL (Cloudinary, YouTube, Vimeo, etc.)"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setError('');
                }}
              />
              <Button
                type="button"
                onClick={handleURLSubmit}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Add
              </Button>
            </div>
          </div>
        )}

        {/* Current Video Display */}
        {value && (
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <Play className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex-1 truncate">
                {value}
              </span>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>

            {/* Video Preview Link */}
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Preview Video →
            </a>
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Uploading video...</span>
          </div>
        )}
      </div>
    </FormField>
  );
}
