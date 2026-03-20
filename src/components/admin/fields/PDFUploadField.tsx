import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { FormField } from './FormField';
import { uploadPDF } from '../../../api/upload';
import { FileText, X, Loader2, Download } from 'lucide-react';

interface PDFUploadFieldProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  required?: boolean;
  description?: string;
  folder?: string;
}

export function PDFUploadField({
  label,
  value,
  onChange,
  onRemove,
  required,
  description,
  folder = 'pdfs',
}: PDFUploadFieldProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await uploadPDF(file, folder);
      onChange(response.data.url);
    } catch (err: any) {
      setError(err?.message || 'Failed to upload PDF');
    } finally {
      setLoading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleRemove = () => {
    onChange('');
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
        {/* File Input */}
        <Input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          disabled={loading}
        />

        {/* Info */}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Maximum file size: 10MB. Only PDF files allowed.
        </p>

        {/* Current PDF Display */}
        {value && (
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <FileText className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex-1 truncate">
                PDF Document
              </span>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors"
              >
                <Download className="w-4 h-4 text-blue-600" />
              </a>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>

            {/* PDF Preview Link */}
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Preview PDF →
            </a>
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Uploading PDF...</span>
          </div>
        )}
      </div>
    </FormField>
  );
}
