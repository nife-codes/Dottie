'use client';

import { useState, useEffect } from 'react';

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
      completed: i === 12,
      isCenter: i === 12
    }))
  );

  const [bingoLines, setBingoLines] = useState<number[][]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const checkBingo = () => {
    const lines: number[][] = [];
    
    for (let i = 0; i < 5; i++) {
      lines.push([i * 5, i * 5 + 1, i * 5 + 2, i * 5 + 3, i * 5 + 4]);
    }
    
    for (let i = 0; i < 5; i++) {
      lines.push([i, i + 5, i + 10, i + 15, i + 20]);
    }
    
    lines.push([0, 6, 12, 18, 24]);
    lines.push([4, 8, 12, 16, 20]);

    const completedLines = lines.filter(line =>
      line.every(id => squares[id].completed)
    );

    if (completedLines.length > bingoLines.length) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1500);
    }

    setBingoLines(completedLines);
  };

  useEffect(() => {
    checkBingo();
  }, [squares]);

  const toggleComplete = (id: number) => {
    setSquares(prev => 
      prev.map(sq => sq.id === id ? { ...sq, completed: !sq.completed } : sq)
    );
  };

  const isInBingoLine = (id: number) => {
    return bingoLines.some(line => line.includes(id));
  };

  return (
    <div className="relative">
      {showCelebration && (
  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
    <div className="absolute inset-0 bg-black opacity-20" />
    <h2 className="text-8xl font-bold text-yellow-500 relative z-10" style={{ fontFamily: 'Georgia, serif' }}>
      Bingo!
    </h2>
  </div>
)}
      <div className="grid grid-cols-5 gap-2 w-full max-w-2xl aspect-square">
        {squares.map((square) => (
          <div
            key={square.id}
            onClick={() => !square.isCenter && toggleComplete(square.id)}
            className={`
              border-2 border-gray-800 rounded-lg p-4 flex items-center justify-center relative
              cursor-pointer transition-all hover:scale-105
              ${square.completed && !square.isCenter ? 'bg-pink-100' : 'bg-white'}
              ${square.isCenter ? 'bg-yellow-100 cursor-default font-bold' : ''}
            `}
          >
            {square.completed && !square.isCenter && (
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <line x1="10" y1="10" x2="90" y2="90" stroke="#382830" strokeWidth="4" />
                <line x1="90" y1="10" x2="10" y2="90" stroke="#3b2630" strokeWidth="4" />
              </svg>
            )}
            
            {isInBingoLine(square.id) && (
              <div className="absolute inset-0 border-4 border-pink-500 rounded-lg pointer-events-none" />
            )}
            
            <span className="text-sm font-bold text-gray-900 text-center z-10 relative">
              {square.text || 'Goal'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}