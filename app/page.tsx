'use client';

import { useState } from 'react';
import { BingoCard, type BingoTheme, themeStyles } from './components/BingoCard';

const themes: { value: BingoTheme; label: string }[] = [
  { value: 'minimal-pink', label: 'Minimal Pink' },
  { value: 'sage-green', label: 'Sage Green' },
  { value: 'bold-yellow', label: 'Bold Yellow' },
];

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<BingoTheme>('minimal-pink');
  const styles = themeStyles[currentTheme];

  return (
    <main className={`min-h-screen py-12 px-4 transition-colors duration-300 ${styles.page}`}>
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-center gap-2">
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => setCurrentTheme(theme.value)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-full
                transition-colors duration-200
                ${currentTheme === theme.value ? styles.buttonActive : styles.buttonInactive}
              `}
            >
              {theme.label}
            </button>
          ))}
        </div>
        <BingoCard title="2026 BINGO" theme={currentTheme} />
      </div>
    </main>
  );
}