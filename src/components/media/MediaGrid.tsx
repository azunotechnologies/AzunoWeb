import React from 'react';

interface MediaItem {
  id: string;
  image?: string;
  title?: string;
  description?: string;
  link?: string;
}

interface MediaGridProps {
  items: MediaItem[];
  columns?: 1 | 2 | 3 | 4;
  onItemClick?: (item: MediaItem, index: number) => void;
}

export function MediaGrid({
  items,
  columns = 3,
  onItemClick
}: MediaGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">No items to display</p>
      </div>
    );
  }

  const gridClass = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  return (
    <div className={`grid grid-cols-1 ${gridClass} gap-4`}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="group cursor-pointer"
          onClick={() => onItemClick?.(item, index)}
        >
          {/* Image Container */}
          {item.image && (
            <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
              <img
                src={item.image}
                alt={item.title || `Item ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          )}

          {/* Content */}
          <div className="space-y-1">
            {item.title && (
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                {item.title}
              </h3>
            )}

            {item.description && (
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                {item.description}
              </p>
            )}

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-2"
                onClick={(e) => e.stopPropagation()}
              >
                View more →
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}