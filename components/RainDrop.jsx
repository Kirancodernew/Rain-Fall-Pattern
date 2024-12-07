// src/components/RainDrop.js
import React, { useState, useEffect } from 'react';

const RainDrop = ({ x, y, color, speed, height }) => {
  const [dropPosition, setDropPosition] = useState({ x, y });

  useEffect(() => {
    const interval = setInterval(() => {
      setDropPosition((prevPosition) => ({
        ...prevPosition,
        y: prevPosition.y + speed,
      }));
    }, 10);

    return () => clearInterval(interval);
  }, [speed]);

  // Reset position when the drop reaches the bottom
  if (dropPosition.y >= height) {
    setDropPosition({ x, y: 0 });
  }

  return (
    <div
      className={`absolute rounded-md transition-all duration-1000 ease-in-out ${color}`}
      style={{
        left: `${dropPosition.x}px`,
        top: `${dropPosition.y}px`,
        width: '5px',
        height: '15px',
      }}
    />
  );
};

export default RainDrop;