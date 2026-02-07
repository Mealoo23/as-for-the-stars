import React, { useState } from 'react';

const StarButton: React.FC<{ buttonHovered: boolean, setButtonHovered: (hovered: boolean) => void }> = ({ buttonHovered, setButtonHovered }) => (
  <button
    style={{
      position: 'relative',
      width: '100px',
      height: '100px',
      cursor: 'pointer',
      ...getButtonStyle(buttonHovered),
    }}
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
    { left: true, top: 0 },
    { left: true, top: 100 },
    { left: true, top: 200 },
    { left: false, top: 0 },
    { left: false, top: 100 },
    { left: false, top: 200 },
    { left: true, top: 0 },
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
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default Homepage;