'use client';

import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

export type BingoTheme = 'minimal-pink' | 'sage-green' | 'bold-yellow';

interface BingoCardProps {
  title?: string;
  theme?: BingoTheme;
  goals?: string[];
}

export const themeStyles = {
  'minimal-pink': {
    page: 'bg-[#FDF2F0]',
    card: 'bg-[#FDF2F0]',
    border: 'border-[#8B2346]',
    text: 'text-[#8B2346]',
    textHex: '#8B2346',
    cellCompleted: 'bg-[#F5D5D0]',
    cellHover: 'hover:bg-[#F5E0DC]',
    buttonActive: 'bg-[#8B2346] text-white',
    buttonInactive: 'bg-white/50 text-[#8B2346] border border-[#8B2346]/30',
  },
  'sage-green': {
    page: 'bg-[#F2F5F0]',
    card: 'bg-[#F2F5F0]',
    border: 'border-[#4A6741]',
    text: 'text-[#4A6741]',
    textHex: '#4A6741',
    cellCompleted: 'bg-[#D5E5D0]',
    cellHover: 'hover:bg-[#E0EBDC]',
    buttonActive: 'bg-[#4A6741] text-white',
    buttonInactive: 'bg-white/50 text-[#4A6741] border border-[#4A6741]/30',
  },
  'bold-yellow': {
    page: 'bg-[#FFF8E7]',
    card: 'bg-[#FFF8E7]',
    border: 'border-[#B8860B]',
    text: 'text-[#B8860B]',
    textHex: '#B8860B',
    cellCompleted: 'bg-[#FFE4B5]',
    cellHover: 'hover:bg-[#FFECC4]',
    buttonActive: 'bg-[#B8860B] text-white',
    buttonInactive: 'bg-white/50 text-[#B8860B] border border-[#B8860B]/30',
  },
};

const winningLines = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

const defaultGoals = Array(25).fill('');

export function BingoCard({ title = '2026 BINGO', theme = 'minimal-pink', goals = defaultGoals }: BingoCardProps) {
  const [completed, setCompleted] = useState<Set<number>>(() => new Set([12]));
  const [completedLines, setCompletedLines] = useState<Set<number>>(new Set());
  const styles = themeStyles[theme] || themeStyles['minimal-pink'];

  const checkForWin = useCallback((completedCells: Set<number>) => {
    const newCompletedLines = new Set<number>();
    winningLines.forEach((line, lineIndex) => {
      const isLineComplete = line.every((cell) => completedCells.has(cell));
      if (isLineComplete) {
        newCompletedLines.add(lineIndex);
      }
    });
    return newCompletedLines;
  }, []);

  const triggerCelebration = useCallback((color: string) => {
    const colors = [color, '#ffffff', color];
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
    }, 150);
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
    }, 300);
  }, []);

  const toggleCell = (index: number) => {
    if (index === 12) return;
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      const newCompletedLines = checkForWin(next);
      const hadNewWin = [...newCompletedLines].some((line) => !completedLines.has(line));
      if (hadNewWin) {
        triggerCelebration(styles.textHex);
        setCompletedLines(newCompletedLines);
      } else {
        setCompletedLines(newCompletedLines);
      }
      return next;
    });
  };

  return (
    <div className={`w-full max-w-md mx-auto p-6 ${styles.card} rounded-lg`}>
      <h1 className={`text-3xl font-serif font-medium text-center mb-4 ${styles.text} tracking-wide`}>{title}</h1>
      <div className={`grid grid-cols-5 border ${styles.border}`}>
        {goals.slice(0, 25).map((goal, index) => {
          const isCenter = index === 12;
          const isCompleted = completed.has(index);
          return (
            <button
              key={index}
              onClick={() => toggleCell(index)}
              className={`
                relative aspect-square flex items-center justify-center
                text-xs font-medium text-center
                border ${styles.border}
                transition-all duration-200
                ${isCompleted && !isCenter ? styles.cellCompleted : 'bg-transparent'}
                ${styles.cellHover}
              `}
            >
              {isCenter ? (
                <span className={`text-2xl font-bold ${styles.text}`}>★</span>
              ) : (
                <span className={`${styles.text} line-clamp-3 p-1`}>{goal || 'Goal'}</span>
              )}
              {!isCenter && isCompleted && (
                <div className={`absolute inset-0 flex items-center justify-center ${styles.text}`}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    className="w-2/3 h-2/3 opacity-60"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}