import React from 'react';

const StarButton = () => (
  <button>
    <img src="/star-button.png" alt="Star Button" style={{ width: '100px', height: '100px' }} />
  </button>
);

const Homepage: React.FC = () => {
  const buttons = Array.from({ length: 5 }, (_, index) => (
    <div key={index} style={{ position: 'fixed', right: '4px', top: `${index * 50}px` }}>
      <StarButton />
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