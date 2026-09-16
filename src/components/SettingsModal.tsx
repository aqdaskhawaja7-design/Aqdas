import React from 'react';
import {
  X,
  Moon,
  Sun,
  Laptop,
  Type,
  WrapText,
  FileCode2,
  ExternalLink,
  Download,
  Check,
} from 'lucide-react';
import { AppTheme, FontSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  fontSettings: FontSettings;
  onFontChange: (settings: FontSettings) => void;
  wordWrap: boolean;
  onToggleWordWrap: () => void;
  lineEnding: 'CRLF' | 'LF';
  onToggleLineEnding: () => void;
  tabSize: number;
  onTabSizeChange: (size: number) => void;
  onOpenDesktopNotepad: () => void;
  installPrompt: any;
  onInstallApp: () => void;
}

const FONTS = [
  { id: 'Consolas', name: 'Consolas (Default Windows)' },
  { id: 'Lucida Console', name: 'Lucida Console' },
  { id: 'Courier New', name: 'Courier New' },
  { id: 'Segoe UI', name: 'Segoe UI' },
  { id: 'monospace', name: 'System Monospace' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  fontSettings,
  onFontChange,
  wordWrap,
  onToggleWordWrap,
  lineEnding,
  onToggleLineEnding,
  tabSize,
  onTabSizeChange,
  onOpenDesktopNotepad,
  installPrompt,
  onInstallApp,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-[#202020] border border-neutral-300 dark:border-[#383838] rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden text-neutral-800 dark:text-neutral-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-[#333] bg-[#f8f8f8] dark:bg-[#252525]">
          <h2 className="text-base font-semibold tracking-tight">
            Notepad Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
          {/* App Theme */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block">
              App Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onThemeChange('light')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all ${
                  theme === 'light'
                    ? 'border-[#0078d4] bg-blue-50 text-[#0078d4] dark:bg-blue-900/30'
                    : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>

              <button
                type="button"
                onClick={() => onThemeChange('dark')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all ${
                  theme === 'dark'
                    ? 'border-[#0078d4] bg-blue-50 text-[#0078d4] dark:bg-blue-900/30 dark:text-[#60cdff]'
                    : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>

              <button
                type="button"
                onClick={() => onThemeChange('system')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all ${
                  theme === 'system'
                    ? 'border-[#0078d4] bg-blue-50 text-[#0078d4] dark:bg-blue-900/30 dark:text-[#60cdff]'
                    : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Laptop className="w-4 h-4" />
                System
              </button>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 font-semibold text-neutral-700 dark:text-neutral-300">
              <Type className="w-4 h-4 text-[#0078d4]" />
              <span>Font & Formatting</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-500 dark:text-neutral-400 mb-1">
                  Family:
                </label>
                <select
                  value={fontSettings.family}
                  onChange={(e) =>
                    onFontChange({ ...fontSettings, family: e.target.value })
                  }
                  className="w-full px-2.5 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#282828] text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-[#0078d4]"
                >
                  {FONTS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 dark:text-neutral-400 mb-1">
                  Size ({fontSettings.size}pt):
                </label>
                <input
                  type="range"
                  min={10}
                  max={28}
                  step={1}
                  value={fontSettings.size}
                  onChange={(e) =>
                    onFontChange({
                      ...fontSettings,
                      size: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full accent-[#0078d4] mt-2"
                />
              </div>
            </div>

            <div
              className="p-3 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#181818] text-center"
              style={{
                fontFamily: fontSettings.family,
                fontSize: `${fontSettings.size}px`,
              }}
            >
              The quick brown fox jumps over the lazy dog. 1234567890
            </div>
          </div>

          {/* Editor Behavior */}
          <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 font-semibold text-neutral-700 dark:text-neutral-300">
              <FileCode2 className="w-4 h-4 text-[#0078d4]" />
              <span>Editor Preferences</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#262626]">
              <div className="flex items-center gap-2">
                <WrapText className="w-4 h-4 text-neutral-500" />
                <div>
                  <div className="font-medium">Word Wrap</div>
                  <div className="text-[11px] text-neutral-500">
                    Wrap lines to fit the window width
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={wordWrap}
                onChange={onToggleWordWrap}
                className="rounded text-[#0078d4] focus:ring-0 w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#262626]">
              <div>
                <div className="font-medium">Tab Indentation</div>
                <div className="text-[11px] text-neutral-500">
                  Number of spaces inserted by the Tab key
                </div>
              </div>
              <div className="flex gap-1">
                {[2, 4, 8].map((size) => (
                  <button
                    key={size}
                    onClick={() => onTabSizeChange(size)}
                    className={`px-2.5 py-1 rounded text-xs font-medium border ${
                      tabSize === size
                        ? 'border-[#0078d4] bg-blue-50 text-[#0078d4] dark:bg-blue-900/40 dark:text-[#60cdff]'
                        : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#262626]">
              <div>
                <div className="font-medium">Line Endings</div>
                <div className="text-[11px] text-neutral-500">
                  Format for saved text files
                </div>
              </div>
              <button
                onClick={onToggleLineEnding}
                className="px-3 py-1 rounded text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Windows ({lineEnding})
              </button>
            </div>
          </div>

          {/* App Installation & Desktop Launch */}
          <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 font-semibold text-neutral-700 dark:text-neutral-300">
              <Download className="w-4 h-4 text-[#0078d4]" />
              <span>Application Integrations</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#262626]">
              <div>
                <div className="font-medium">Windows Desktop Notepad</div>
                <div className="text-[11px] text-neutral-500">
                  Trigger native Windows app via ms-notepad:
                </div>
              </div>
              <button
                onClick={onOpenDesktopNotepad}
                className="px-3 py-1.5 rounded-md bg-[#0078d4] hover:bg-[#106ebe] text-white flex items-center gap-1.5 font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Launch OS Notepad
              </button>
            </div>

            {installPrompt && (
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20">
                <div>
                  <div className="font-medium text-green-800 dark:text-green-300">
                    Install as Desktop Application
                  </div>
                  <div className="text-[11px] text-green-600 dark:text-green-400">
                    Add Notepad to your taskbar and start menu
                  </div>
                </div>
                <button
                  onClick={onInstallApp}
                  className="px-3 py-1.5 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Install App
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-neutral-200 dark:border-[#333] bg-[#f8f8f8] dark:bg-[#252525] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0078d4] hover:bg-[#106ebe] text-white font-medium text-xs shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
