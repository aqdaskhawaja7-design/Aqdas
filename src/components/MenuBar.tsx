import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  FolderOpen,
  Save,
  Printer,
  Undo2,
  Redo2,
  Scissors,
  Copy,
  Clipboard,
  Search,
  Replace,
  ArrowRight,
  Clock,
  Type,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
  HelpCircle,
  ExternalLink,
  Plus,
  Sun,
  Moon,
  WrapText,
  Settings,
} from 'lucide-react';
import { AppTheme } from '../types';

interface MenuBarProps {
  onNew: () => void;
  onNewTab: () => void;
  onOpen: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  onPrint: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onCut: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onDelete: () => void;
  onSelectAll: () => void;
  onTimeDate: () => void;
  onOpenFind: () => void;
  onOpenReplace: () => void;
  onOpenGoTo: () => void;
  wordWrap: boolean;
  onToggleWordWrap: () => void;
  onOpenFontModal: () => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  showStatusBar: boolean;
  onToggleStatusBar: () => void;
  onOpenAbout: () => void;
  onOpenDesktopNotepad: () => void;
  theme: AppTheme;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  onNew,
  onNewTab,
  onOpen,
  onSave,
  onSaveAs,
  onPrint,
  onUndo,
  onRedo,
  onCut,
  onCopy,
  onPaste,
  onDelete,
  onSelectAll,
  onTimeDate,
  onOpenFind,
  onOpenReplace,
  onOpenGoTo,
  wordWrap,
  onToggleWordWrap,
  onOpenFontModal,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  showStatusBar,
  onToggleStatusBar,
  onOpenAbout,
  onOpenDesktopNotepad,
  theme,
  onToggleTheme,
  onOpenSettings,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMenuClick = (menu: string) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  const handleMenuHover = (menu: string) => {
    if (activeMenu !== null) {
      setActiveMenu(menu);
    }
  };

  const closeAndRun = (action: () => void) => {
    setActiveMenu(null);
    action();
  };

