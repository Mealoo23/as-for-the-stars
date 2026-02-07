import React, { useState, useCallback } from 'react';
import StarButton from './StarButton';
import Head from 'next/head';

const Homepage: React.FC = () => {
  // Track which single button is active (-1 means none)
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(-1);

  // Handle button activation - only one can be active at a time
  const handleButtonActivate = useCallback((index: number, isActive: boolean) => {
    if (isActive) {
      setActiveButtonIndex(index);
    } else if (activeButtonIndex === index) {
      // Only clear if this was the active button
      setActiveButtonIndex(-1);
    }
  }, [activeButtonIndex]);

  // Clear all active states (useful for clicking background)
  const clearAllActive = useCallback(() => {
    setActiveButtonIndex(-1);
  }, []);

  // Button configurations: 3 left, 3 right with labels
  const buttonConfigs = [
    { position: 'left' as const, label: 'Your Stars' },
    { position: 'left' as const, label: 'Your Cards' },
    { position: 'left' as const, label: 'Your Privacy' },
    { position: 'right' as const, label: 'Your Alignments' },
    { position: 'right' as const, label: 'Your Guides' },
    { position: 'right' as const, label: 'Your Planets' },
  ];

  // Responsive vertical positioning
  const getVerticalPosition = (index: number) => {
    const leftIndex = index < 3 ? index : index - 3;
    
    const positions = [
      'clamp(8vh, 12vh, 100px)',   // Top button
      'clamp(35vh, 42vh, 320px)',  // Middle button
      'clamp(62vh, 72vh, 540px)',  // Bottom button
    ];
    
    return positions[leftIndex] || positions[1];
  };

  const buttons = buttonConfigs.map((config, index) => {
    const isLeft = config.position === 'left';
    const sideOffset = 'clamp(4px, 2vw, 20px)';
    
    const containerStyle: React.CSSProperties = {
      position: 'fixed',
      left: isLeft ? sideOffset : 'auto',
      right: isLeft ? 'auto' : sideOffset,
      top: getVerticalPosition(index),
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      flexDirection: isLeft ? 'row' : 'row-reverse',
    };

    return (
      <div 
        key={index} 
        style={containerStyle}
        className="star-button-container"
      >
        <StarButton 
          isActive={activeButtonIndex === index}
          onActivate={(isActive) => handleButtonActivate(index, isActive)}
          onClick={() => console.log(`${config.label} clicked!`)}
          label={config.label}
          position={config.position}
        />
      </div>
    );
  });

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      
      <div className="homepage-container" onClick={clearAllActive}>
        <img
          src="/background1.png"
          alt="Background"
          className="background-image"
        />
        <main className="main-content" onClick={(e) => e.stopPropagation()}>
          {buttons}
        </main>
        
        <style jsx global>{`
          .star-button-container span {
            font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
          }
        `}</style>
        
        <style jsx>{`
          .homepage-container {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            position: relative;
            z-index: 10;
            overflow: hidden;
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
            touch-action: manipulation;
          }
          
          @media (max-width: 768px) {
            .homepage-container {
              padding: 0;
            }
            
            .star-button-container {
              min-width: 44px;
              min-height: 44px;
            }
          }
          
          @media (max-width: 480px) {
            .star-button-container {
              min-width: 40px;
              min-height: 40px;
            }
          }
          
          @media (min-width: 769px) and (max-width: 1024px) {
            .star-button-container {
              min-width: 50px;
              min-height: 50px;
            }
          }
          
          @media (min-width: 1440px) {
            .star-button-container {
              min-width: 60px;
              min-height: 60px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Homepage;