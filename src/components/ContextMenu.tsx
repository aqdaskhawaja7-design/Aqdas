import React, { useEffect, useRef } from 'react';
import {
  Scissors,
  Copy,
  Clipboard,
  Trash2,
  Search,
  Clock,
  Check,
} from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  onCut: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onDelete: () => void;
  onSelectAll: () => void;
  onFind: () => void;
  onTimeDate: () => void;
  wordWrap: boolean;
  onToggleWordWrap: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  isOpen,
  onClose,
  onCut,
  onCopy,
  onPaste,
  onDelete,
  onSelectAll,
  onFind,
  onTimeDate,
  wordWrap,
  onToggleWordWrap,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleScroll = () => onClose();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleScroll, true);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Prevent overflowing screen boundaries
  const adjustedX = Math.min(x, window.innerWidth - 200);
  const adjustedY = Math.min(y, window.innerHeight - 260);

  return (
    <div
      ref={menuRef}
      id="notepad-context-menu"
      style={{ left: adjustedX, top: adjustedY }}
      className="fixed z-50 min-w-[190px] bg-white dark:bg-[#2c2c2c] border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-2xl py-1 text-xs text-neutral-800 dark:text-neutral-200 select-none animate-in fade-in zoom-in-95 duration-75"
    >
      <button
        onClick={() => {
          onClose();
          onCut();
        }}
        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
      >
        <span className="flex items-center gap-2">
          <Scissors className="w-3.5 h-3.5 opacity-70" />
          Cut
        </span>
        <span className="text-[11px] opacity-60">Ctrl+X</span>
      </button>

      <button
        onClick={() => {
          onClose();
          onCopy();
        }}
        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
      >
        <span className="flex items-center gap-2">
          <Copy className="w-3.5 h-3.5 opacity-70" />
          Copy
        </span>
        <span className="text-[11px] opacity-60">Ctrl+C</span>
      </button>

      <button
        onClick={() => {
          onClose();
          onPaste();
        }}
        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
      >
        <span className="flex items-center gap-2">
          <Clipboard className="w-3.5 h-3.5 opacity-70" />
          Paste
        </span>
        <span className="text-[11px] opacity-60">Ctrl+V</span>
      </button>

      <button
        onClick={() => {
          onClose();
          onDelete();
        }}
        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
      >
        <span className="flex items-center gap-2">
          <Trash2 className="w-3.5 h-3.5 opacity-70" />
          Delete
        </span>
        <span className="text-[11px] opacity-60">Del</span>
      </button>

      <div className="my-1 border-t border-neutral-200 dark:border-neutral-700" />

      <button
        onClick={() => {
          onClose();
          onSelectAll();
        }}
        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
      >
        <span className="pl-5">Select All</span>
        <span className="text-[11px] opacity-60">Ctrl+A</span>
      </button>

      <button
        onClick={() => {
          onClose();
          onFind();
        }}
        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
      >
        <span className="flex items-center gap-2">
          <Search className="w-3.5 h-3.5 opacity-70" />
          Find...
        </span>
        <span className="text-[11px] opacity-60">Ctrl+F</span>
      </button>

      <button
        onClick={() => {
          onClose();
          onTimeDate();
        }}
        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
      >
        <span className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 opacity-70" />
          Time/Date
        </span>
        <span className="text-[11px] opacity-60">F5</span>
      </button>

      <div className="my-1 border-t border-neutral-200 dark:border-neutral-700" />

      <button
        onClick={() => {
          onClose();
          onToggleWordWrap();
        }}
        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
      >
        <span className="flex items-center gap-2">
          {wordWrap ? (
            <Check className="w-3.5 h-3.5 text-[#0078d4]" />
          ) : (
            <span className="w-3.5 inline-block" />
          )}
          Word Wrap
        </span>
      </button>
    </div>
  );
};
