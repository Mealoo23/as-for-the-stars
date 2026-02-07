import React from 'react';

interface StarButtonProps {
  buttonHovered: boolean;
  setButtonHovered: (hovered: boolean) => void;
  onClick?: () => void;
}

const StarButton: React.FC<StarButtonProps> = ({ buttonHovered, setButtonHovered, onClick }) => {
  // Responsive sizes: smaller on mobile, larger on desktop
  const baseSize = buttonHovered ? 'clamp(35px, 8vw, 50px)' : 'clamp(50px, 12vw, 80px)';
  
  const buttonStyle: React.CSSProperties = {
    width: baseSize,
    height: baseSize,
    cursor: 'pointer',
    position: 'relative',
    padding: 0,
    border: 'none',
    background: 'none',
    transition: 'all 0.2s ease-in-out',
    opacity: buttonHovered ? 1 : 0.9,
    transform: buttonHovered ? 'scale(1.05)' : 'scale(1)',
    touchAction: 'manipulation', // Improves touch response
    WebkitTapHighlightColor: 'transparent', // Removes tap highlight on mobile
  };

  const handleInteraction = () => {
    setButtonHovered(!buttonHovered);
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={() => setButtonHovered(true)}
      onMouseLeave={() => setButtonHovered(false)}
      onClick={handleInteraction}
      onTouchStart={() => setButtonHovered(true)}
      onTouchEnd={() => setButtonHovered(false)}
      aria-label="Star button"
    >
      <img 
        src="/star-button.png" 
        alt="Star Button" 
        style={{ 
          width: '100%', 
          height: '100%',
          objectFit: 'contain',
          filter: buttonHovered ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' : 'none',
          transition: 'filter 0.2s ease-in-out',
        }} 
      />
      {buttonHovered && (
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            opacity: 1,
            transition: 'opacity 0.2s ease-in-out',
            pointerEvents: 'none',
          }}
        />
      )}
    </button>
  );
};

export default StarButton;