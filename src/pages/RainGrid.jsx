import React, { useState, useEffect } from "react";

const RainGrid = () => {
  const rows = 15; // Number of rows
  const cols = 20; // Number of columns

  // Initialize streak data for each column
  const [columns, setColumns] = useState(
    Array(cols).fill({
      active: Math.random() > 0.5, // 50% chance for the column to be active initially
      head: -1, // Start above the grid
      length: Math.floor(Math.random() * 5) + 3, // Random streak length (3 to 7)
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          // Randomly decide if this column should activate/deactivate
          const isActive = column.active || Math.random() > 0.7; // 30% chance to activate
          const newHead = isActive
            ? (column.head + 1) % rows // Move the head down if active
            : -1; // Reset if inactive
          return {
            active: isActive,
            head: newHead,
            length: isActive ? column.length : Math.floor(Math.random() * 5) + 3, // Random length if reactivated
          };
        })
      );
    }, 150); // Adjust speed by modifying this interval

    return () => clearInterval(interval);
  }, [rows]);

  // Generate the grid with streaks
  const getGrid = () => {
    const grid = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(null));

    // Add streaks to the grid based on column data
    columns.forEach((column, colIndex) => {
      if (column.active) {
        for (let i = 0; i < column.length; i++) {
          const row = (column.head - i + rows) % rows; // Calculate row position with wrapping
          grid[row][colIndex] = `hsl(30, 100%, ${60 - i * 10}%)`; // Gradient effect for streak
        }
      }
    });

    return grid;
  };

  const grid = getGrid();

  return (
    <div className="min-h-screen z-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4 md:mb-10">
        Gaming Rainfall Grid
      </h1>
      <div
        className="grid "
        style={{
          gridTemplateRows: `repeat(${rows}, 25px)`,
          gridTemplateColumns: `repeat(${cols}, 25px)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-6 h-6 border"
              style={{
                backgroundColor: cell ? cell : "black",
                transition: "background-color 0.2s",
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default RainGrid;
