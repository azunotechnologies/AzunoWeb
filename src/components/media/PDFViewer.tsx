import React, { useState } from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

interface PDFViewerProps {
  url?: string;
  title?: string;
  fileName?: string;
  className?: string;
}

export function PDFViewer({ url, title, fileName, className = '' }: PDFViewerProps) {
  const [showPreview, setShowPreview] = useState(false);

  if (!url) {
    return null;
  }

  const displayName = fileName || title || 'PDF Document';

  return (
    <div className={`space-y-2 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
      )}

      {/* PDF Card */}
      <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <FileText className="w-5 h-5 text-red-600 flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
            {displayName}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title="Preview PDF"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
          >
            <a
              href={url}
              download={displayName}
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 text-xs">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View PDF →
        </a>
        <span className="text-slate-400">•</span>
        <a
          href={url}
          download={displayName}
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Download
        </a>
      </div>
    </div>
  );
}