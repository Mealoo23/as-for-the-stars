import React from 'react';

interface StarButtonProps {
  buttonHovered: boolean;
  setButtonHovered: (hovered: boolean) => void;
  onClick?: () => void;
  label: string;
  position: 'left' | 'right';
}

const StarButton: React.FC<StarButtonProps> = ({ 
  buttonHovered, 
  setButtonHovered, 
  onClick, 
  label,
  position 
}) => {
  // Responsive sizes: smaller on mobile, larger on desktop
  const baseSize = buttonHovered ? 'clamp(40px, 10vw, 60px)' : 'clamp(55px, 14vw, 90px)';
  
  const buttonStyle: React.CSSProperties = {
    width: baseSize,
    height: baseSize,
    cursor: 'pointer',
    position: 'relative',
    padding: 0,
    border: 'none',
    background: 'none',
    transition: 'all 0.3s ease-in-out',
    opacity: buttonHovered ? 1 : 0.85,
    transform: buttonHovered ? 'scale(1.08)' : 'scale(1)',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
  };

  const handleInteraction = () => {
    setButtonHovered(!buttonHovered);
    if (onClick) {
      onClick();
    }
  };

  // Label positioning based on side
  const labelStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    [position]: '100%',
    [position === 'left' ? 'right' : 'left']: 'auto',
    transform: 'translateY(-50%)',
    marginLeft: position === 'left' ? '0' : '12px',
    marginRight: position === 'right' ? '0' : '12px',
    padding: '8px 16px',
    fontSize: 'clamp(14px, 3vw, 20px)',
    fontWeight: 600,
    fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap',
    opacity: buttonHovered ? 1 : 0,
    transition: 'all 0.3s ease-in-out',
    pointerEvents: 'none',
    textShadow: buttonHovered 
      ? '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.3)' 
      : 'none',
    background: buttonHovered
      ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFEC8B 50%, #FFA500 75%, #FFD700 100%)'
      : 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: buttonHovered ? 'transparent' : 'inherit',
    backgroundClip: 'text',
    filter: buttonHovered ? 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))' : 'none',
  };

  // Alternative gold text effect using text-shadow for better compatibility
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
    opacity: buttonHovered ? 1 : 0,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'none',
    color: '#FFD700',
    textShadow: buttonHovered
      ? '0 0 5px #FFD700, 0 0 10px #FFA500, 0 0 20px #FF8C00, 0 0 40px rgba(255, 215, 0, 0.5)'
      : 'none',
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={() => setButtonHovered(true)}
      onMouseLeave={() => setButtonHovered(false)}
      onClick={handleInteraction}
      onTouchStart={() => setButtonHovered(true)}
      onTouchEnd={() => setButtonHovered(false)}
      aria-label={label}
    >
      <img 
        src="/star-button.png" 
        alt="" 
        style={{ 
          width: '100%', 
          height: '100%',
          objectFit: 'contain',
          filter: buttonHovered 
            ? 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.5))' 
            : 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
          transition: 'filter 0.3s ease-in-out',
        }} 
      />
      {/* Golden label that appears on hover */}
      <span style={goldTextStyle}>
        {label}
      </span>
    </button>
  );
};

export default StarButton;