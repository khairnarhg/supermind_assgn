import React from 'react';

export default function LoadingWave() {
  return (
    <div className="flex justify-center items-end w-[300px] h-[100px] gap-2">
      {/* Bars with Tailwind keyframes simulation */}
      <div className="w-5 h-2 bg-indigo-500 rounded animate-[wave_1s_ease-in-out_infinite] [animation-delay:0.1s]"></div>
      <div className="w-5 h-2 bg-indigo-500 rounded animate-[wave_1s_ease-in-out_infinite] [animation-delay:0.2s]"></div>
      <div className="w-5 h-2 bg-indigo-500 rounded animate-[wave_1s_ease-in-out_infinite] [animation-delay:0.3s]"></div>
      <div className="w-5 h-2 bg-indigo-500 rounded animate-[wave_1s_ease-in-out_infinite] [animation-delay:0.4s]"></div>
    </div>
  );
}
