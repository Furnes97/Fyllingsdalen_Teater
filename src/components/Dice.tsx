import React from 'react';

interface DiceProps {
  score: number;
  reviewer: string;
  reviewUrl: string;
  size?: 'normal' | 'large' | 'extra-large';
}

export const Dice: React.FC<DiceProps> = ({ score, reviewer, reviewUrl, size = 'normal' }) => {
  // SVG paths for dice dots
  const getDotPositions = (value: number) => {
    const positions: Record<number, { cx: number; cy: number }[]> = {
      1: [{ cx: 50, cy: 50 }],
      2: [{ cx: 25, cy: 25 }, { cx: 75, cy: 75 }],
      3: [{ cx: 25, cy: 25 }, { cx: 50, cy: 50 }, { cx: 75, cy: 75 }],
      4: [{ cx: 25, cy: 25 }, { cx: 75, cy: 25 }, { cx: 25, cy: 75 }, { cx: 75, cy: 75 }],
      5: [{ cx: 25, cy: 25 }, { cx: 75, cy: 25 }, { cx: 50, cy: 50 }, { cx: 25, cy: 75 }, { cx: 75, cy: 75 }],
      6: [{ cx: 25, cy: 20 }, { cx: 75, cy: 20 }, { cx: 25, cy: 50 }, { cx: 75, cy: 50 }, { cx: 25, cy: 80 }, { cx: 75, cy: 80 }]
    };
    return positions[value] || positions[1];
  };

  const dots = getDotPositions(score);

  return (
    <a 
      href={reviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center group cursor-pointer"
    >
      {/* Dice - SVG implementation for cleaner look */}
      <div className={`${
        size === 'extra-large' 
          ? 'w-20 h-20 md:w-24 md:h-24' 
          : size === 'large' 
            ? 'w-16 h-16 md:w-20 md:h-20' 
            : 'w-10 h-10 md:w-12 md:h-12'
      } bg-white rounded-lg shadow-md mb-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
        <svg viewBox="0 0 100 100" className="w-full h-full p-1.5">
          {dots.map((dot, index) => (
            <circle
              key={index}
              cx={dot.cx}
              cy={dot.cy}
              r="10"
              className="fill-theater-primary"
            />
          ))}
        </svg>
      </div>
      
      {/* Reviewer Link */}
      <span
        className={`${
          size === 'extra-large'
            ? 'text-base md:text-lg'
            : size === 'large' 
              ? 'text-sm md:text-base' 
              : 'text-xs'
        } text-grey font-medium tracking-wide text-white/80 group-hover:text-white transition-colors`}
      >
        {reviewer}
      </span>
    </a>
  );
};
