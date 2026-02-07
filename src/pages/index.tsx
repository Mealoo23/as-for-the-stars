import React, { useState } from 'react';
import StarButton from './StarButton';

const Homepage: React.FC = () => {
  const [buttonHovered, setButtonHovered] = useState<boolean[]>([
    false, false, false, false, false, false, false,
  ]);

  const handleButtonHover = (index: number) => (hovered: boolean) => {
    const newButtonHovered = [...buttonHovered];
    newButtonHovered[index] = hovered;
    setButtonHovered(newButtonHovered);
  };

  // Responsive positioning using viewport units
  const getButtonPosition = (index: number, isLeft: boolean) => {
    // Use clamp for responsive positioning - closer to edges on mobile
    const sideOffset = 'clamp(2px, 1vw, 8px)';
    
    // Vertical positions using vh for responsiveness
    const verticalPositions = [
      'clamp(5vh, 8vh, 60px)',
      'clamp(20vh, 28vh, 200px)',
      'clamp(40vh, 48vh, 350px)',
      'clamp(5vh, 8vh, 60px)',
      'clamp(20vh, 28vh, 200px)',
      'clamp(40vh, 48vh, 350px)',
      'clamp(60vh, 68vh, 500px)',
    ];

    return {
      position: 'fixed' as const,
      left: isLeft ? sideOffset : 'auto',
      right: isLeft ? 'auto' : sideOffset,
      top: verticalPositions[index] || '50vh',
      zIndex: 10,
    };
  };

  const buttonConfigs = [
    { left: true },
    { left: true },
    { left: true },
    { left: false },
    { left: false },
    { left: false },
    { left: true },
  ];

  const buttons = buttonConfigs.map((config, index) => (
    <div 
      key={index} 
      style={getButtonPosition(index, config.left)}
      className="star-button-container"
    >
      <StarButton 
        buttonHovered={buttonHovered[index]} 
        setButtonHovered={handleButtonHover(index)} 
        onClick={() => console.log(`Star ${index + 1} clicked!`)}
      />
    </div>
  ));

  return (
    <div className="homepage-container">
      <img
        src="/background1.png"
        alt="Background"
        className="background-image"
      />
      <main className="main-content">
        {buttons}
      </main>
      
      <style jsx>{`
        .homepage-container {
          display: flex;
          min-height: 100vh;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 10;
        }
        
        .background-image {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        
        .main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 100vh;
          position: relative;
        }
        
        .star-button-container {
          /* Ensure buttons are clickable on mobile */
          touch-action: manipulation;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .homepage-container {
            padding: 0;
          }
          
          .star-button-container {
            /* Slightly larger touch targets on mobile */
            min-width: 44px;
            min-height: 44px;
          }
        }
        
        /* Small mobile screens */
        @media (max-width: 480px) {
          .star-button-container {
            min-width: 40px;
            min-height: 40px;
          }
        }
        
        /* Tablet adjustments */
        @media (min-width: 769px) and (max-width: 1024px) {
          .star-button-container {
            min-width: 50px;
            min-height: 50px;
          }
        }
        
        /* Large screens */
        @media (min-width: 1440px) {
          .star-button-container {
            min-width: 60px;
            min-height: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default Homepage;