import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const KumaGOLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Lighthouse Icon */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Lighthouse Top Lamp Room & Dome */}
          <path
            d="M50 8 L54 16 L46 16 Z"
            fill="#1E293B"
          />
          <path
            d="M44 16 L56 16 L54 26 L46 26 Z"
            fill="#38BDF8"
          />
          <rect x="42" y="26" width="16" height="4" rx="2" fill="#0F172A" />
          
          {/* Lighthouse Body with Stripes */}
          <path
            d="M45 30 L38 80 L62 80 L55 30 Z"
            fill="#0F2038"
          />
          {/* Blue Stripe 1 */}
          <path
            d="M44.2 38 L42.5 50 L57.5 50 L55.8 38 Z"
            fill="#2563EB"
          />
          {/* Blue Stripe 2 */}
          <path
            d="M40.8 62 L39.2 74 L60.8 74 L59.2 62 Z"
            fill="#2563EB"
          />
          {/* Small Window */}
          <rect x="48" y="42" width="4" height="6" rx="2" fill="#F8FAFC" opacity="0.9" />

          {/* Sea Waves underneath */}
          <path
            d="M20 84 C30 79, 40 89, 50 84 C60 79, 70 89, 80 84 C85 81.5, 90 85, 95 85 C95 89, 85 93, 80 90 C70 95, 60 85, 50 90 C40 95, 30 85, 20 90 Z"
            fill="#06B6D4"
          />
          <path
            d="M15 88 C25 84, 35 92, 45 88 C55 84, 65 92, 75 88 C85 84, 95 91, 98 89 C94 94, 85 96, 75 93 C65 97, 55 89, 45 93 C35 97, 25 89, 15 93 Z"
            fill="#0284C7"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Typography: kumaGO 橋 */}
      <div className="flex flex-col leading-none">
        <div className={`font-black tracking-tight ${textSizes[size]} flex items-center`}>
          <span className="text-[#15254A]">kuma</span>
          <span className="text-[#F59E0B]">GO</span>
          <span className="text-[#15254A] ml-1.5 font-bold">橋</span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] tracking-wider text-sky-700/70 uppercase font-semibold">
            Lighthouse 日本語
          </span>
        )}
      </div>
    </div>
  );
};
