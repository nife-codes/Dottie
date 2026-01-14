'use client';

import { useState } from 'react';

interface BingoSquare {
  id: number;
  text: string;
  completed: boolean;
  isCenter: boolean;
}

export default function BingoCard() {
  const [squares, setSquares] = useState<BingoSquare[]>(
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      text: i === 12 ? 'BINGO' : '',
      completed: false,
      isCenter: i === 12
    }))
  );

  const toggleComplete = (id: number) => {
    setSquares(prev => 
      prev.map(sq => sq.id === id ? { ...sq, completed: !sq.completed } : sq)
    );
  };

  return (
    <div className="grid grid-cols-5 gap-2 w-full max-w-2xl aspect-square">
      {squares.map((square) => (
        <div
          key={square.id}
          onClick={() => !square.isCenter && toggleComplete(square.id)}
          className={`
            border-2 border-gray-800 rounded-lg p-4 flex items-center justify-center
            cursor-pointer transition-all hover:scale-105
            ${square.completed ? 'bg-pink-200 line-through' : 'bg-white'}
            ${square.isCenter ? 'bg-yellow-100 cursor-default' : ''}
          `}
        >
          <span className="text-sm font-medium text-center">
            {square.text || 'Goal'}
          </span>
        </div>
      ))}
    </div>
  );
}