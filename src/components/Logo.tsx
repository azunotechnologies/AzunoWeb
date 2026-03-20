import { useContent } from '../contexts/ContentContext';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  showText?: boolean;
}

export function Logo({ className = '', variant = 'full', showText = true }: LogoProps) {
  const { siteSettings } = useContent();
  const hasCustomLogo = siteSettings?.logo && variant === 'full';

  const defaultSvg = (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1"/>
          <stop offset="1" stopColor="#9333EA"/>
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="8" fill="url(#logoGradient)"/>
      <path d="M12 32L20 12L28 32H24L20 21L16 32H12Z" fill="white"/>
      <path d="M16 32H24V35H16V32Z" fill="white"/>
    </svg>
  );

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id="iconGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366F1"/>
            <stop offset="1" stopColor="#9333EA"/>
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="8" fill="url(#iconGradient)"/>
        <path d="M12 32L20 12L28 32H24L20 21L16 32H12Z" fill="white"/>
        <path d="M16 32H24V35H16V32Z" fill="white"/>
      </svg>
    );
  }

  // Full variant with custom logo
  if (hasCustomLogo) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <img
          src={siteSettings.logo}
          alt="Company Logo"
          className="h-8 object-contain"
        />
        {showText && (
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-900 dark:text-white leading-none">
              {siteSettings.companyName || 'AZUNO'}
            </span>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 leading-none">
              Technologies
            </span>
          </div>
        )}
      </div>
    );
  }

  // Full variant with default SVG
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {defaultSvg}
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-slate-900 dark:text-white leading-none">
            {siteSettings.companyName || 'AZUNO'}
          </span>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 leading-none">
            Technologies
          </span>
        </div>
      )}
    </div>
  );
}
