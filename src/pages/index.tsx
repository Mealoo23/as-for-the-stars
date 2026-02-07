import React, { useState } from 'react';

const Homepage: React.FC = () => {
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);

  const handleButtonHover = (hovered: boolean) => {
    setButtonHovered(hovered);
  };

  const buttons = Array.from({ length: 5 }, (_, index) => (
    <div key={index} style={{ position: 'fixed', right: '4px', top: `${index * 100}px` }}>
      <StarButton buttonHovered={buttonHovered} setButtonHovered={handleButtonHover} />
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
    </div>
  );
};

const Homepage: React.FC = () => {
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);

  const handleButtonHover = (hovered: boolean) => {
    setButtonHovered(hovered);
  };

  const buttons = Array.from({ length: 5 }, (_, index) => (
    <div key={index} style={{ position: 'fixed', right: '4px', top: `${index * 100}px` }}>
      <StarButton buttonHovered={buttonHovered} setButtonHovered={handleButtonHover} />
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
    </div>
  );
};

export default Homepage;