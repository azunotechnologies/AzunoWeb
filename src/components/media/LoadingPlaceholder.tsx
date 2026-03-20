import React from 'react';

interface LoadingPlaceholderProps {
  count?: number;
  columns?: 1 | 2 | 3 | 4;
  variant?: 'image' | 'text' | 'card';
}

export function LoadingPlaceholder({
  count = 3,
  columns = 3,
  variant = 'image'
}: LoadingPlaceholderProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  const skeletons = Array.from({ length: count });

  if (variant === 'text') {
    return (
      <div className="space-y-3">
        {skeletons.map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`grid grid-cols-1 ${gridClass} gap-4`}>
        {skeletons.map((_, i) => (
          <div key={i} className="space-y-3">
            {/* Image skeleton */}
            <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />

            {/* Title */}
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse" />

            {/* Description lines */}
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/5 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: image variant
  return (
    <div className={`grid grid-cols-1 ${gridClass} gap-4`}>
      {skeletons.map((_, i) => (
        <div key={i} className="space-y-3">
          {/* Aspect square image skeleton */}
          <div className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />

          {/* Title skeleton */}
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse" />

          {/* Subtitle skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse" />
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}