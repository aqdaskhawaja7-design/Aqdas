import React from 'react';
import { ExternalLink, Minus, Square, Copy, X, Plus, Settings } from 'lucide-react';
import { TabItem } from '../types';

interface TitleBarProps {
  tabs: TabItem[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onAddTab: () => void;
  onCloseTab: (id: string, e: React.MouseEvent) => void;
  isMaximized: boolean;
  onToggleMaximize: () => void;
  onOpenDesktopNotepad: () => void;
  onOpenSettings: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onAddTab,
  onCloseTab,
  isMaximized,
  onToggleMaximize,
  onOpenDesktopNotepad,
  onOpenSettings,
}) => {
  return (
    <div
      id="notepad-titlebar"
      className="flex items-center justify-between bg-[#ececec] dark:bg-[#1f1f1f] text-[#1c1c1c] dark:text-[#f3f3f3] border-b border-[#dadada] dark:border-[#2f2f2f] px-2 pt-1.5 pb-0 select-none text-xs gap-2 overflow-hidden"
    >
      {/* Left: App Icon & Tabs */}
      <div className="flex items-center flex-1 min-w-0 overflow-x-auto no-scrollbar">
        {/* Notepad Brand Icon */}
        <div className="flex items-center gap-1.5 pr-2 pl-1 py-1 mr-1 text-neutral-700 dark:text-neutral-300 shrink-0">
          <div className="w-4 h-4 rounded bg-[#0078d4] flex items-center justify-center text-white shadow-xs">
            <svg
              viewBox="0 0 24 24"
              className="w-3 h-3 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 3v2h12V6H6zm0 4v2h12v-2H6zm0 4v2h8v-2H6z" />
            </svg>
          </div>
          <span className="font-semibold text-[11px] hidden sm:inline tracking-tight">
            Notepad
          </span>
        </div>

        {/* Tab List */}
        <div className="flex items-center space-x-1 overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs cursor-pointer border-t border-x transition-all duration-150 max-w-[170px] shrink-0 ${
                  isActive
                    ? 'bg-white dark:bg-[#282828] text-neutral-900 dark:text-white font-medium border-[#dcdcdc] dark:border-[#383838] shadow-xs'
                    : 'bg-[#e4e4e4] dark:bg-[#1a1a1a] text-neutral-600 dark:text-neutral-400 hover:bg-[#eaeaea] dark:hover:bg-[#222] border-transparent'
                }`}
              >
                {/* Modified indicator or small text icon */}
                {tab.isModified ? (
                  <span
                    title="Unsaved changes"
                    className="w-2 h-2 rounded-full bg-[#0078d4] shrink-0 animate-pulse"
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600 shrink-0" />
                )}

                <span className="truncate text-[12px]">{tab.title}</span>

                {/* Close Tab Button */}
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => onCloseTab(tab.id, e)}
                    title="Close tab (Ctrl+W)"
                    className="opacity-0 group-hover:opacity-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 p-0.5 rounded transition-all ml-1 shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}

          {/* New Tab Button */}
          <button
            id="btn-new-tab"
            onClick={onAddTab}
            title="New tab (Ctrl+T)"
            className="p-1.5 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors ml-0.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right Actions & Window Controls */}
      <div className="flex items-center space-x-1 shrink-0 pb-1">
        {/* Open Desktop Notepad quick button */}
        <button
          id="btn-open-desktop-notepad"
          onClick={onOpenDesktopNotepad}
          title="Launch Windows Desktop Notepad (ms-notepad:)"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0078d4]/10 text-[#0078d4] dark:text-[#60cdff] hover:bg-[#0078d4]/20 transition-colors text-[11px] font-medium mr-1"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Desktop Notepad</span>
        </button>

        {/* Settings Button */}
        <button
          id="btn-settings"
          onClick={onOpenSettings}
          title="Notepad Settings"
          className="p-1.5 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-4 bg-neutral-300 dark:bg-neutral-700 mx-1" />

        {/* Window controls */}
        <button
          id="btn-window-minimize"
          onClick={onAddTab}
          title="New Tab"
          className="w-7 h-6 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded transition-colors text-neutral-600 dark:text-neutral-300"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-window-maximize"
          onClick={onToggleMaximize}
          title={isMaximized ? 'Restore Down' : 'Maximize'}
          className="w-7 h-6 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded transition-colors text-neutral-600 dark:text-neutral-300"
        >
          {isMaximized ? (
            <Copy className="w-3 h-3 rotate-180" />
          ) : (
            <Square className="w-3 h-3" />
          )}
        </button>

        <button
          id="btn-window-close"
          onClick={(e) => {
            const currentTab = tabs.find((t) => t.id === activeTabId);
            if (currentTab?.isModified) {
              if (window.confirm('Save changes to this tab before closing?')) {
                const event = new CustomEvent('notepad-save');
                window.dispatchEvent(event);
                return;
              }
            }
            if (tabs.length > 1) {
              onCloseTab(activeTabId, e);
            } else {
              // reset document
              onAddTab();
              onCloseTab(activeTabId, e);
            }
          }}
          title="Close tab"
          className="w-7 h-6 flex items-center justify-center hover:bg-[#e81123] hover:text-white rounded transition-colors text-neutral-600 dark:text-neutral-300"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
