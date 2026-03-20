import React from 'react';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  url?: string;
  title?: string;
  thumbnail?: string;
  className?: string;
}

export function VideoPlayer({ url, title, thumbnail, className = '' }: VideoPlayerProps) {
  if (!url) {
    return null;
  }

  // Determine video type and create embed URL
  const getEmbedUrl = (videoUrl: string) => {
    // YouTube
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const videoId = videoUrl.includes('youtu.be')
        ? videoUrl.split('/').pop()?.split('?')[0]
        : new URLSearchParams(new URL(videoUrl).search).get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Vimeo
    if (videoUrl.includes('vimeo.com')) {
      const videoId = videoUrl.split('/').pop()?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }

    // Cloudinary (direct URL)
    if (videoUrl.includes('cloudinary.com')) {
      return videoUrl;
    }

    // Direct video file
    return videoUrl;
  };

  const embedUrl = getEmbedUrl(url);
  const isEmbed = embedUrl.includes('youtube.com') || embedUrl.includes('vimeo.com');

  return (
    <div className={`space-y-2 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
      )}

      <div className="relative w-full bg-slate-900 rounded-lg overflow-hidden aspect-video">
        {isEmbed ? (
          <iframe
            src={embedUrl}
            title={title || 'Video player'}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            controls
            className="w-full h-full"
            poster={thumbnail}
          >
            <source src={embedUrl} type="video/mp4" />
            <source src={embedUrl} type="video/webm" />
            <source src={embedUrl} type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Video Link */}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <Play className="w-4 h-4" />
          Open in new tab
        </a>
      )}
    </div>
  );
}