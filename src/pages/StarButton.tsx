import React, { useState } from 'react';

interface StarButtonProps {
  buttonHovered: boolean;
  setButtonHovered: (hovered: boolean) => void;
}

const getButtonStyle = (buttonHovered: boolean) => ({
  width: buttonHovered ? '50px' : '100px',
  height: buttonHovered ? '50px' : '100px',
  cursor: 'pointer',
  ...buttonHovered && {
    opacity: 1,
    transition: 'opacity 0.2s ease-in-out',
  },
});

const StarButton: React.FC<StarButtonProps> = ({ buttonHovered, setButtonHovered }) => (
  <button
    style={getButtonStyle(buttonHovered)}
    onMouseEnter={() => {
      setButtonHovered(true);
    }}
    onMouseLeave={() => {
      setButtonHovered(false);
    }}
  >
    <img src="/star-button.png" alt="Star Button" style={{ width: '100%', height: '100%' }} />
    {buttonHovered && (
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 0, 0.8)',
          opacity: buttonHovered ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out',
        }}
      />
    )}
  </button>
);

export { StarButton, getButtonStyle };
export default function StarButton({ buttonHovered, setButtonHovered }: StarButtonProps) {
  // ...
}