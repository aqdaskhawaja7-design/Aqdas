import React from 'react';
import { CursorPosition } from '../types';

interface StatusBarProps {
  cursor: CursorPosition;
  zoom: number;
  onResetZoom: () => void;
  lineEnding: 'CRLF' | 'LF';
  onToggleLineEnding: () => void;
  encoding: string;
  charCount: number;
  wordCount: number;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  cursor,
  zoom,
  onResetZoom,
  lineEnding,
  onToggleLineEnding,
  encoding,
  charCount,
  wordCount,
}) => {
  return (
    <div
      id="notepad-statusbar"
      className="flex items-center justify-between bg-[#f3f3f3] dark:bg-[#202020] text-[#3b3b3b] dark:text-[#a0a0a0] border-t border-[#e5e5e5] dark:border-[#2d2d2d] px-3 py-1 text-xs select-none"
    >
      <div className="flex items-center space-x-4">
        <span>
          Ln {cursor.line}, Col {cursor.col}
        </span>
        {cursor.selectedChars > 0 && (
          <span className="text-blue-600 dark:text-blue-400">
            ({cursor.selectedChars} selected)
          </span>
        )}
        <span className="hidden sm:inline border-l border-neutral-300 dark:border-neutral-700 pl-4">
          {charCount} chars | {wordCount} words
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={onResetZoom}
          title="Click to reset zoom to 100%"
          className="hover:underline hover:text-black dark:hover:text-white"
        >
          {zoom}%
        </button>

        <button
          onClick={onToggleLineEnding}
          title="Click to toggle Windows (CRLF) / Unix (LF)"
          className="hidden md:inline hover:underline hover:text-black dark:hover:text-white border-l border-neutral-300 dark:border-neutral-700 pl-4"
        >
          Windows ({lineEnding})
        </button>

        <span className="hidden sm:inline border-l border-neutral-300 dark:border-neutral-700 pl-4">
          {encoding}
        </span>
      </div>
    </div>
  );
};