  return (
    <div
      ref={menuRef}
      id="notepad-menubar"
      className="relative flex items-center justify-between bg-[#fbfbfb] dark:bg-[#232323] border-b border-[#e5e5e5] dark:border-[#333] px-2 py-1 text-[13px] text-neutral-800 dark:text-neutral-200 select-none overflow-x-auto no-scrollbar gap-2"
    >
      {/* Left: Classic Menu triggers */}
      <div className="flex items-center space-x-1 shrink-0">
        {/* FILE MENU */}
        <div className="relative">
          <button
            id="menu-btn-file"
            onClick={() => handleMenuClick('file')}
            onMouseEnter={() => handleMenuHover('file')}
            className={`px-2.5 py-1 rounded hover:bg-[#eaeaea] dark:hover:bg-[#333] transition-colors ${
              activeMenu === 'file' ? 'bg-[#e0e0e0] dark:bg-[#383838]' : ''
            }`}
          >
            File
          </button>

          {activeMenu === 'file' && (
            <div className="absolute left-0 top-full mt-0.5 min-w-[220px] bg-white dark:bg-[#2b2b2b] border border-[#d9d9d9] dark:border-[#444] rounded-lg shadow-2xl py-1 z-50 text-[12.5px] text-[#222] dark:text-[#eee]">
              <button
                onClick={() => closeAndRun(onNewTab)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4 opacity-70" />
                  New Tab
                </span>
                <span className="text-xs opacity-60">Ctrl+T</span>
              </button>

              <button
                onClick={() => closeAndRun(onNew)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 opacity-70" />
                  New Document
                </span>
                <span className="text-xs opacity-60">Ctrl+N</span>
              </button>

              <button
                onClick={() => closeAndRun(onOpen)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 opacity-70" />
                  Open...
                </span>
                <span className="text-xs opacity-60">Ctrl+O</span>
              </button>

              <button
                onClick={() => closeAndRun(onSave)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4 opacity-70" />
                  Save
                </span>
                <span className="text-xs opacity-60">Ctrl+S</span>
              </button>

              <button
                onClick={() => closeAndRun(onSaveAs)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4 opacity-70" />
                  Save As...
                </span>
                <span className="text-xs opacity-60">Ctrl+Shift+S</span>
              </button>

              <div className="my-1 border-t border-[#e5e5e5] dark:border-[#404040]" />

              <button
                onClick={() => closeAndRun(onPrint)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <Printer className="w-4 h-4 opacity-70" />
                  Print...
                </span>
                <span className="text-xs opacity-60">Ctrl+P</span>
              </button>

              <div className="my-1 border-t border-[#e5e5e5] dark:border-[#404040]" />

              <button
                onClick={() => closeAndRun(onOpenDesktopNotepad)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left text-[#0067b8] dark:text-[#60cdff] font-medium"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Open Desktop Notepad
                </span>
                <span className="text-[11px] opacity-75">ms-notepad:</span>
              </button>
            </div>
          )}
        </div>

        {/* EDIT MENU */}
        <div className="relative">
          <button
            id="menu-btn-edit"
            onClick={() => handleMenuClick('edit')}
            onMouseEnter={() => handleMenuHover('edit')}
            className={`px-2.5 py-1 rounded hover:bg-[#eaeaea] dark:hover:bg-[#333] transition-colors ${
              activeMenu === 'edit' ? 'bg-[#e0e0e0] dark:bg-[#383838]' : ''
            }`}
          >
            Edit
          </button>

          {activeMenu === 'edit' && (
            <div className="absolute left-0 top-full mt-0.5 min-w-[210px] bg-white dark:bg-[#2b2b2b] border border-[#d9d9d9] dark:border-[#444] rounded-lg shadow-2xl py-1 z-50 text-[12.5px] text-[#222] dark:text-[#eee]">
              <button
                onClick={() => closeAndRun(onUndo)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <Undo2 className="w-4 h-4 opacity-70" />
                  Undo
                </span>
                <span className="text-xs opacity-60">Ctrl+Z</span>
              </button>

              <button
                onClick={() => closeAndRun(onRedo)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <Redo2 className="w-4 h-4 opacity-70" />
                  Redo
                </span>
                <span className="text-xs opacity-60">Ctrl+Y</span>
              </button>

              <div className="my-1 border-t border-[#e5e5e5] dark:border-[#404040]" />

              <button
                onClick={() => closeAndRun(onCut)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 opacity-70" />
                  Cut
                </span>
                <span className="text-xs opacity-60">Ctrl+X</span>
              </button>

              <button
                onClick={() => closeAndRun(onCopy)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <Copy className="w-4 h-4 opacity-70" />
                  Copy
                </span>
                <span className="text-xs opacity-60">Ctrl+C</span>
              </button>

              <button
                onClick={() => closeAndRun(onPaste)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <Clipboard className="w-4 h-4 opacity-70" />
                  Paste
                </span>
                <span className="text-xs opacity-60">Ctrl+V</span>
              </button>

              <button
                onClick={() => closeAndRun(onDelete)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2 pl-6">Delete</span>
                <span className="text-xs opacity-60">Del</span>
              </button>

              <div className="my-1 border-t border-[#e5e5e5] dark:border-[#404040]" />

              <button
                onClick={() => closeAndRun(onOpenFind)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 opacity-70" />
                  Find...
                </span>
                <span className="text-xs opacity-60">Ctrl+F</span>
              </button>

              <button
                onClick={() => closeAndRun(onOpenReplace)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <Replace className="w-4 h-4 opacity-70" />
                  Replace...
                </span>
                <span className="text-xs opacity-60">Ctrl+H</span>
              </button>

              <button
                onClick={() => closeAndRun(onOpenGoTo)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 opacity-70" />
                  Go To...
                </span>
                <span className="text-xs opacity-60">Ctrl+G</span>
              </button>

              <div className="my-1 border-t border-[#e5e5e5] dark:border-[#404040]" />

              <button
                onClick={() => closeAndRun(onSelectAll)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2 pl-6">Select All</span>
                <span className="text-xs opacity-60">Ctrl+A</span>
              </button>

              <button
                onClick={() => closeAndRun(onTimeDate)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 opacity-70" />
                  Time/Date
                </span>
                <span className="text-xs opacity-60">F5</span>
              </button>
            </div>
          )}
        </div>

        {/* VIEW MENU */}
        <div className="relative">
          <button
            id="menu-btn-view"
            onClick={() => handleMenuClick('view')}
            onMouseEnter={() => handleMenuHover('view')}
            className={`px-2.5 py-1 rounded hover:bg-[#eaeaea] dark:hover:bg-[#333] transition-colors ${
              activeMenu === 'view' ? 'bg-[#e0e0e0] dark:bg-[#383838]' : ''
            }`}
          >
            View
          </button>

          {activeMenu === 'view' && (
            <div className="absolute left-0 top-full mt-0.5 min-w-[210px] bg-white dark:bg-[#2b2b2b] border border-[#d9d9d9] dark:border-[#444] rounded-lg shadow-2xl py-1 z-50 text-[12.5px] text-[#222] dark:text-[#eee]">
              <button
                onClick={() => closeAndRun(onToggleWordWrap)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  {wordWrap ? (
                    <Check className="w-4 h-4 text-[#0078d4]" />
                  ) : (
                    <span className="w-4 inline-block" />
                  )}
                  Word Wrap
                </span>
              </button>

              <button
                onClick={() => closeAndRun(onOpenFontModal)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <Type className="w-4 h-4 opacity-70" />
                  Font...
                </span>
              </button>

              <div className="my-1 border-t border-[#e5e5e5] dark:border-[#404040]" />

              <button
                onClick={() => closeAndRun(onZoomIn)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <ZoomIn className="w-4 h-4 opacity-70" />
                  Zoom In
                </span>
                <span className="text-xs opacity-60">Ctrl +</span>
              </button>

              <button
                onClick={() => closeAndRun(onZoomOut)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <ZoomOut className="w-4 h-4 opacity-70" />
                  Zoom Out
                </span>
                <span className="text-xs opacity-60">Ctrl -</span>
              </button>

              <button
                onClick={() => closeAndRun(onResetZoom)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 opacity-70" />
                  Restore Default Zoom ({zoom}%)
                </span>
                <span className="text-xs opacity-60">Ctrl+0</span>
              </button>

              <div className="my-1 border-t border-[#e5e5e5] dark:border-[#404040]" />

              <button
                onClick={() => closeAndRun(onToggleStatusBar)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  {showStatusBar ? (
                    <Check className="w-4 h-4 text-[#0078d4]" />
                  ) : (
                    <span className="w-4 inline-block" />
                  )}
                  Status Bar
                </span>
              </button>
            </div>
          )}
        </div>

        {/* HELP MENU */}
        <div className="relative">
          <button
            id="menu-btn-help"
            onClick={() => handleMenuClick('help')}
            onMouseEnter={() => handleMenuHover('help')}
            className={`px-2.5 py-1 rounded hover:bg-[#eaeaea] dark:hover:bg-[#333] transition-colors ${
              activeMenu === 'help' ? 'bg-[#e0e0e0] dark:bg-[#383838]' : ''
            }`}
          >
            Help
          </button>

          {activeMenu === 'help' && (
            <div className="absolute left-0 top-full mt-0.5 min-w-[220px] bg-white dark:bg-[#2b2b2b] border border-[#d9d9d9] dark:border-[#444] rounded-lg shadow-2xl py-1 z-50 text-[12.5px] text-[#222] dark:text-[#eee]">
              <button
                onClick={() => closeAndRun(onOpenDesktopNotepad)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-blue-500" />
                  Launch Desktop Notepad
                </span>
              </button>

              <button
                onClick={() => closeAndRun(onOpenAbout)}
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0078d4] hover:text-white dark:hover:bg-[#0078d4] text-left"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 opacity-70" />
                  About Notepad
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right: Quick Action Ribbon */}
      <div className="flex items-center space-x-1 shrink-0">
        <button
          onClick={onNewTab}
          title="New Tab (Ctrl+T)"
          className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-[#333] text-neutral-600 dark:text-neutral-300 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onOpen}
          title="Open File (Ctrl+O)"
          className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-[#333] text-neutral-600 dark:text-neutral-300 transition-colors"
        >
          <FolderOpen className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onSave}
          title="Save File (Ctrl+S)"
          className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-[#333] text-neutral-600 dark:text-neutral-300 transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-3.5 bg-neutral-300 dark:bg-neutral-700 mx-0.5" />

        <button
          onClick={onUndo}
          title="Undo (Ctrl+Z)"
          className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-[#333] text-neutral-600 dark:text-neutral-300 transition-colors"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onRedo}
          title="Redo (Ctrl+Y)"
          className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-[#333] text-neutral-600 dark:text-neutral-300 transition-colors"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onOpenFind}
          title="Find / Replace (Ctrl+F)"
          className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-[#333] text-neutral-600 dark:text-neutral-300 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onToggleWordWrap}
          title={`Word Wrap: ${wordWrap ? 'On' : 'Off'}`}
          className={`p-1.5 rounded transition-colors ${
            wordWrap
              ? 'bg-[#0078d4]/15 text-[#0078d4] dark:text-[#60cdff]'
              : 'hover:bg-neutral-200 dark:hover:bg-[#333] text-neutral-600 dark:text-neutral-300'
          }`}
        >
          <WrapText className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-3.5 bg-neutral-300 dark:bg-neutral-700 mx-0.5" />

        {/* Theme Quick Toggle */}
        <button
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-[#333] text-neutral-600 dark:text-neutral-300 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          title="Settings"
          className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-[#333] text-neutral-600 dark:text-neutral-300 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
