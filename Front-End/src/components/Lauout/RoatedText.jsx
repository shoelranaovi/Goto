import React from 'react';

const CircularTextComponent = () => {
  const text = "JOURNEY • NATURE • ADVENTURE • EXPLORE • FUN •";
  
  // Split text into individual characters for positioning
  const characters = text.split('');
  const radius = 35; // Much smaller radius
  const centerX = 50; // Much smaller center
  const centerY = 50; // Much smaller center

  return (
    <div className="">
      <div className="relative">
        {/* Circular text container with continuous rotation */}
        <div 
          className="relative w-24 h-24"
          style={{ 
            animation: 'spin 5s linear infinite',
          }}
        >
          {/* Position each character around the circle */}
          {characters.map((char, index) => {
            const angle = (index * 360) / characters.length;
            const x = centerX + radius * Math.cos((angle - 90) * (Math.PI / 180));
            const y = centerY + radius * Math.sin((angle - 90) * (Math.PI / 180));
            
            return (
              <span
                key={index}
                className="absolute text-red-500  text-xs select-none"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  transformOrigin: 'center',
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Center triangle/mountain icon - stationary */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-red-500 ">
            {/* <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500"
            >
              <path d="M6 19L12 5L18 19H6Z"/>
              <path d="M8 15L16 15"/>
            </svg> */}
            <img src="https://togo.uxper.co/wp-content/uploads/2025/04/tent.svg" alt=""  />
          </div>
        </div>

        {/* Custom CSS for smooth rotation */}
        <style jsx>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default CircularTextComponent;