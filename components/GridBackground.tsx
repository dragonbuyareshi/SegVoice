import React, { memo } from 'react';

interface GridBackgroundProps {
  isDark: boolean;
}

const GridBackground = memo(({ isDark }: GridBackgroundProps) => (
  <div className="fixed inset-0 pointer-events-none opacity-20">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(${isDark ? '#374151' : '#e5e7eb'} 1px, transparent 1px),
                         linear-gradient(90deg, ${isDark ? '#374151' : '#e5e7eb'} 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}
    />
  </div>
));

GridBackground.displayName = 'GridBackground';

export default GridBackground;