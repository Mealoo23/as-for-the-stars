import React, { useState, useCallback } from 'react';

interface StarButtonProps {
  isSelected: boolean;           // From click/selection (persistent)
  isHovered: boolean;            // From mouse hover (temporary)
  onSelect: () => void;          // Click to select
  onHover: (isHovering: boolean) => void;  // Mouse enter/leave
  onClick?: () => void;          // Additional click handler
  label: string;
  position: 'left' | 'right';
}

const StarButton: React.FC<StarButtonProps> = ({ 
  isSelected, 
  isHovered,
  onSelect, 
  onHover, 
  onClick, 
  label,
  position 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Show label when selected, hovered, or focused
  const showLabel = isSelected || isHovered || isFocused;
  
  // Responsive sizes: smaller on mobile, larger on desktop
  const baseSize = isSelected ? 'clamp(40px, 10vw, 60px)' : 'clamp(55px, 14vw, 90px)';
  
  const buttonStyle: React.CSSProperties = {
    width: baseSize,
    height: baseSize,
    cursor: 'pointer',
    position: 'relative',
    padding: 0,
    border: 'none',
    background: 'none',
    transition: 'all 0.3s ease-in-out',
    opacity: isSelected ? 1 : 0.85,
    transform: isSelected ? 'scale(1.08)' : 'scale(1)',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
    borderRadius: '50%',
  };

  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSelect();
    if (onClick) {
      onClick();
    }
  }, [onSelect, onClick]);

  const handleMouseEnter = useCallback(() => {
    onHover(true);
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    onHover(false);
  }, [onHover]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
      if (onClick) {
        onClick();
      }
    }
  }, [onSelect, onClick]);

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
    opacity: showLabel ? 1 : 0,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'none',
    color: '#FFD700',
    textShadow: showLabel
      ? '0 0 5px #FFD700, 0 0 10px #FFA500, 0 0 20px #FF8C00, 0 0 40px rgba(255, 215, 0, 0.5)'
      : 'none',
  };

  const renderFallback = () => (
    <svg
      viewBox="0 0 24 24"
      fill={isSelected ? '#FFD700' : '#C0C0C0'}
      style={{
        width: '100%',
        height: '100%',
        filter: isSelected 
          ? 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.9))' 
          : 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
      }}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  return (
    <button
      type="button"
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      aria-label={`View ${label}`}
      aria-pressed={isSelected}
      tabIndex={0}
    >
      <style jsx>{`
        button:focus-visible {
          outline: 3px solid #FFD700;
          outline-offset: 4px;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
        }
        
        button:active {
          transform: scale(0.95);
        }
      `}</style>
      
      {imageError ? (
        renderFallback()
      ) : (
        <img 
          src="/star-button.png" 
          alt="" 
          onError={() => setImageError(true)}
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'contain',
            filter: isSelected 
              ? 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.5))' 
              : 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
            transition: 'filter 0.3s ease-in-out',
          }} 
        />
      )}
      
      <span style={goldTextStyle} aria-hidden={!showLabel}>
        {label}
      </span>
    </button>
  );
};

export default StarButton;