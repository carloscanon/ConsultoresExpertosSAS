import React from 'react';

interface ConsultoresLogoProps {
  variant?: 'light' | 'dark' | 'auto';
  showNit?: boolean;
  className?: string;
}

export const ConsultoresLogoIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Red Vertical Bar Chart Columns in background */}
    <rect x="36" y="58" width="10" height="26" rx="2" fill="#E11D48" />
    <rect x="62" y="44" width="10" height="40" rx="2" fill="#E11D48" />
    <rect x="88" y="32" width="10" height="52" rx="2" fill="#E11D48" />

    {/* Upper Red Connected Nodes Graph Network */}
    <path d="M12 60 L35 34 L58 48 L88 20" stroke="#E11D48" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="60" r="7" fill="#E11D48" />
    <circle cx="35" cy="34" r="8" fill="#E11D48" />
    <circle cx="58" cy="48" r="7" fill="#E11D48" />
    <circle cx="88" cy="20" r="8" fill="#E11D48" />

    {/* Lower Connected Nodes Graph Network (Dynamic Cyan in Dark Mode / Dark in Light Mode) */}
    <path d="M22 82 L48 58 L72 74 L98 52" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 dark:text-cyan-400 text-slate-900" />
    <circle cx="22" cy="82" r="7" fill="currentColor" className="text-cyan-400 dark:text-cyan-400 text-slate-900" />
    <circle cx="48" cy="58" r="7.5" fill="currentColor" className="text-cyan-400 dark:text-cyan-400 text-slate-900" />
    <circle cx="72" cy="74" r="7" fill="currentColor" className="text-cyan-400 dark:text-cyan-400 text-slate-900" />
    <circle cx="98" cy="52" r="7.5" fill="currentColor" className="text-cyan-400 dark:text-cyan-400 text-slate-900" />
  </svg>
);

export const ConsultoresLogo: React.FC<ConsultoresLogoProps> = ({ 
  variant = 'auto',
  showNit = true, 
  className = '' 
}) => {
  const isLightMode = variant === 'light';

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Exact Isotype Graphic */}
      <div className="shrink-0">
        <ConsultoresLogoIcon className="w-10 h-10 sm:w-11 sm:h-11" />
      </div>

      {/* Typography adapting smoothly to theme */}
      <div className="text-left font-serif leading-none">
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E11D48]" style={{ fontFamily: 'Georgia, serif' }}>
          Consultores
        </div>
        <div className={`text-lg sm:text-xl font-bold tracking-tight mt-0.5 ${isLightMode ? 'text-slate-900' : 'text-white dark:text-white text-slate-900'}`} style={{ fontFamily: 'Georgia, serif' }}>
          Expertos SAS
        </div>
        {showNit && (
          <div className={`text-[10px] sm:text-[11px] font-bold tracking-wider mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400 dark:text-slate-400 text-slate-500'}`} style={{ fontFamily: 'Georgia, serif' }}>
            NIT 900452089-9
          </div>
        )}
      </div>
    </div>
  );
};
