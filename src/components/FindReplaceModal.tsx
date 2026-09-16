import React, { useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { FindReplaceState } from '../types';

interface FindReplaceModalProps {
  state: FindReplaceState;
  onChange: (updates: Partial<FindReplaceState>) => void;
  onClose: () => void;
  onFindNext: (reverse?: boolean) => void;
  onReplace: () => void;
  onReplaceAll: () => void;
  matchCount: number;
}

export const FindReplaceModal: React.FC<FindReplaceModalProps> = ({
  state,
  onChange,
  onClose,
  onFindNext,
  onReplace,
  onReplaceAll,
  matchCount,
}) => {
  const findInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.isOpen) {
      setTimeout(() => {
        findInputRef.current?.focus();
        findInputRef.current?.select();
      }, 50);
    }
  }, [state.isOpen]);

  if (!state.isOpen) return null;

  return (
    <div
      id="notepad-find-replace-bar"
      className="absolute top-14 right-4 z-40 bg-white dark:bg-[#2d2d2d] border border-[#ccc] dark:border-[#444] rounded-lg shadow-xl p-3 w-80 text-xs text-neutral-800 dark:text-neutral-100"
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex gap-2">
          <button
            onClick={() => onChange({ mode: 'find' })}
            className={`font-semibold pb-0.5 border-b-2 transition-colors ${
              state.mode === 'find'
                ? 'border-[#0078d4] text-[#0078d4] dark:text-[#60cdff]'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Find
          </button>
          <button
            onClick={() => onChange({ mode: 'replace' })}
            className={`font-semibold pb-0.5 border-b-2 transition-colors ${
              state.mode === 'replace'
                ? 'border-[#0078d4] text-[#0078d4] dark:text-[#60cdff]'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Replace
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Find input */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <input
            ref={findInputRef}
            type="text"
            placeholder="Find text..."
            value={state.findText}
            onChange={(e) => onChange({ findText: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onFindNext(e.shiftKey);
              } else if (e.key === 'Escape') {
                onClose();
              }
            }}
            className="flex-1 px-2.5 py-1.5 bg-neutral-50 dark:bg-[#202020] border border-neutral-300 dark:border-neutral-600 rounded focus:outline-none focus:ring-1 focus:ring-[#0078d4]"
          />

          <button
            onClick={() => onFindNext(true)}
            title="Previous (Shift+Enter)"
            className="p-1.5 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onFindNext(false)}
            title="Next (Enter)"
            className="p-1.5 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Replace input if in replace mode */}
        {state.mode === 'replace' && (
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              placeholder="Replace with..."
              value={state.replaceText}
              onChange={(e) => onChange({ replaceText: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onReplace();
                } else if (e.key === 'Escape') {
                  onClose();
                }
              }}
              className="flex-1 px-2.5 py-1.5 bg-neutral-50 dark:bg-[#202020] border border-neutral-300 dark:border-neutral-600 rounded focus:outline-none focus:ring-1 focus:ring-[#0078d4]"
            />
          </div>
        )}

        {/* Options & Action Buttons */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-1.5 cursor-pointer select-none text-neutral-600 dark:text-neutral-300">
            <input
              type="checkbox"
              checked={state.matchCase}
              onChange={(e) => onChange({ matchCase: e.target.checked })}
              className="rounded text-[#0078d4] focus:ring-0"
            />
            Match case
          </label>

          <span className="text-[11px] text-neutral-500">
            {state.findText
              ? matchCount === 0
                ? 'No matches'
                : `${matchCount} match${matchCount === 1 ? '' : 'es'}`
              : ''}
          </span>
        </div>

        {state.mode === 'replace' && (
          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={onReplace}
              className="px-2.5 py-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded font-medium"
            >
              Replace
            </button>
            <button
              onClick={onReplaceAll}
              className="px-2.5 py-1 bg-[#0078d4] hover:bg-[#106ebe] text-white rounded font-medium"
            >
              Replace All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
