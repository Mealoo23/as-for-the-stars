import React from 'react';

interface StarButtonProps {
  isActive: boolean;
  onActivate: (isActive: boolean) => void;
  onClick?: () => void;
  label: string;
  position: 'left' | 'right';
}

const StarButton: React.FC<StarButtonProps> = ({ 
  isActive, 
  onActivate, 
  onClick, 
  label,
  position 
}) => {
  // Responsive sizes: smaller on mobile, larger on desktop
  const baseSize = isActive ? 'clamp(40px, 10vw, 60px)' : 'clamp(55px, 14vw, 90px)';
  
  const buttonStyle: React.CSSProperties = {
    width: baseSize,
    height: baseSize,
    cursor: 'pointer',
    position: 'relative',
    padding: 0,
    border: 'none',
    background: 'none',
    transition: 'all 0.3s ease-in-out',
    opacity: isActive ? 1 : 0.85,
    transform: isActive ? 'scale(1.08)' : 'scale(1)',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
  };

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Prevent bubbling to background
    
    // Toggle active state
    onActivate(!isActive);
    
    if (onClick) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    onActivate(true);
  };

  const handleMouseLeave = () => {
    onActivate(false);
  };

  // Golden label styling
  const goldTextStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    [position]: '100%',
    [position === 'left' ? 'right' : 'left']: 'auto',
    transform: 'translateY(-50%)',
    marginLeft: position === 'left' ? '0' : '15px',
    marginRight: position === 'right' ? '0' : '15px',
    padding: '8px 16px',
    fontSize: 'clamp(14px, 3vw, 20px)',
    fontWeight: 600,
    fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap',
    opacity: isActive ? 1 : 0,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'none',
    color: '#FFD700',
    textShadow: isActive
      ? '0 0 5px #FFD700, 0 0 10px #FFA500, 0 0 20px #FF8C00, 0 0 40px rgba(255, 215, 0, 0.5)'
      : 'none',
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleInteraction}
      onTouchStart={(e) => {
        e.stopPropagation();
        onActivate(true);
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        // Don't deactivate on touch end - let the next tap elsewhere handle it
      }}
      aria-label={label}
      aria-pressed={isActive}
    >
      <img 
        src="/star-button.png" 
        alt="" 
        style={{ 
          width: '100%', 
          height: '100%',
          objectFit: 'contain',
          filter: isActive 
            ? 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.5))' 
            : 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
          transition: 'filter 0.3s ease-in-out',
        }} 
      />
      {/* Golden label that appears when active */}
      <span style={goldTextStyle}>
        {label}
      </span>
    </button>
  );
};

export default StarButton;