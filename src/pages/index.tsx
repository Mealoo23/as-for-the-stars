import React, { useState } from 'react';
import { StarButton, getButtonStyle } from './StarButton';

const Homepage: React.FC = () => {
  const [buttonHovered, setButtonHovered] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleButtonHover = (index: number) => (hovered: boolean) => {
    const newButtonHovered = [...buttonHovered];
    newButtonHovered[index] = hovered;
    setButtonHovered(newButtonHovered);
  };

  const buttons = [
    { left: true, top: 50 },
    { left: true, top: 250 },
    { left: true, top: 450 },
    { left: false, top: 50 },
    { left: false, top: 250 },
    { left: false, top: 450 },
    { left: true, top: 50 },
  ].map(({ left, top }, index) => (
    <div key={index} style={{ position: 'fixed', left: left ? '4px' : 'auto', right: left ? 'auto' : '4px', top: `${top}px` }}>
      <StarButton buttonHovered={buttonHovered[index]} setButtonHovered={handleButtonHover(index)} />
    </div>
  ));

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 relative z-10">
      <img
        src="/background1.png"
        alt="Background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
      <main className="flex flex-col items-center justify-between">
        {buttons}
      </main>
      <style jsx>{`
        @media (max-width: 768px) {
          .star-button {
            ${getButtonStyle(true)}
          }
        }
      `}</style>
    </div>
  );
};

export default Homepage;