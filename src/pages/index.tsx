import React, { useState, useCallback, useMemo } from 'react';
import StarButton from './StarButton';
import Head from 'next/head';
import Image from 'next/image';

// Button configurations moved outside component to prevent recreation
const BUTTON_CONFIGS = [
  { position: 'left' as const, label: 'Your Stars' },
  { position: 'left' as const, label: 'Your Cards' },
  { position: 'left' as const, label: 'Your Privacy' },
  { position: 'right' as const, label: 'Your Alignments' },
  { position: 'right' as const, label: 'Your Guides' },
  { position: 'right' as const, label: 'Your Planets' },
] as const;

// Vertical positions extracted for clarity
const VERTICAL_POSITIONS = [
  'clamp(8vh, 12vh, 100px)',   // Top button
  'clamp(35vh, 42vh, 320px)',  // Middle button
  'clamp(62vh, 72vh, 540px)',  // Bottom button
] as const;

const Homepage: React.FC = () => {
  // Track which single button is selected (-1 means none)
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(-1);
  
  // Track hover state separately from selection
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number>(-1);

  // Handle button selection - only one can be selected at a time
  const handleButtonSelect = useCallback((index: number) => {
    setSelectedButtonIndex((prev) => {
      // Toggle: if already selected, deselect it
      if (prev === index) {
        return -1;
      }
      return index;
    });
  }, []);

  // Handle hover state
  const handleButtonHover = useCallback((index: number, isHovering: boolean) => {
    if (isHovering) {
      setHoveredButtonIndex(index);
    } else {
      setHoveredButtonIndex((prev) => prev === index ? -1 : prev);
    }
  }, []);

  // Clear all active states (useful for clicking background)
  const clearAllActive = useCallback(() => {
    setSelectedButtonIndex(-1);
    setHoveredButtonIndex(-1);
  }, []);

  // Get vertical position based on index
  const getVerticalPosition = useCallback((index: number): string => {
    const leftIndex = index < 3 ? index : index - 3;
    // Ensure we stay within bounds
    if (leftIndex >= 0 && leftIndex < VERTICAL_POSITIONS.length) {
      return VERTICAL_POSITIONS[leftIndex];
    }
    return VERTICAL_POSITIONS[1]; // Default to middle
  }, []);

  // Memoize button rendering to prevent unnecessary recreations
  const buttons = useMemo(() => {
    return BUTTON_CONFIGS.map((config, index) => {
      const isLeft = config.position === 'left';
      const sideOffset = 'clamp(4px, 2vw, 20px)';
      
      const containerStyle: React.CSSProperties = {
        position: 'fixed',
        left: isLeft ? sideOffset : 'auto',
        right: isLeft ? 'auto' : sideOffset,
        top: getVerticalPosition(index),
        zIndex: 100, // Increased for better layering
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
            isSelected={selectedButtonIndex === index}
            isHovered={hoveredButtonIndex === index}
            onSelect={() => handleButtonSelect(index)}
            onHover={(isHovering) => handleButtonHover(index, isHovering)}
            onClick={() => console.log(`${config.label} clicked!`)}
            label={config.label}
            position={config.position}
          />
        </div>
      );
    });
  }, [selectedButtonIndex, hoveredButtonIndex, handleButtonSelect, handleButtonHover, getVerticalPosition]);

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
        <div className="background-wrapper">
          <Image
            src="/background1.png"
            alt="Celestial background"
            fill
            priority
            quality={90}
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
            onError={(e) => {
              console.error('Failed to load background image');
            }}
          />
        </div>
        
        <main className="main-content">
          {buttons}
        </main>
        
        <style jsx global>{`
          .star-button-container span {
            font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
        
        <style jsx>{`
          .homepage-container {
            display: flex;
            min-height: 100vh;
            min-height: 100dvh;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            position: relative;
            z-index: 10;
            overflow: hidden;
          }
          
          .background-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            height: 100dvh;
            z-index: 0;
          }
          
          .main-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 100vh;
            height: 100dvh;
            position: relative;
            z-index: 1;
          }
          
          .star-button-container {
            touch-action: manipulation;
          }
          
          @media (prefers-contrast: high) {
            .star-button-container {
              outline: 2px solid currentColor;
            }
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