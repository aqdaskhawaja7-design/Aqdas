import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Type, HelpCircle, Check, ArrowRight } from 'lucide-react';
import { DialogType, FontSettings } from '../types';

interface ModalsProps {
  dialog: DialogType;
  onClose: () => void;
  // Font
  fontSettings: FontSettings;
  onUpdateFont: (newSettings: FontSettings) => void;
  // Go To
  totalLines: number;
  currentLine: number;
  onGoToLine: (lineNumber: number) => void;
  // Desktop Notepad action
  onLaunchDesktopProtocol: () => void;
}

const AVAILABLE_FONTS = [
  { name: 'Consolas', label: 'Consolas (Default Windows)' },
  { name: 'Lucida Console', label: 'Lucida Console (Classic)' },
  { name: 'Courier New', label: 'Courier New' },
  { name: 'Segoe UI', label: 'Segoe UI (Clean Proportional)' },
  { name: 'monospace', label: 'System Monospace' },
];

const FONT_SIZES = [10, 11, 12, 13, 14, 16, 18, 20, 24, 28, 32];

export const Modals: React.FC<ModalsProps> = ({
  dialog,
  onClose,
  fontSettings,
  onUpdateFont,
  totalLines,
  currentLine,
  onGoToLine,
  onLaunchDesktopProtocol,
}) => {
  // Local GoTo state
  const [targetLine, setTargetLine] = useState<string>(String(currentLine));
  const [goToError, setGoToError] = useState<string>('');
  const goToInputRef = useRef<HTMLInputElement>(null);

  // Local Font state
  const [tempFont, setTempFont] = useState<FontSettings>(fontSettings);

  useEffect(() => {
    if (dialog === 'goTo') {
      setTargetLine(String(currentLine));
      setGoToError('');
      setTimeout(() => goToInputRef.current?.select(), 50);
    } else if (dialog === 'font') {
      setTempFont(fontSettings);
    }
  }, [dialog, currentLine, fontSettings]);

  if (dialog === 'none') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      {/* 1. DESKTOP NOTEPAD MODAL */}
      {dialog === 'desktopNotepad' && (
        <div className="bg-white dark:bg-[#252525] border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-2xl max-w-md w-full overflow-hidden text-neutral-800 dark:text-neutral-100 animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-[#f7f7f7] dark:bg-[#2c2c2c]">
            <div className="flex items-center gap-2 font-medium text-sm">
              <ExternalLink className="w-4 h-4 text-[#0078d4]" />
              <span>Open Desktop Notepad</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-neutral-500 hover:text-neutral-800 dark:hover:text-white rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 space-y-4 text-xs leading-relaxed">
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">
              You can launch the native <strong>Windows Notepad</strong> desktop
              application directly using the system protocol URI:
            </p>

            <div className="bg-neutral-100 dark:bg-[#1a1a1a] p-3 rounded border border-neutral-200 dark:border-neutral-800 font-mono text-center text-xs select-all text-[#0078d4] dark:text-[#60cdff]">
              ms-notepad:
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded p-3 text-blue-900 dark:text-blue-200 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Note for Windows users:
              </div>
              <p>
                Clicking the button below invokes the Windows protocol handler.
                Your browser will prompt:{' '}
                <em>"Open Notepad?"</em>. Click "Open" to launch desktop Notepad!
              </p>
            </div>

            <p className="text-neutral-500 text-[11px]">
              If you are on Mac, Linux, or another OS, you can continue typing
              seamlessly here in this Web Notepad or download your note as a .txt file.
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onLaunchDesktopProtocol();
                }}
                className="px-4 py-1.5 rounded bg-[#0078d4] hover:bg-[#106ebe] text-white font-medium flex items-center gap-1.5 shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Launch Windows Notepad Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. GO TO LINE MODAL */}
      {dialog === 'goTo' && (
        <div className="bg-white dark:bg-[#252525] border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-2xl max-w-xs w-full overflow-hidden text-neutral-800 dark:text-neutral-100">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 bg-[#f7f7f7] dark:bg-[#2c2c2c]">
            <span className="font-medium text-xs">Go To Line</span>
            <button
              onClick={onClose}
              className="p-1 text-neutral-500 hover:text-neutral-800 dark:hover:text-white rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const num = parseInt(targetLine, 10);
              if (isNaN(num) || num < 1 || num > totalLines) {
                setGoToError(`Line number must be between 1 and ${totalLines}`);
                return;
              }
              onGoToLine(num);
              onClose();
            }}
            className="p-4 space-y-3 text-xs"
          >
            <div>
              <label className="block text-neutral-600 dark:text-neutral-400 mb-1">
                Line number (1 - {totalLines}):
              </label>
              <input
                ref={goToInputRef}
                type="number"
                min={1}
                max={totalLines}
                value={targetLine}
                onChange={(e) => {
                  setTargetLine(e.target.value);
                  setGoToError('');
                }}
                className="w-full px-2.5 py-1.5 bg-neutral-50 dark:bg-[#1e1e1e] border border-neutral-300 dark:border-neutral-600 rounded focus:outline-none focus:ring-1 focus:ring-[#0078d4]"
              />
              {goToError && (
                <p className="text-red-600 dark:text-red-400 mt-1 text-[11px]">
                  {goToError}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded bg-[#0078d4] hover:bg-[#106ebe] text-white font-medium flex items-center gap-1"
              >
                Go To <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. FONT MODAL */}
      {dialog === 'font' && (
        <div className="bg-white dark:bg-[#252525] border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-2xl max-w-sm w-full overflow-hidden text-neutral-800 dark:text-neutral-100">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 bg-[#f7f7f7] dark:bg-[#2c2c2c]">
            <div className="flex items-center gap-2 font-medium text-xs">
              <Type className="w-4 h-4 text-[#0078d4]" />
              <span>Font</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-neutral-500 hover:text-neutral-800 dark:hover:text-white rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 space-y-4 text-xs">
            <div>
              <label className="block text-neutral-600 dark:text-neutral-400 mb-1">
                Font Family:
              </label>
              <div className="border border-neutral-300 dark:border-neutral-600 rounded max-h-32 overflow-y-auto bg-neutral-50 dark:bg-[#1e1e1e]">
                {AVAILABLE_FONTS.map((font) => (
                  <button
                    key={font.name}
                    type="button"
                    onClick={() =>
                      setTempFont((prev) => ({ ...prev, family: font.name }))
                    }
                    className={`w-full text-left px-2.5 py-1.5 hover:bg-[#0078d4] hover:text-white transition-colors ${
                      tempFont.family === font.name
                        ? 'bg-[#0078d4] text-white font-medium'
                        : ''
                    }`}
                    style={{ fontFamily: font.name }}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-neutral-600 dark:text-neutral-400 mb-1">
                Size: {tempFont.size}pt
              </label>
              <div className="flex flex-wrap gap-1.5">
                {FONT_SIZES.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() =>
                      setTempFont((prev) => ({ ...prev, size: sz }))
                    }
                    className={`px-2.5 py-1 rounded border text-xs ${
                      tempFont.size === sz
                        ? 'border-[#0078d4] bg-blue-50 dark:bg-blue-900/40 text-[#0078d4] dark:text-[#60cdff] font-semibold'
                        : 'border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div>
              <span className="block text-neutral-500 mb-1 text-[11px]">
                Sample Preview:
              </span>
              <div
                className="p-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-[#1a1a1a] text-center"
                style={{
                  fontFamily: tempFont.family,
                  fontSize: `${tempFont.size}px`,
                }}
              >
                AaBbYyZz 1234
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onUpdateFont(tempFont);
                  onClose();
                }}
                className="px-4 py-1.5 rounded bg-[#0078d4] hover:bg-[#106ebe] text-white font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. ABOUT NOTEPAD MODAL */}
      {dialog === 'about' && (
        <div className="bg-white dark:bg-[#252525] border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-2xl max-w-sm w-full overflow-hidden text-neutral-800 dark:text-neutral-100">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 bg-[#f7f7f7] dark:bg-[#2c2c2c]">
            <div className="flex items-center gap-2 font-medium text-xs">
              <HelpCircle className="w-4 h-4 text-[#0078d4]" />
              <span>About Notepad</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-neutral-500 hover:text-neutral-800 dark:hover:text-white rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0078d4] flex items-center justify-center text-white font-bold text-lg shadow-md">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 3v2h12V6H6zm0 4v2h12v-2H6zm0 4v2h8v-2H6z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Notepad</h3>
                <p className="text-neutral-500 text-[11px]">
                  Version 11.0 (Web Edition)
                </p>
              </div>
            </div>

            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Notepad is a lightweight, responsive text editor supporting UTF-8
              encoding, CRLF line endings, fast find & replace, keyboard
              shortcuts, and direct launching into desktop Windows Notepad.
            </p>

            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 text-[11px] text-neutral-500 space-y-1">
              <div>Shortcuts:</div>
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                <span>Ctrl+N : New</span>
                <span>Ctrl+O : Open</span>
                <span>Ctrl+S : Save</span>
                <span>Ctrl+F : Find</span>
                <span>Ctrl+H : Replace</span>
                <span>F5 : Time/Date</span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded bg-[#0078d4] hover:bg-[#106ebe] text-white font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
