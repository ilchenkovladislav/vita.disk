import React, { useState } from 'react';

export const Rectangle = ({ width, height }) => {
  const [point, setPoint] = useState({ x: width / 2, y: height / 2 });

  const handleChange = (event) => {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    console.log(event.target);
    setPoint({ x, y });
  };

  const getPercentage = (x, y) => {
    // Here, you would calculate the percentage based on the position of the point.
    // This is just a placeholder function.
    return Math.floor(x * 100);
  };

  const percentage = getPercentage(point.x, point.y);

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        border: '1px solid black',
        width: '500px',
        height: '500px'
      }}
      onMouseMove={handleChange}
    >
      <div
        style={{
          position: 'absolute',
          left: point.x,
          top: point.y,
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'red',
          borderRadius: '50%',
          width: 20,
          height: 20
        }}
      />
      <p>Percentage: {point.x / 5}x</p>
      <p>Percentage: {point.y / 5}y</p>
    </div>
  );
};
