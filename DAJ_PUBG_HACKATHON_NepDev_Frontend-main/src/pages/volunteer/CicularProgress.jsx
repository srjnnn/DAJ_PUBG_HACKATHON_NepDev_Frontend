import React from "react";

const CircularProgress = ({ value = 20, max = 100, size = 96, color = "#2563eb" }) => {
  // Calculate percentage for circle fill
  const percentage = Math.min((value / max) * 100, 100); // never exceed 100%

  return (
    <div
      className="relative grid place-items-center rounded-full transition-all duration-500"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `conic-gradient(${color} ${percentage}%, #e5e7eb 0)`,
      }}
    >
      {/* Inner white circle */}
      <div
        className="absolute bg-white rounded-full grid place-items-center text-sm font-semibold"
        style={{
          width: `${size - 20}px`,
          height: `${size - 20}px`,
        }}
      >
        {value} hrs
      </div>
    </div>
  );
};

export default CircularProgress;